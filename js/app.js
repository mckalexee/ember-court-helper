/**
 * app.js - Ember Court Calculator
 *
 * Full application logic: renders guest selection, amenity selection,
 * results panel, and handles the optimize algorithm.
 * Includes conflict detection and replacement suggestion engine.
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

  // Set of slot indices the user has locked (persisted to localStorage)
  let lockedSlots = new Set();

  // Set of amenity IDs not yet unlocked in-game (persisted to localStorage)
  let unavailableAmenities = new Set();

  // Computed on every render -- not persisted
  let activeConflicts = [];

  // Computed on demand when user clicks "Suggest Replacements"
  let showingSuggestions = false;
  let replacementSuggestions = [];

  // Set of reward IDs the user has collected (persisted to localStorage)
  let collectedRewards = new Set();

  // Which guest's reward panel is currently expanded (ephemeral, not persisted)
  let expandedRewardGuest = null;

  /** Cached DOM root */
  let root;

  /* ============================================================
     SVG ICON CONSTANTS
     ============================================================ */

  const LOCK_OPEN_SVG = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2C9.24 2 7 4.24 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-1.1-.36-2.12-.97-2.95M9 7a3 3 0 0 1 6 0v3h-2V7a1 1 0 1 0-2 0v1H9V7z"/></svg>';

  const LOCK_CLOSED_SVG = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M18 10h-1V7A5 5 0 0 0 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM9 7a3 3 0 0 1 6 0v3H9V7z"/></svg>';

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

  function getGuestRewards(guestId) {
    const guest = getGuest(guestId);
    return guest && guest.rewards ? guest.rewards : [];
  }

  function isRewardCollected(rewardId) {
    return collectedRewards.has(rewardId);
  }

  function allRewardsCollected(guestId) {
    const rewards = getGuestRewards(guestId);
    return rewards.length > 0 && rewards.every((r) => collectedRewards.has(r.id));
  }

  const REWARD_CATEGORIES = [
    { key: "mount",    label: "Mounts" },
    { key: "pet",      label: "Pets" },
    { key: "toy",      label: "Toys" },
    { key: "transmog", label: "Transmog" },
  ];

  function getRewardIconPath(reward) {
    return "img/rewards/" + reward.id + ".jpg";
  }

  function getCategoryIconPath(type) {
    return "img/rewards/" + type + "-category.jpg";
  }

  function getAllRewardsByType(type) {
    var results = [];
    DATA.guests.forEach(function (guest) {
      if (!guest.rewards) return;
      guest.rewards.forEach(function (reward) {
        if (reward.type === type) {
          results.push({ reward: reward, guest: guest });
        }
      });
    });
    return results;
  }

  /** Ordered list of amenity categories */
  const CATEGORIES = [
    { key: "entertainment", label: "Entertainment", manager: "Hips" },
    { key: "refreshment", label: "Refreshments", manager: "Picky Stefan" },
    { key: "decoration", label: "Decorations", manager: "Boot the Beaut" },
    { key: "security", label: "Security", manager: "Watchmaster Boromod" },
  ];

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
     EVENT-AWARE SCORING
     ============================================================ */

  /**
   * Weight for event bonus in optimizer scoring.
   * Kept small so events act as tiebreakers, never overriding base scores.
   * Max raw activity benefit: 4 guests x 6 activities = 24 alignment points.
   * At 0.1 weight, max event bonus = 2.4 (less than 3 base score points).
   */
  const EVENT_WEIGHT = 0.1;

  /**
   * Compute an event bonus for amenity selections against a set of guests.
   * For each amenity's activities, +1 per guest whose preference aligns
   * with the activity's direction. Conflicting activities score 0 (skippable).
   */
  function eventBonus(amenitySelections, guestIds) {
    let bonus = 0;
    Object.values(amenitySelections).forEach(function (amenityId) {
      if (!amenityId) return;
      var amenity = getAmenity(amenityId);
      if (!amenity || !amenity.activities) return;
      amenity.activities.forEach(function (activity) {
        guestIds.forEach(function (gId) {
          if (!gId) return;
          var guest = getGuest(gId);
          if (!guest) return;
          var pref = guest.preferences[activity.dim] || 0;
          if (pref !== 0 && Math.sign(pref) === Math.sign(activity.direction)) {
            bonus += 1;
          }
        });
      });
    });
    return bonus * EVENT_WEIGHT;
  }

  /**
   * Compute DO/SKIP/CAUTION/OPTIONAL verdict for an activity
   * against the current selected guests (or a provided guest list).
   */
  function activityVerdict(activity, guestIds) {
    var benefit = 0, harm = 0;
    guestIds.forEach(function (gId) {
      if (!gId) return;
      var guest = getGuest(gId);
      if (!guest) return;
      var pref = guest.preferences[activity.dim] || 0;
      if (pref !== 0) {
        if (Math.sign(pref) === Math.sign(activity.direction)) benefit++;
        else harm++;
      }
    });
    if (benefit > 0 && harm === 0) return { verdict: "do", benefit: benefit, harm: harm };
    if (harm > 0 && benefit === 0) return { verdict: "skip", benefit: benefit, harm: harm };
    if (benefit > 0 && harm > 0) return { verdict: "caution", benefit: benefit, harm: harm };
    return { verdict: "optional", benefit: benefit, harm: harm };
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
    const optionsPerCat = cats.map((cat) => {
      const available = getAmenitiesByCategory(cat).filter(
        (a) => !unavailableAmenities.has(a.id)
      );
      return available.length > 0 ? available : [{ id: null }];
    });

    let bestScore = -Infinity;
    let bestCombo = null;

    // Recursive enumeration (4 levels deep)
    function enumerate(catIdx, current) {
      if (catIdx === cats.length) {
        const score = totalHappiness(selectedGuests, current) + eventBonus(current, selectedGuests);
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

  /**
   * Run brute-force optimizer for an arbitrary guest lineup.
   * Returns the best possible total happiness score.
   */
  function optimizeForLineup(guestIds) {
    const cats = CATEGORIES.map((c) => c.key);
    const optionsPerCat = cats.map((cat) => {
      const available = getAmenitiesByCategory(cat).filter(
        (a) => !unavailableAmenities.has(a.id)
      );
      return available.length > 0 ? available : [{ id: null }];
    });

    let bestScore = -Infinity;

    function enumerate(catIdx, current) {
      if (catIdx === cats.length) {
        const score = totalHappiness(guestIds, current) + eventBonus(current, guestIds);
        if (score > bestScore) {
          bestScore = score;
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

    enumerate(0, {
      entertainment: null,
      refreshment: null,
      decoration: null,
      security: null,
    });

    return bestScore;
  }

  /* ============================================================
     CONFLICT DETECTION
     ============================================================ */

  /**
   * Detect conflicts between selected guests.
   * A conflict exists when two selected guests have opposite non-zero
   * preferences on the same dimension.
   *
   * Returns array of { dimension, guestA, guestB, labelA, labelB }
   */
  function detectConflicts(guestIds) {
    const conflicts = [];
    const activeIds = guestIds.filter((id) => id !== null);

    for (let i = 0; i < activeIds.length; i++) {
      for (let j = i + 1; j < activeIds.length; j++) {
        const gA = getGuest(activeIds[i]);
        const gB = getGuest(activeIds[j]);
        if (!gA || !gB) continue;

        DATA.dimensions.forEach((dim) => {
          const prefA = gA.preferences[dim] || 0;
          const prefB = gB.preferences[dim] || 0;

          if (prefA !== 0 && prefB !== 0 && Math.sign(prefA) !== Math.sign(prefB)) {
            conflicts.push({
              dimension: dim,
              guestA: activeIds[i],
              guestB: activeIds[j],
              labelA: prefLabel(dim, prefA),
              labelB: prefLabel(dim, prefB),
            });
          }
        });
      }
    }

    return conflicts;
  }

  /* ============================================================
     REPLACEMENT SUGGESTION ENGINE
     ============================================================ */

  /**
   * Compute replacement suggestions for unlocked guests.
   * For each unlocked selected guest, try each alternative in the same slot.
   * Compare conflict count and optimal happiness for the candidate lineup.
   * Return up to 3 best single-swap suggestions.
   */
  function computeSuggestions() {
    const currentConflicts = detectConflicts(selectedGuests);
    if (currentConflicts.length === 0) return [];

    const currentBestHappiness = optimizeForLineup(selectedGuests);
    const suggestions = [];

    selectedGuests.forEach((guestId, slotIndex) => {
      if (!guestId) return;
      if (lockedSlots.has(slotIndex)) return;

      const slot = DATA.slots[slotIndex];

      slot.guestIds.forEach((altId) => {
        if (altId === guestId) return;

        // Build candidate lineup
        const candidateLineup = [...selectedGuests];
        candidateLineup[slotIndex] = altId;

        // Compute conflicts for candidate
        const candidateConflicts = detectConflicts(candidateLineup);
        const conflictsResolved = currentConflicts.length - candidateConflicts.length;

        if (conflictsResolved <= 0) return; // No improvement

        // Determine which conflicts are resolved
        const resolvedDetails = [];
        currentConflicts.forEach((cc) => {
          // Check if this conflict still exists in candidate
          const stillExists = candidateConflicts.some(
            (nc) =>
              nc.dimension === cc.dimension &&
              ((nc.guestA === cc.guestA && nc.guestB === cc.guestB) ||
                (nc.guestA === cc.guestB && nc.guestB === cc.guestA))
          );
          if (!stillExists) {
            resolvedDetails.push(cc);
          }
        });

        // Compute optimal happiness for candidate lineup
        const candidateBestHappiness = optimizeForLineup(candidateLineup);
        const happinessDelta = candidateBestHappiness - currentBestHappiness;

        suggestions.push({
          guestOut: guestId,
          guestIn: altId,
          slotIndex,
          conflictsResolved,
          resolvedDetails,
          happinessDelta,
          candidateConflictCount: candidateConflicts.length,
        });
      });
    });

    // Sort by conflictsResolved DESC, then happinessDelta DESC
    suggestions.sort((a, b) => {
      if (b.conflictsResolved !== a.conflictsResolved) {
        return b.conflictsResolved - a.conflictsResolved;
      }
      return b.happinessDelta - a.happinessDelta;
    });

    // Deduplicate: keep only the best suggestion per guest-out
    const seen = new Set();
    const deduped = [];
    for (const s of suggestions) {
      if (!seen.has(s.guestOut)) {
        seen.add(s.guestOut);
        deduped.push(s);
      }
    }

    // Return top 3
    return deduped.slice(0, 3);
  }

  /* ============================================================
     PERSISTENCE
     ============================================================ */

  function saveState() {
    try {
      const state = {
        selectedGuests,
        selectedAmenities,
        lockedSlots: Array.from(lockedSlots),
        unavailableAmenities: Array.from(unavailableAmenities),
        collectedRewards: Array.from(collectedRewards),
      };
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
      // Migration: lockedGuests (guest IDs) -> lockedSlots (slot indices)
      if (Array.isArray(state.lockedGuests) && state.lockedGuests.length > 0 && !Array.isArray(state.lockedSlots)) {
        state.lockedGuests.forEach((guestId) => {
          const slotIndex = selectedGuests.indexOf(guestId);
          if (slotIndex !== -1) {
            lockedSlots.add(slotIndex);
          }
        });
        saveState();
      }
      if (Array.isArray(state.lockedSlots)) {
        lockedSlots = new Set(state.lockedSlots);
      }
      // Migration: lockedAmenities -> unavailableAmenities
      if (Array.isArray(state.lockedAmenities) && state.lockedAmenities.length > 0 && !Array.isArray(state.unavailableAmenities)) {
        unavailableAmenities = new Set(state.lockedAmenities);
        saveState();
      }
      if (Array.isArray(state.unavailableAmenities)) {
        unavailableAmenities = new Set(state.unavailableAmenities);
      }
      if (Array.isArray(state.collectedRewards)) {
        collectedRewards = new Set(state.collectedRewards);
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
    lockedSlots = new Set();
    unavailableAmenities = new Set();
    showingSuggestions = false;
    replacementSuggestions = [];
    expandedRewardGuest = null;
    // collectedRewards is NOT cleared -- collection progress is account-wide
    saveState();
    render();
  }

  /* ============================================================
     EVENT HANDLERS
     ============================================================ */

  function handleGuestClick(slotIndex, guestId) {
    if (selectedGuests[slotIndex] === guestId) {
      // Deselect -- auto-unlock the slot
      selectedGuests[slotIndex] = null;
      lockedSlots.delete(slotIndex);
    } else {
      selectedGuests[slotIndex] = guestId;
    }
    // Dismiss suggestions on any guest change
    showingSuggestions = false;
    replacementSuggestions = [];
    saveState();
    render();
  }

  function handleAmenityClick(category, amenityId) {
    if (unavailableAmenities.has(amenityId)) return;
    if (selectedAmenities[category] === amenityId) {
      // Deselect
      selectedAmenities[category] = null;
    } else {
      selectedAmenities[category] = amenityId;
    }
    saveState();
    render();
  }

  function handleAmenityAvailabilityToggle(amenityId) {
    if (unavailableAmenities.has(amenityId)) {
      unavailableAmenities.delete(amenityId);
    } else {
      unavailableAmenities.add(amenityId);
      // Deselect if currently selected
      const amenity = DATA.amenities.find(function (a) { return a.id === amenityId; });
      if (amenity && selectedAmenities[amenity.category] === amenityId) {
        selectedAmenities[amenity.category] = null;
      }
    }
    saveState();
    render();
  }

  function handleRewardToggle(rewardId) {
    if (collectedRewards.has(rewardId)) {
      collectedRewards.delete(rewardId);
    } else {
      collectedRewards.add(rewardId);
    }
    saveState();
    render();
  }

  function handleRewardPanelToggle(guestId) {
    if (expandedRewardGuest === guestId) {
      expandedRewardGuest = null;
    } else {
      expandedRewardGuest = guestId;
    }
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

    // Compute conflicts for this render cycle
    activeConflicts = detectConflicts(selectedGuests);

    root.innerHTML = [
      renderGuestSection(),
      renderConflictBanner(),
      renderSuggestionPanel(),
      '<hr class="ec-divider">',
      renderAmenitySection(),
      renderOptimizeButton(),
      '<hr class="ec-divider">',
      renderResultsSection(),
      '<hr class="ec-divider">',
      renderEventGuide(),
      '<hr class="ec-divider">',
      renderRewardCollectionSection(),
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
      const slotHasGuest = selectedGuests[slotIndex] !== null;
      const slotIsLocked = lockedSlots.has(slotIndex);

      // Lock toggle in slot header (only shown when a guest is selected)
      const slotLockHtml = slotHasGuest
        ? `<div class="slot-lock ${slotIsLocked ? "locked" : ""}"
                data-slot="${slotIndex}"
                role="checkbox" aria-checked="${slotIsLocked}"
                aria-label="${slotIsLocked ? "Unlock" : "Lock"} ${slot.name}"
                tabindex="0"
                title="${slotIsLocked ? "Locked -- click to unlock" : "Click to lock -- locked slots won't be suggested for replacement"}">
              ${slotIsLocked ? LOCK_CLOSED_SVG : LOCK_OPEN_SVG}
            </div>`
        : "";

      html += `
        <div class="slot-row${slotIsLocked ? " locked" : ""}">
          <div class="slot-label">RSVP ${slot.name}${slotLockHtml}</div>
          <div class="slot-guests">`;

      slot.guestIds.forEach((guestId) => {
        const guest = getGuest(guestId);
        if (!guest) return;

        const isSelected = selectedGuests[slotIndex] === guestId;
        const portraitImg = `<img src="img/guests/${guestId}.png" alt="${guest.name}" width="128" height="128" loading="lazy">`;

        // Compute conflicts for this guest
        const conflictsForGuest = isSelected
          ? activeConflicts.filter((c) => c.guestA === guestId || c.guestB === guestId)
          : [];
        const conflictingDims = new Set(conflictsForGuest.map((c) => c.dimension));

        // Build preference tags with conflict awareness
        const prefTagsHtml = DATA.dimensions
          .map((dim) => {
            const v = guest.preferences[dim];
            if (v === 0) return "";
            const label = prefLabel(dim, v);
            const hasConflict = isSelected && conflictingDims.has(dim);
            return `<span class="pref-tag dim-${dim} ${hasConflict ? "conflict" : ""}">${label}</span>`;
          })
          .join("");

        // Conflict count badge
        const conflictBadge =
          isSelected && conflictsForGuest.length > 0
            ? `<div class="guest-conflict-badge" aria-label="${conflictsForGuest.length} conflict${conflictsForGuest.length !== 1 ? "s" : ""}">${conflictsForGuest.length}</div>`
            : "";

        html += `
            <div class="guest-card ${isSelected ? "selected" : ""}"
                 data-slot="${slotIndex}" data-guest="${guestId}"
                 role="radio" aria-checked="${isSelected}" tabindex="0">
              <div class="guest-check">\u2713</div>
              <div class="guest-portrait ${factionClass(guest.faction)}">${portraitImg}</div>
              <div class="guest-name">${guest.name}</div>
              <div class="guest-faction">${guest.faction}</div>
              <div class="guest-prefs">
                ${prefTagsHtml}
              </div>
              ${renderRewardIndicators(guest)}
              ${conflictBadge}
            </div>`;
      });

      html += `
          </div>`;

      // Conditionally render reward panel after the slot's guest grid
      if (expandedRewardGuest && slot.guestIds.includes(expandedRewardGuest)) {
        html += renderRewardPanel(expandedRewardGuest);
      }

      html += `
        </div>`;
    });

    html += `</section>`;
    return html;
  }

  /* --- Reward Icon Row (on guest cards) --- */
  function renderRewardIndicators(guest) {
    var rewards = guest.rewards || [];
    if (rewards.length === 0) return "";

    var isExpanded = expandedRewardGuest === guest.id;
    var allCollected = allRewardsCollected(guest.id);
    var uncollected = rewards.filter(function (r) { return !collectedRewards.has(r.id); }).length;

    var classes = "guest-reward-icons";
    if (isExpanded) classes += " expanded";
    if (allCollected) classes += " all-collected";

    var ariaLabel = allCollected
      ? "Rewards for " + guest.name + " - all collected"
      : "Rewards for " + guest.name + ": " + uncollected + " uncollected";

    var html = '<div class="' + classes + '" data-guest="' + guest.id + '" tabindex="0" role="button" aria-label="' + ariaLabel + '">';

    rewards.forEach(function (r) {
      var collected = collectedRewards.has(r.id);
      var title = capitalize(r.type) + ": " + r.name + (collected ? " (Collected)" : "");
      var alt = capitalize(r.type) + ": " + r.name + (collected ? " (Collected)" : "");
      html += '<img class="reward-icon' + (collected ? " collected" : "") + '" src="' + getRewardIconPath(r) + '" alt="' + alt + '" title="' + title + '">';
    });

    if (allCollected) {
      html += '<span class="reward-icons-check">&check;</span>';
    }

    html += '</div>';
    return html;
  }

  /* --- Reward Panel (expandable detail) --- */
  function renderRewardPanel(guestId) {
    var guest = getGuest(guestId);
    if (!guest) return "";
    var rewards = guest.rewards || [];
    if (rewards.length === 0) return "";

    var html = '<div class="reward-panel" data-guest="' + guestId + '">';
    html += '<div class="reward-panel-header">';
    html += '<h3 class="reward-panel-title">Rewards for ' + guest.name + '</h3>';
    html += '<button class="reward-panel-close" aria-label="Close reward panel">&times;</button>';
    html += '</div>';
    html += '<div class="reward-grid">';

    rewards.forEach(function (r) {
      var collected = collectedRewards.has(r.id);
      var nameHtml = r.wowheadUrl
        ? '<a href="' + r.wowheadUrl + '" target="_blank" rel="noopener noreferrer" class="reward-wowhead-link">' + r.name + ' &#x2197;</a>'
        : r.name;
      var typeLabel = '<span class="reward-row-type">' + capitalize(r.type) + '</span>';
      html += '<div class="reward-row' + (collected ? " collected" : "") + '">';
      html += '<img class="reward-row-icon" src="' + getRewardIconPath(r) + '" alt="' + r.name + '" width="28" height="28">';
      html += '<span class="reward-row-name">' + typeLabel + ' ' + nameHtml + '</span>';
      html += r.requirement && r.requirement !== "Any"
        ? '<span class="reward-requirement">' + r.requirement + '</span>'
        : '<span class="reward-requirement"></span>';
      html += '<button class="reward-collect-btn" data-reward="' + r.id + '" role="checkbox" aria-checked="' + collected + '" aria-label="' + (collected ? "Unmark " : "Mark ") + r.name + ' as collected" tabindex="0">';
      html += '<span class="reward-checkbox"></span>';
      html += '</button>';
      html += '</div>';
    });

    html += '</div></div>';
    return html;
  }

  /* --- Event Guide Section --- */
  function renderEventGuide() {
    var activeGuests = selectedGuests.filter(function (g) { return g !== null; });
    var hasAmenities = Object.values(selectedAmenities).some(function (a) { return a !== null; });

    var html = '<section class="ec-section" id="event-guide-section">' +
      '<div class="ec-section-header">' +
      '<h2 class="ec-section-title">During the Court</h2>' +
      '<span class="ec-section-badge">Event Playbook</span>' +
      '</div>';

    if (activeGuests.length === 0 || !hasAmenities) {
      html += '<div class="results-empty">Select guests and amenities to see your event playbook.</div>';
      html += '</section>';
      return html;
    }

    // Amenity activities (Entertainment, Refreshment, Decoration only)
    var hasActivities = false;
    CATEGORIES.forEach(function (cat) {
      var amenityId = selectedAmenities[cat.key];
      if (!amenityId) return;
      var amenity = getAmenity(amenityId);
      if (!amenity || !amenity.activities || amenity.activities.length === 0) return;

      hasActivities = true;
      html += '<div class="event-category">';
      html += '<div class="event-category-label">' + cat.label + ': ' + amenity.name + '</div>';
      html += '<div class="event-activity-list">';

      amenity.activities.forEach(function (activity) {
        var vResult = activityVerdict(activity, selectedGuests);
        var v = vResult.verdict;
        var labels = DATA.dimensionLabels[activity.dim];
        var effectLabel = activity.direction > 0 ? labels.positive : labels.negative;

        var verdictIcon, verdictText;
        if (v === "do") {
          verdictIcon = "\u2713";
          verdictText = "DO";
        } else if (v === "skip") {
          verdictIcon = "\u2717";
          verdictText = "SKIP";
        } else if (v === "caution") {
          verdictIcon = "\u26A0";
          verdictText = "" + vResult.benefit + " benefit, " + vResult.harm + " harmed";
        } else {
          verdictIcon = "\u2014";
          verdictText = "OPTIONAL";
        }

        html += '<div class="event-activity ' + v + '">';
        html += '<div class="event-verdict">';
        html += '<span class="event-verdict-icon">' + verdictIcon + '</span>';
        html += '<span class="event-verdict-text">' + verdictText + '</span>';
        html += '</div>';
        html += '<div class="event-activity-details">';
        html += '<div class="event-activity-header">';
        html += '<span class="event-activity-name">' + activity.name + '</span>';
        html += '<span class="effect-tag dim-' + activity.dim + '">+' + effectLabel + '</span>';
        if (activity.prepPhase) {
          html += '<span class="event-prep-badge">Prep Phase</span>';
        }
        html += '</div>';
        html += '<div class="event-activity-tip">' + activity.tip + '</div>';
        if (activity.dualNature) {
          html += '<div class="event-activity-note">\u26A1 ' + activity.dualNature + '</div>';
        }
        html += '</div>';
        html += '</div>';
      });

      html += '</div></div>';
    });

    if (!hasActivities) {
      html += '<div class="results-empty">Selected amenities have no in-event activities (Security provides base effects only).</div>';
    }

    // Random events
    html += renderEventRandomSection();

    // Party crashers
    html += renderEventCrasherSection();

    html += '</section>';
    return html;
  }

  function renderEventRandomSection() {
    var relevant = getRelevantRandomEvents();
    if (relevant.length === 0) return "";

    var html = '<div class="event-random-section">';
    html += '<div class="event-category-label">Random Events <span class="event-subtext">2 may appear per party</span></div>';

    relevant.forEach(function (evt) {
      var rec = randomEventRecommendation(evt);
      var labels = DATA.dimensionLabels[evt.dim];
      var dimLabel = capitalize(evt.dim);

      html += '<div class="event-random-item">';
      html += '<div class="event-random-header">';
      html += '<span class="event-random-name">' + evt.name + '</span>';
      html += '<span class="effect-tag dim-' + evt.dim + '">' + dimLabel + '</span>';
      html += '</div>';

      if (rec.choice === "positive") {
        html += '<div class="event-random-choice recommend">';
        html += '<span class="event-verdict-icon do">\u2713</span> ';
        html += '<strong>+' + labels.positive + ':</strong> ' + evt.positive;
        html += '</div>';
        html += '<div class="event-random-choice avoid">';
        html += '<span class="event-verdict-icon skip">\u2717</span> ';
        html += '+' + labels.negative + ': ' + evt.negative;
        html += '</div>';
      } else if (rec.choice === "negative") {
        html += '<div class="event-random-choice avoid">';
        html += '<span class="event-verdict-icon skip">\u2717</span> ';
        html += '+' + labels.positive + ': ' + evt.positive;
        html += '</div>';
        html += '<div class="event-random-choice recommend">';
        html += '<span class="event-verdict-icon do">\u2713</span> ';
        html += '<strong>+' + labels.negative + ':</strong> ' + evt.negative;
        html += '</div>';
      } else {
        // "either" -- both have supporters
        html += '<div class="event-random-choice mixed">';
        html += '<span class="event-verdict-icon caution">\u26A0</span> ';
        html += '+' + labels.positive + ': ' + evt.positive + ' (' + rec.positive + ' guest' + (rec.positive !== 1 ? "s" : "") + ')';
        html += '</div>';
        html += '<div class="event-random-choice mixed">';
        html += '<span class="event-verdict-icon caution">\u26A0</span> ';
        html += '+' + labels.negative + ': ' + evt.negative + ' (' + rec.negative + ' guest' + (rec.negative !== 1 ? "s" : "") + ')';
        html += '</div>';
      }

      html += '</div>';
    });

    html += '</div>';
    return html;
  }

  function renderEventCrasherSection() {
    var relevant = getRelevantPartyCrashers();
    if (relevant.length === 0) return "";

    var html = '<div class="event-crasher-section">';
    html += '<div class="event-category-label">Party Crashers <span class="event-subtext">defeat for atmosphere boost</span></div>';

    relevant.forEach(function (crasher) {
      var labels = DATA.dimensionLabels[crasher.dim];
      var effectLabel = crasher.direction > 0 ? labels.positive : labels.negative;

      html += '<div class="event-crasher-item">';
      html += '<span class="event-verdict-icon do">\u2713</span> ';
      html += '<strong>' + crasher.boss + '</strong>';
      html += ' (' + crasher.name + ')';
      html += ' <span class="effect-tag dim-' + crasher.dim + '">+' + effectLabel + '</span>';
      html += '</div>';
    });

    html += '</div>';
    return html;
  }

  /**
   * Get random events relevant to the current guest selection.
   * A random event is relevant if at least one guest has a non-zero preference
   * on its dimension.
   */
  function getRelevantRandomEvents() {
    if (!DATA.randomEvents) return [];
    return DATA.randomEvents.filter(function (evt) {
      return selectedGuests.some(function (gId) {
        if (!gId) return false;
        var guest = getGuest(gId);
        return guest && guest.preferences[evt.dim] !== 0;
      });
    });
  }

  /**
   * Get party crashers relevant to the current guest selection.
   * A crasher is relevant if at least one guest has a preference matching
   * the crasher's dimension and direction.
   */
  function getRelevantPartyCrashers() {
    if (!DATA.partyCrashers) return [];
    return DATA.partyCrashers.filter(function (crasher) {
      return selectedGuests.some(function (gId) {
        if (!gId) return false;
        var guest = getGuest(gId);
        if (!guest) return false;
        var pref = guest.preferences[crasher.dim] || 0;
        return pref !== 0 && Math.sign(pref) === Math.sign(crasher.direction);
      });
    });
  }

  /**
   * Compute which choice to recommend for a random event.
   */
  function randomEventRecommendation(evt) {
    var pos = 0, neg = 0;
    selectedGuests.forEach(function (gId) {
      if (!gId) return;
      var guest = getGuest(gId);
      if (!guest) return;
      var pref = guest.preferences[evt.dim] || 0;
      if (pref > 0) pos++;
      else if (pref < 0) neg++;
    });
    if (pos > neg) return { choice: "positive", positive: pos, negative: neg };
    if (neg > pos) return { choice: "negative", positive: pos, negative: neg };
    if (pos > 0) return { choice: "either", positive: pos, negative: neg };
    return { choice: "none", positive: 0, negative: 0 };
  }

  /* --- Reward Collection Section --- */
  function renderRewardCollectionSection() {
    var totalRewards = DATA.guests.reduce(function (sum, g) {
      return sum + (g.rewards ? g.rewards.length : 0);
    }, 0);
    var totalCollected = DATA.guests.reduce(function (sum, g) {
      if (!g.rewards) return sum;
      return sum + g.rewards.filter(function (r) { return collectedRewards.has(r.id); }).length;
    }, 0);
    var progressPct = totalRewards > 0 ? Math.round((totalCollected / totalRewards) * 100) : 0;

    var html = '<section class="ec-section" id="reward-collection-section">';
    html += '<div class="ec-section-header">';
    html += '<h2 class="ec-section-title">Reward Collection</h2>';
    html += '<span class="ec-section-badge">' + totalCollected + ' / ' + totalRewards + ' Collected</span>';
    html += '</div>';

    html += '<div class="reward-progress-bar">';
    html += '<div class="reward-progress-fill" style="width: ' + progressPct + '%"></div>';
    html += '</div>';

    REWARD_CATEGORIES.forEach(function (category) {
      var categoryRewards = getAllRewardsByType(category.key);
      var categoryCollected = categoryRewards.filter(function (r) { return collectedRewards.has(r.reward.id); }).length;

      html += '<div class="reward-category">';
      html += '<div class="reward-category-header">';
      html += '<img class="reward-category-icon" src="' + getCategoryIconPath(category.key) + '" alt="" width="28" height="28">';
      html += '<h3 class="reward-category-title">' + category.label + '</h3>';
      html += '<span class="reward-category-count">' + categoryCollected + ' / ' + categoryRewards.length + '</span>';
      html += '</div>';
      html += '<div class="reward-category-grid">';

      categoryRewards.forEach(function (entry) {
        var r = entry.reward;
        var guest = entry.guest;
        var collected = collectedRewards.has(r.id);
        var fc = factionClass(guest.faction);
        var nameHtml = r.wowheadUrl
          ? '<a href="' + r.wowheadUrl + '" target="_blank" rel="noopener noreferrer" class="reward-wowhead-link">' + r.name + ' &#x2197;</a>'
          : r.name;
        html += '<div class="reward-collection-row' + (collected ? " collected" : "") + '">';
        html += '<img class="reward-row-icon" src="' + getRewardIconPath(r) + '" alt="' + r.name + '" width="32" height="32">';
        html += '<span class="reward-collection-name">' + nameHtml + '</span>';
        html += '<span class="reward-collection-guest ' + fc + '">' + guest.name + '</span>';
        html += r.requirement && r.requirement !== "Any"
          ? '<span class="reward-requirement">' + r.requirement + '</span>'
          : '<span class="reward-requirement"></span>';
        html += '<button class="reward-collect-btn" data-reward="' + r.id + '" role="checkbox" aria-checked="' + collected + '" aria-label="Mark ' + r.name + ' as collected" tabindex="0">';
        html += '<span class="reward-checkbox"></span>';
        html += '</button>';
        html += '</div>';
      });

      html += '</div></div>';
    });

    html += '</section>';
    return html;
  }

  /* --- Conflict Banner --- */
  function renderConflictBanner() {
    if (activeConflicts.length === 0) return "";

    // Check if all conflicting guests are in locked slots
    const conflictingGuestIds = new Set();
    activeConflicts.forEach((c) => {
      conflictingGuestIds.add(c.guestA);
      conflictingGuestIds.add(c.guestB);
    });
    const conflictingSlotIndices = new Set();
    conflictingGuestIds.forEach((id) => {
      const idx = selectedGuests.indexOf(id);
      if (idx !== -1) conflictingSlotIndices.add(idx);
    });
    const allConflictingLocked = [...conflictingSlotIndices].every((idx) => lockedSlots.has(idx));

    const conflictWord = activeConflicts.length === 1 ? "Conflict" : "Conflicts";

    let html = `
      <div class="conflict-banner">
        <div class="conflict-banner-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--negative)">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          ${activeConflicts.length} ${conflictWord} Detected
        </div>
        <ul class="conflict-banner-list">`;

    activeConflicts.forEach((c) => {
      const gA = getGuest(c.guestA);
      const gB = getGuest(c.guestB);
      html += `
          <li class="conflict-banner-item">
            <span class="conflict-dim-name">${capitalize(c.dimension)}:</span>
            ${gA ? gA.name : c.guestA} (${c.labelA}) vs ${gB ? gB.name : c.guestB} (${c.labelB})
          </li>`;
    });

    html += `
        </ul>
        <button class="btn-suggest" id="btn-suggest"
                ${allConflictingLocked ? 'disabled title="All conflicting slots are locked."' : ""}>
          Suggest Replacements
        </button>
      </div>`;

    return html;
  }

  /* --- Suggestion Panel --- */
  function renderSuggestionPanel() {
    if (!showingSuggestions) return "";

    let html = `
      <div class="suggestion-panel">
        <div class="suggestion-panel-header">
          <h3 class="suggestion-panel-title">Replacement Suggestions</h3>
          <button class="suggestion-dismiss" id="suggestion-dismiss" aria-label="Dismiss suggestions">&times;</button>
        </div>`;

    if (replacementSuggestions.length === 0) {
      html += `
        <p style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; padding: var(--space-md);">
          No single-swap replacements can reduce conflicts. Consider unlocking a slot or selecting different guests.
        </p>`;
    } else {
      replacementSuggestions.forEach((s, idx) => {
        const guestOut = getGuest(s.guestOut);
        const guestIn = getGuest(s.guestIn);
        const slotName = DATA.slots[s.slotIndex].name;

        // Build "Resolves" text
        const resolvesText = s.resolvedDetails
          .map((rd) => {
            const otherGuestId = rd.guestA === s.guestOut ? rd.guestB : rd.guestA;
            const otherGuest = getGuest(otherGuestId);
            return `${capitalize(rd.dimension)} conflict with ${otherGuest ? otherGuest.name : otherGuestId}`;
          })
          .join("; ");

        // Happiness delta display (round to 1 decimal, strip trailing .0)
        let deltaClass = "delta-neutral";
        let deltaText = "0";
        var roundedDelta = Math.round(s.happinessDelta * 10) / 10;
        if (roundedDelta > 0) {
          deltaClass = "delta-positive";
          deltaText = "+" + (roundedDelta % 1 === 0 ? roundedDelta.toFixed(0) : roundedDelta.toFixed(1));
        } else if (roundedDelta < 0) {
          deltaClass = "delta-negative";
          deltaText = (roundedDelta % 1 === 0 ? roundedDelta.toFixed(0) : roundedDelta.toFixed(1));
        }

        const conflictWord2 = s.conflictsResolved === 1 ? "conflict" : "conflicts";

        html += `
          <div class="suggestion-item">
            <div class="suggestion-swap">
              ${idx + 1}. Swap
              <span class="guest-out">${guestOut ? guestOut.name : s.guestOut}</span>
              <span class="arrow">\u2192</span>
              <span class="guest-in">${guestIn ? guestIn.name : s.guestIn}</span>
              (${slotName})
            </div>
            <div class="suggestion-resolves">Resolves: ${resolvesText}</div>
            <div class="suggestion-effect">
              Net effect: -${s.conflictsResolved} ${conflictWord2}, happiness delta:
              <span class="${deltaClass}">${deltaText}</span>
            </div>
            <button class="btn-apply-swap"
                    data-slot="${s.slotIndex}"
                    data-guest-in="${s.guestIn}"
                    aria-label="Apply swap: replace ${guestOut ? guestOut.name : s.guestOut} with ${guestIn ? guestIn.name : s.guestIn}">
              Apply Swap
            </button>
          </div>`;
      });
    }

    html += `</div>`;
    return html;
  }

  /* --- Amenity Section --- */
  function renderAmenitySection() {
    const hasGuests = selectedGuests.some((g) => g !== null);
    const totalAmenityCount = DATA.amenities.length;
    const availableCount = totalAmenityCount - unavailableAmenities.size;
    const hasUnavailable = unavailableAmenities.size > 0;

    let html = `
      <section class="ec-section" id="amenity-section">
        <div class="ec-section-header">
          <h2 class="ec-section-title">Amenity Selection</h2>
          ${hasUnavailable ? '<span class="ec-section-badge">' + availableCount + ' / ' + totalAmenityCount + ' Available</span>' : ""}
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
        const isUnavailable = unavailableAmenities.has(amenity.id);
        const effectTags = amenityEffectTags(amenity);
        const impact = hasGuests ? amenityImpactForGuests(amenity) : 0;
        let impactClass = "impact-neutral";
        let impactText = "";
        if (hasGuests && impact !== 0) {
          impactClass = impact > 0 ? "impact-positive" : "impact-negative";
          impactText = impact > 0 ? "+" + impact : "" + impact;
        }

        // Availability toggle (shown on every chip)
        const toggleHtml = '<div class="amenity-toggle' + (isUnavailable ? "" : " available") + '"'
          + ' data-amenity="' + amenity.id + '"'
          + ' role="switch" aria-checked="' + !isUnavailable + '"'
          + ' aria-label="' + amenity.name + ' availability"'
          + ' tabindex="0"'
          + ' title="' + (isUnavailable ? "Not yet unlocked -- click to mark as available" : "Available -- click to mark as not yet unlocked") + '">'
          + '<span class="amenity-toggle-thumb"></span>'
          + "</div>";

        // Unlock info (only shown when unavailable)
        let unlockInfoHtml = "";
        if (isUnavailable && amenity.unlock) {
          unlockInfoHtml = '<div class="amenity-unlock-info">'
            + '<span class="unlock-req-text">' + amenity.unlock.requirement + "</span>"
            + '<a href="' + amenity.unlock.wowheadUrl + '" target="_blank" rel="noopener noreferrer" class="unlock-wowhead-link">Wowhead &#x2197;</a>'
            + "</div>";
        }

        const chipClasses = "amenity-chip" + (isSelected ? " selected" : "") + (isUnavailable ? " unavailable" : "");

        html += `
            <div class="${chipClasses}"
                 data-category="${cat.key}" data-amenity="${amenity.id}"
                 role="radio" aria-checked="${isSelected}" tabindex="0">
              ${toggleHtml}
              <div class="amenity-name">${amenity.name}</div>
              <div class="amenity-effects">
                ${effectTags
                  .map(
                    (t) =>
                      '<span class="effect-tag dim-' + t.dim + '">' + t.label + "</span>"
                  )
                  .join("")}
              </div>
              ${!isUnavailable && hasGuests ? '<div class="amenity-impact ' + impactClass + '">' + (impactText || "\u2014") + "</div>" : ""}
              ${unlockInfoHtml}
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
      let valClass = "dim-neutral";

      if (val > 0) {
        displayLabel = labels.positive;
        valClass = "dim-" + dim;
      } else if (val < 0) {
        displayLabel = labels.negative;
        valClass = "dim-" + dim;
      } else {
        displayLabel = "Neutral";
      }

      const absVal = Math.abs(val);
      const prefix = val !== 0 ? "+" : "";

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
      const resultPortraitImg = `<img src="img/guests/${guest.id}.png" alt="${guest.name}" width="128" height="128" loading="lazy">`;
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
            <div class="result-guest-portrait ${factionClass(guest.faction)}">${resultPortraitImg}</div>
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
              <span class="result-dim-label">Wants <strong class="dim-${dim}">${prefLbl}</strong> &mdash; Court: <span class="dim-${dim}">${netLabel}</span></span>
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
    // Slot lock toggles (must be bound BEFORE guest cards so stopPropagation works)
    root.querySelectorAll(".slot-lock").forEach((lockEl) => {
      const handler = (e) => {
        e.stopPropagation();
        const slotIndex = parseInt(lockEl.dataset.slot, 10);
        if (lockedSlots.has(slotIndex)) {
          lockedSlots.delete(slotIndex);
        } else {
          lockedSlots.add(slotIndex);
        }
        // Dismiss suggestions on lock change
        showingSuggestions = false;
        replacementSuggestions = [];
        saveState();
        render();
      };
      lockEl.addEventListener("click", handler);
      lockEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handler(e);
        }
      });
    });

    // Reward icon row click (open/close panel) -- must bind before guest cards so stopPropagation works
    root.querySelectorAll(".guest-reward-icons").forEach((btn) => {
      const rewardHandler = (e) => {
        e.stopPropagation();
        const guestId = btn.dataset.guest;
        if (guestId) handleRewardPanelToggle(guestId);
      };
      btn.addEventListener("click", rewardHandler);
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          rewardHandler(e);
        }
      });
    });

    // Reward panel close button
    root.querySelectorAll(".reward-panel-close").forEach((btn) => {
      btn.addEventListener("click", () => {
        expandedRewardGuest = null;
        render();
      });
    });

    // Reward collection toggles
    root.querySelectorAll(".reward-collect-btn").forEach((btn) => {
      const collectHandler = (e) => {
        e.stopPropagation();
        handleRewardToggle(btn.dataset.reward);
      };
      btn.addEventListener("click", collectHandler);
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          collectHandler(e);
        }
      });
    });

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

    // Amenity availability toggles (must be bound BEFORE amenity chips so stopPropagation works)
    root.querySelectorAll(".amenity-toggle").forEach((toggleEl) => {
      var toggleHandler = function (e) {
        e.stopPropagation(); // Don't toggle amenity selection
        var amenityId = toggleEl.dataset.amenity;
        handleAmenityAvailabilityToggle(amenityId);
      };
      toggleEl.addEventListener("click", toggleHandler);
      toggleEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleHandler(e);
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

    // Suggest Replacements button
    const suggestBtn = document.getElementById("btn-suggest");
    if (suggestBtn) {
      suggestBtn.addEventListener("click", () => {
        replacementSuggestions = computeSuggestions();
        showingSuggestions = true;
        render();
      });
    }

    // Dismiss suggestions
    const dismissBtn = document.getElementById("suggestion-dismiss");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", () => {
        showingSuggestions = false;
        replacementSuggestions = [];
        render();
      });
    }

    // Apply swap buttons
    root.querySelectorAll(".btn-apply-swap").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slotIndex = parseInt(btn.dataset.slot, 10);
        const newGuestId = btn.dataset.guestIn;
        selectedGuests[slotIndex] = newGuestId;
        showingSuggestions = false;
        replacementSuggestions = [];
        saveState();
        render();
      });
    });

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
