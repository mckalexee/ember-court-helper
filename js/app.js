/**
 * app.js - Ember Court Calculator
 *
 * Full application logic: renders guest selection, amenity selection,
 * results panel, and handles the optimize algorithm.
 * Depends on EmberCourtData from data.js.
 */

"use strict";

const App = (() => {
  /* ============================================================
     STATE
     ============================================================ */

  const STORAGE_KEY = "ember-court-calc-state";

  // One guest ID per slot (null if none selected). Index = slot index (0-3).
  let selectedGuests = [null, null, null, null];

  // One amenity ID per category (null if none selected).
  let selectedAmenities = {
    entertainment: null,
    refreshment: null,
    decoration: null,
    security: null,
  };

  /** Cached DOM root */
  let root;

  /* ============================================================
     DATA HELPERS
     ============================================================ */

  const DATA = typeof EmberCourtData !== "undefined" ? EmberCourtData : null;

  function getGuest(id) {
    return DATA.guests.find((g) => g.id === id) || null;
  }

  function getAmenity(id) {
    return DATA.amenities.find((a) => a.id === id) || null;
  }

  function getAmenitiesByCategory(cat) {
    return DATA.amenities.filter((a) => a.category === cat);
  }

  /** Ordered list of amenity categories */
  const CATEGORIES = [
    { key: "entertainment", label: "Entertainment", manager: "Hips" },
    { key: "refreshment", label: "Refreshments", manager: "Picky Stefan" },
    { key: "decoration", label: "Decorations", manager: "Boot the Beaut" },
    { key: "security", label: "Security", manager: "Watchmaster Boromod" },
  ];

  /** Faction to icon emoji mapping */
  const FACTION_ICONS = {
    Venthyr: "\uD83E\uDDDB",   // vampire
    Necrolord: "\uD83D\uDC80",  // skull
    "Night Fae": "\uD83C\uDF3F", // herb
    Kyrian: "\uD83D\uDD4A\uFE0F", // dove
  };

  /** Faction CSS class */
  function factionClass(faction) {
    const map = {
      Venthyr: "faction-venthyr",
      Necrolord: "faction-necrolord",
      "Night Fae": "faction-nightfae",
      Kyrian: "faction-kyrian",
    };
    return map[faction] || "";
  }

  /* ============================================================
     SCORING ENGINE
     ============================================================ */

  /**
   * Compute the net atmosphere from selected amenities.
   * Returns an object like { cleanliness: 1, danger: -1, ... }
   */
  function computeNetAtmosphere(amenitySelections) {
    const net = {};
    DATA.dimensions.forEach((dim) => (net[dim] = 0));

    Object.values(amenitySelections).forEach((amenityId) => {
      if (!amenityId) return;
      const amenity = getAmenity(amenityId);
      if (!amenity) return;
      DATA.dimensions.forEach((dim) => {
        net[dim] += amenity.effects[dim] || 0;
      });
    });

    return net;
  }

  /**
   * Score a single guest against a net atmosphere.
   * Returns { total, details: [{dim, prefValue, netValue, result}] }
   *
   * Scoring per dimension:
   *   - If guest pref is 0 (no preference): 0 points
   *   - If net atmosphere is 0 on that dim: 0 points
   *   - If sign(net) matches sign(pref): +1
   *   - If sign(net) opposes sign(pref): -1
   */
  function scoreGuest(guest, netAtmosphere) {
    let total = 0;
    const details = [];

    DATA.dimensions.forEach((dim) => {
      const pref = guest.preferences[dim] || 0;
      const net = netAtmosphere[dim] || 0;
      let result = 0;

      if (pref !== 0 && net !== 0) {
        result = Math.sign(pref) === Math.sign(net) ? 1 : -1;
      }

      total += result;
      details.push({ dim, prefValue: pref, netValue: net, result });
    });

    return { total, details };
  }

  /**
   * Total happiness for all selected guests with given amenity selections.
   */
  function totalHappiness(guestIds, amenitySelections) {
    const net = computeNetAtmosphere(amenitySelections);
    let sum = 0;
    guestIds.forEach((gId) => {
      if (!gId) return;
      const guest = getGuest(gId);
      if (!guest) return;
      sum += scoreGuest(guest, net).total;
    });
    return sum;
  }

  /**
   * Compute the impact score of a single amenity chip for currently
   * selected guests. This is used for the real-time impact indicator
   * on amenity chips.
   *
   * We compute: for each selected guest and each dimension, what is
   * the sign-match contribution of this amenity's effect alone
   * (independent of other selections, to give a quick at-a-glance value).
   */
  function amenityImpactForGuests(amenity) {
    let impact = 0;
    selectedGuests.forEach((gId) => {
      if (!gId) return;
      const guest = getGuest(gId);
      if (!guest) return;
      DATA.dimensions.forEach((dim) => {
        const pref = guest.preferences[dim] || 0;
        const eff = amenity.effects[dim] || 0;
        if (pref !== 0 && eff !== 0) {
          impact += Math.sign(pref) === Math.sign(eff) ? 1 : -1;
        }
      });
    });
    return impact;
  }

  /* ============================================================
     OPTIMIZER (brute-force)
     ============================================================ */

  /**
   * Try all 3x3x3x3 = 81 amenity combos and return the best selection
   * for the currently selected guests.
   */
  function optimize() {
    const cats = CATEGORIES.map((c) => c.key);
    const optionsPerCat = cats.map((cat) => getAmenitiesByCategory(cat));

    let bestScore = -Infinity;
    let bestCombo = null;

    // Recursive enumeration (4 levels deep, 3 options each)
    function enumerate(catIdx, current) {
      if (catIdx === cats.length) {
        const score = totalHappiness(selectedGuests, current);
        if (score > bestScore) {
          bestScore = score;
          bestCombo = { ...current };
        }
        return;
      }

      const cat = cats[catIdx];
      const options = optionsPerCat[catIdx];

      for (const option of options) {
        current[cat] = option.id;
        enumerate(catIdx + 1, current);
      }
    }

    enumerate(0, { ...selectedAmenities });

    if (bestCombo) {
      selectedAmenities = bestCombo;
      saveState();
      render();
    }
  }

  /* ============================================================
     PERSISTENCE
     ============================================================ */

  function saveState() {
    try {
      const state = { selectedGuests, selectedAmenities };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // localStorage may be unavailable
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const state = JSON.parse(raw);

      if (Array.isArray(state.selectedGuests) && state.selectedGuests.length === 4) {
        selectedGuests = state.selectedGuests;
      }
      if (state.selectedAmenities && typeof state.selectedAmenities === "object") {
        for (const cat of CATEGORIES) {
          if (state.selectedAmenities[cat.key] !== undefined) {
            selectedAmenities[cat.key] = state.selectedAmenities[cat.key];
          }
        }
      }
    } catch (e) {
      // ignore corrupt state
    }
  }

  function resetAll() {
    selectedGuests = [null, null, null, null];
    selectedAmenities = {
      entertainment: null,
      refreshment: null,
      decoration: null,
      security: null,
    };
    saveState();
    render();
  }

  /* ============================================================
     EVENT HANDLERS
     ============================================================ */

  function handleGuestClick(slotIndex, guestId) {
    if (selectedGuests[slotIndex] === guestId) {
      // Deselect
      selectedGuests[slotIndex] = null;
    } else {
      selectedGuests[slotIndex] = guestId;
    }
    saveState();
    render();
  }

  function handleAmenityClick(category, amenityId) {
    if (selectedAmenities[category] === amenityId) {
      // Deselect
      selectedAmenities[category] = null;
    } else {
      selectedAmenities[category] = amenityId;
    }
    saveState();
    render();
  }

  /* ============================================================
     RENDER HELPERS
     ============================================================ */

  /**
   * Get the preference label for a dimension value.
   * E.g. dim="cleanliness", value=-1 => "Messy"
   */
  function prefLabel(dim, value) {
    if (value === 0) return null;
    const labels = DATA.dimensionLabels[dim];
    return value > 0 ? labels.positive : labels.negative;
  }

  /**
   * Get all non-zero preference labels for a guest.
   */
  function guestPrefLabels(guest) {
    const labels = [];
    DATA.dimensions.forEach((dim) => {
      const v = guest.preferences[dim];
      if (v !== 0) {
        labels.push(prefLabel(dim, v));
      }
    });
    return labels;
  }

  /**
   * Get effect labels for an amenity.
   */
  function amenityEffectTags(amenity) {
    const tags = [];
    DATA.dimensions.forEach((dim) => {
      const v = amenity.effects[dim];
      if (v !== 0) {
        const labels = DATA.dimensionLabels[dim];
        const label = v > 0 ? labels.positive : labels.negative;
        tags.push({ label: "+" + label, isPositive: true, dim });
      }
    });
    return tags;
  }

  /**
   * Count the maximum possible happiness points for selected guests.
   * This is the sum of non-zero preferences across all selected guests.
   */
  function maxPossibleScore() {
    let max = 0;
    selectedGuests.forEach((gId) => {
      if (!gId) return;
      const guest = getGuest(gId);
      if (!guest) return;
      DATA.dimensions.forEach((dim) => {
        if (guest.preferences[dim] !== 0) max++;
      });
    });
    return max;
  }

  /* ============================================================
     RENDERING
     ============================================================ */

  function render() {
    if (!root || !DATA) return;

    const hasGuests = selectedGuests.some((g) => g !== null);
    const hasAmenities = Object.values(selectedAmenities).some((a) => a !== null);

    root.innerHTML = [
      renderGuestSection(),
      '<hr class="ec-divider">',
      renderAmenitySection(),
      renderOptimizeButton(),
      '<hr class="ec-divider">',
      renderResultsSection(),
    ].join("");

    bindEvents();
  }

  /* --- Guest Section --- */
  function renderGuestSection() {
    const guestCount = selectedGuests.filter((g) => g !== null).length;
    let html = `
      <section class="ec-section" id="guest-section">
        <div class="ec-section-header">
          <h2 class="ec-section-title">Guest Selection</h2>
          <span class="ec-section-badge">${guestCount} / 4 Invited</span>
        </div>`;

    DATA.slots.forEach((slot, slotIndex) => {
      html += `
        <div class="slot-row">
          <div class="slot-label">RSVP ${slot.name}</div>
          <div class="slot-guests">`;

      slot.guestIds.forEach((guestId) => {
        const guest = getGuest(guestId);
        if (!guest) return;

        const isSelected = selectedGuests[slotIndex] === guestId;
        const prefs = guestPrefLabels(guest);
        const icon = FACTION_ICONS[guest.faction] || "\u2726";

        html += `
            <div class="guest-card ${isSelected ? "selected" : ""}"
                 data-slot="${slotIndex}" data-guest="${guestId}"
                 role="radio" aria-checked="${isSelected}" tabindex="0">
              <div class="guest-check">\u2713</div>
              <div class="guest-portrait ${factionClass(guest.faction)}">${icon}</div>
              <div class="guest-name">${guest.name}</div>
              <div class="guest-faction">${guest.faction}</div>
              <div class="guest-prefs">
                ${prefs.map((p) => `<span class="pref-tag">${p}</span>`).join("")}
              </div>
            </div>`;
      });

      html += `
          </div>
        </div>`;
    });

    html += `</section>`;
    return html;
  }

  /* --- Amenity Section --- */
  function renderAmenitySection() {
    const hasGuests = selectedGuests.some((g) => g !== null);

    let html = `
      <section class="ec-section" id="amenity-section">
        <div class="ec-section-header">
          <h2 class="ec-section-title">Amenity Selection</h2>
        </div>`;

    if (!hasGuests) {
      html += `<p style="color: var(--text-secondary); font-style: italic; text-align: center; margin-bottom: var(--space-md);">
        Select guests above to see happiness impact on each amenity.</p>`;
    }

    CATEGORIES.forEach((cat) => {
      const options = getAmenitiesByCategory(cat.key);

      html += `
        <div class="amenity-category">
          <div class="category-label">
            ${cat.label}
            <span class="category-manager">${cat.manager}</span>
          </div>
          <div class="amenity-options">`;

      options.forEach((amenity) => {
        const isSelected = selectedAmenities[cat.key] === amenity.id;
        const effectTags = amenityEffectTags(amenity);
        const impact = hasGuests ? amenityImpactForGuests(amenity) : 0;
        let impactClass = "impact-neutral";
        let impactText = "";
        if (hasGuests && impact !== 0) {
          impactClass = impact > 0 ? "impact-positive" : "impact-negative";
          impactText = impact > 0 ? "+" + impact : "" + impact;
        }

        html += `
            <div class="amenity-chip ${isSelected ? "selected" : ""}"
                 data-category="${cat.key}" data-amenity="${amenity.id}"
                 role="radio" aria-checked="${isSelected}" tabindex="0">
              <div class="amenity-name">${amenity.name}</div>
              <div class="amenity-effects">
                ${effectTags
                  .map(
                    (t) =>
                      `<span class="effect-tag positive">${t.label}</span>`
                  )
                  .join("")}
              </div>
              ${hasGuests ? `<div class="amenity-impact ${impactClass}">${impactText || "\u2014"}</div>` : ""}
            </div>`;
      });

      html += `
          </div>
        </div>`;
    });

    html += `</section>`;
    return html;
  }

  /* --- Optimize Button --- */
  function renderOptimizeButton() {
    const hasGuests = selectedGuests.some((g) => g !== null);
    return `
      <div class="optimize-row">
        <button class="btn-optimize" id="btn-optimize" ${hasGuests ? "" : "disabled"}>
          Optimize Amenities
        </button>
      </div>`;
  }

  /* --- Results Section --- */
  function renderResultsSection() {
    const activeGuests = selectedGuests.filter((g) => g !== null);
    const hasAmenities = Object.values(selectedAmenities).some((a) => a !== null);

    let html = `
      <section class="ec-section" id="results-section">
        <div class="ec-section-header">
          <h2 class="ec-section-title">Results</h2>
        </div>`;

    if (activeGuests.length === 0) {
      html += `<div class="results-empty">Invite at least one guest to see results.</div>`;
      html += `</section>`;
      return html;
    }

    if (!hasAmenities) {
      html += `<div class="results-empty">Pick amenities or click Optimize to see happiness scores.</div>`;
      html += `</section>`;
      return html;
    }

    // Compute
    const netAtmosphere = computeNetAtmosphere(selectedAmenities);
    const maxScore = maxPossibleScore();
    let totalScore = 0;
    const guestScores = [];

    activeGuests.forEach((gId) => {
      const guest = getGuest(gId);
      if (!guest) return;
      const result = scoreGuest(guest, netAtmosphere);
      totalScore += result.total;
      guestScores.push({ guest, ...result });
    });

    // Determine fill percentage: map score from [-maxScore, maxScore] to [0%, 100%]
    const fillPct =
      maxScore > 0 ? Math.round(((totalScore + maxScore) / (2 * maxScore)) * 100) : 50;

    html += renderSummary(totalScore, maxScore, fillPct, netAtmosphere);
    html += renderGuestBreakdowns(guestScores);

    html += `</section>`;
    return html;
  }

  function renderSummary(totalScore, maxScore, fillPct, netAtmosphere) {
    let html = `
      <div class="results-summary">
        <div class="results-total-label">Total Happiness</div>
        <div class="results-total-score">${totalScore > 0 ? "+" : ""}${totalScore} / ${maxScore}</div>
        <div class="results-happiness-bar">
          <div class="results-happiness-fill" style="width: ${fillPct}%"></div>
        </div>
        <div class="results-atmosphere">
          <div class="atmosphere-title">Net Atmosphere</div>
          <div class="atmosphere-dims">`;

    DATA.dimensions.forEach((dim) => {
      const val = netAtmosphere[dim];
      const labels = DATA.dimensionLabels[dim];
      let displayLabel = "";
      let valClass = "zero";

      if (val > 0) {
        displayLabel = labels.positive;
        valClass = "positive";
      } else if (val < 0) {
        displayLabel = labels.negative;
        valClass = "negative";
      } else {
        displayLabel = "Neutral";
      }

      const absVal = Math.abs(val);
      const prefix = val > 0 ? "+" : val < 0 ? "-" : "";

      html += `
            <div class="atmo-dim">
              <span class="atmo-dim-label">${capitalize(dim)}:</span>
              <span class="atmo-dim-value ${valClass}">${prefix}${absVal} ${displayLabel}</span>
            </div>`;
    });

    html += `
          </div>
        </div>
      </div>`;
    return html;
  }

  function renderGuestBreakdowns(guestScores) {
    let html = `<div class="results-guests">`;

    guestScores.forEach(({ guest, total, details }) => {
      const icon = FACTION_ICONS[guest.faction] || "\u2726";
      const prefCount = details.filter((d) => d.prefValue !== 0).length;

      // Determine bar style
      let barClass = "bar-neutral";
      if (total > 0) barClass = "bar-positive";
      else if (total < 0) barClass = "bar-negative";
      else if (details.some((d) => d.result !== 0)) barClass = "bar-mixed";

      // Map score to bar width: range [-prefCount, prefCount] => [0%, 100%]
      const barPct =
        prefCount > 0
          ? Math.round(((total + prefCount) / (2 * prefCount)) * 100)
          : 50;

      html += `
        <div class="result-guest-card">
          <div class="result-guest-header">
            <div class="result-guest-portrait ${factionClass(guest.faction)}">${icon}</div>
            <div class="result-guest-info">
              <div class="result-guest-name">${guest.name}</div>
              <div class="result-guest-score">Score: ${total > 0 ? "+" : ""}${total} / ${prefCount}</div>
            </div>
          </div>
          <div class="result-guest-bar">
            <div class="result-guest-bar-fill ${barClass}" style="width: ${barPct}%"></div>
          </div>
          <ul class="result-dim-list">`;

      details.forEach(({ dim, prefValue, netValue, result }) => {
        if (prefValue === 0) return; // Only show dimensions the guest cares about

        const labels = DATA.dimensionLabels[dim];
        const prefLbl = prefValue > 0 ? labels.positive : labels.negative;
        let iconStr, iconClass, valueStr, valueClass;

        if (result === 1) {
          iconStr = "\u2713";
          iconClass = "match";
          valueStr = "+1";
          valueClass = "match";
        } else if (result === -1) {
          iconStr = "\u2717";
          iconClass = "conflict";
          valueStr = "-1";
          valueClass = "conflict";
        } else {
          iconStr = "\u2014";
          iconClass = "neutral";
          valueStr = "0";
          valueClass = "neutral";
        }

        const netLabel = netValue !== 0
          ? (netValue > 0 ? labels.positive : labels.negative)
          : "Neutral";

        html += `
            <li class="result-dim-item">
              <span class="result-dim-icon ${iconClass}">${iconStr}</span>
              <span class="result-dim-label">Wants <strong>${prefLbl}</strong> &mdash; Court: ${netLabel}</span>
              <span class="result-dim-value ${valueClass}">${valueStr}</span>
            </li>`;
      });

      html += `
          </ul>
        </div>`;
    });

    html += `</div>`;
    return html;
  }

  /* ============================================================
     EVENT BINDING
     ============================================================ */

  function bindEvents() {
    // Guest cards
    root.querySelectorAll(".guest-card").forEach((card) => {
      const handler = () => {
        const slotIndex = parseInt(card.dataset.slot, 10);
        const guestId = card.dataset.guest;
        handleGuestClick(slotIndex, guestId);
      };
      card.addEventListener("click", handler);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handler();
        }
      });
    });

    // Amenity chips
    root.querySelectorAll(".amenity-chip").forEach((chip) => {
      const handler = () => {
        const category = chip.dataset.category;
        const amenityId = chip.dataset.amenity;
        handleAmenityClick(category, amenityId);
      };
      chip.addEventListener("click", handler);
      chip.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handler();
        }
      });
    });

    // Optimize button
    const optimizeBtn = document.getElementById("btn-optimize");
    if (optimizeBtn) {
      optimizeBtn.addEventListener("click", () => {
        optimize();
        // Scroll to results
        const resultsEl = document.getElementById("results-section");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    // Reset button (in header, outside #app-root)
    const resetBtn = document.getElementById("reset-all");
    if (resetBtn) {
      // Remove old listener by cloning
      const newResetBtn = resetBtn.cloneNode(true);
      resetBtn.parentNode.replaceChild(newResetBtn, resetBtn);
      newResetBtn.addEventListener("click", () => {
        if (confirm("Reset all selections?")) {
          resetAll();
        }
      });
    }
  }

  /* ============================================================
     UTILITY
     ============================================================ */

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* ============================================================
     INIT
     ============================================================ */

  function init() {
    root = document.getElementById("app-root");
    if (!root) {
      console.error("App root element (#app-root) not found.");
      return;
    }

    if (!DATA) {
      root.innerHTML =
        '<p style="color: #e53935; text-align: center; padding: 2rem;">Error: Game data not loaded. Make sure data.js is included before app.js.</p>';
      return;
    }

    loadState();
    render();
    console.log("Ember Court Calculator initialised.");
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */
  return { init };
})();

// Boot the app once the DOM is ready
document.addEventListener("DOMContentLoaded", App.init);
