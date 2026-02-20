# Guest Conflict Detection & Replacement Suggestion -- Feature Design

## Problem Statement

When players select guests across the four RSVP slots, some guests will have
directly opposing preferences on the same atmosphere dimension. For example,
Sika (Slot 1) wants **Clean** while Marileth (Slot 1) wants **Messy** on
cleanliness; Baroness Vashj (Slot 4) wants **Dangerous** while Mikanikos
(Slot 4) wants **Safe** on danger. These conflicts make it impossible to
satisfy both guests simultaneously on that dimension, costing at least one
happiness point per conflict no matter what amenities are chosen.

Players who are grinding reputation with a specific guest often must keep that
guest in their lineup ("locked") and want to know which *other* guests to swap
out to reduce conflicts. Currently the app provides no guidance on this.

This feature adds three capabilities:
1. **Detect and visualize conflicts** between selected guests in real time.
2. **Lock specific guests** the user does not want replaced.
3. **Suggest minimal-swap replacements** among unlocked guests to reduce or
   eliminate conflicts, respecting the slot constraint.

---

## Data Model for Conflicts

A **conflict** exists when two selected guests have opposite non-zero
preferences on the same dimension:

```
guest_A.preferences[dim] !== 0
  && guest_B.preferences[dim] !== 0
  && sign(guest_A.preferences[dim]) !== sign(guest_B.preferences[dim])
```

Each conflict is an object:

```js
{
  dimension: "cleanliness",       // the conflicting dimension
  guestA:   "sika",              // guest ID
  guestB:   "marileth",          // guest ID
  labelA:   "Clean",             // what guestA wants
  labelB:   "Messy"              // what guestB wants
}
```

Conflicts are computed pairwise across all selected guests (max 4 guests =
max 6 pairs, 5 dimensions each = max 30 checks, trivially fast).

### Concrete Conflict Examples from the Data

| Guest A (Slot)          | Guest B (Slot)         | Dimension    | A wants     | B wants     |
|-------------------------|------------------------|-------------|-------------|-------------|
| Sika (1)                | Moonberry (4)          | cleanliness | Clean       | Messy       |
| Sika (1)                | Rendle (3)             | cleanliness | Clean       | Messy       |
| Choofa (1)              | Countess (4)           | excitement  | Exciting    | Relaxing    |
| Choofa (1)              | Aliothe (2)            | excitement  | Exciting    | Relaxing    |
| Korayn (3)              | Mograine (3)           | danger      | Dangerous   | Safe        |
| Vashj (4)               | Mikanikos (4)          | danger      | Dangerous   | Safe        |
| Vashj (4)               | Mikanikos (4)          | decadence   | Decadent    | Humble      |
| Adrestes (3)            | Moonberry (4)          | formality   | Formal      | Casual      |
| Adrestes (3)            | Korayn (3)             | formality   | Formal      | Casual      |
| Kassir (1)              | Stonehead (2)          | formality   | Formal      | Casual      |

Note that guests in the *same* slot can never both be selected (radio
behavior), so conflicts like Korayn vs. Mograine and Vashj vs. Mikanikos
are impossible in practice. Only cross-slot conflicts matter.

---

## New State

Three additions to the existing `App` state:

```js
// Set of guest IDs the user has locked (persisted to localStorage)
let lockedGuests = new Set();

// Computed on every render -- not persisted
let activeConflicts = [];   // array of conflict objects (see above)

// Computed on demand when user clicks "Suggest Replacements"
let replacementSuggestions = [];
```

The `lockedGuests` set is saved/loaded alongside `selectedGuests` and
`selectedAmenities` in the existing `saveState()` / `loadState()` functions.

---

## UI Components

### 1. Lock Toggle

**Location:** Top-left corner of each guest card, mirroring the existing
check badge (top-right). Only visible on *selected* guest cards.

**Anatomy:**

```
+----------------------------------+
| [lock]                    [check]|
|         [portrait]               |
|          Guest Name              |
|          Faction                 |
|     [pref] [pref] [pref]        |
+----------------------------------+
```

**Visual States:**

| State    | Appearance                                                    |
|----------|---------------------------------------------------------------|
| Hidden   | Not rendered (guest is not selected)                         |
| Unlocked | Muted outline lock icon, 20x20px circle, `--text-muted`      |
|          | color. Tooltip: "Click to lock -- locked guests won't be     |
|          | suggested for replacement"                                   |
| Locked   | Filled lock icon, gold background (`--accent-gold`),         |
|          | `--bg-primary` icon color. Subtle gold glow matching the     |
|          | existing selected-card glow. Tooltip: "Locked -- click to    |
|          | unlock"                                                      |

**CSS class:** `.guest-lock` (positioned absolute, top: 6px, left: 8px)

```css
.guest-lock {
  position: absolute;
  top: 6px;
  left: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;
  transform: scale(0.5);
  z-index: 2;
  background: transparent;
  border: 1px solid var(--text-muted);
  color: var(--text-muted);
}

/* Only show on selected cards */
.guest-card.selected .guest-lock {
  opacity: 1;
  transform: scale(1);
}

/* Locked state */
.guest-lock.locked {
  background: var(--accent-gold);
  border-color: var(--accent-gold);
  color: var(--bg-primary);
  box-shadow: 0 0 8px rgba(212, 168, 67, 0.3);
}
```

**Icon:** Use the Unicode characters for simplicity (no icon library needed):
- Unlocked: `\uD83D\uDD13` (open lock) -- or simpler, just the text glyph
  from a small inline SVG of an open padlock to avoid emoji rendering
  differences.
- Locked: `\uD83D\uDD12` (closed lock) -- same caveat.

**Recommendation:** Use a tiny inline SVG (12x12) for the lock icon to avoid
cross-platform emoji inconsistencies. The app already uses Unicode for
faction icons and check marks, but a lock is more visually critical here.

```html
<!-- Unlocked -->
<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
  <path d="M18 10h-1V7A5 5 0 0 0 7 7v1H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM9 7a3 3 0 0 1 6 0v1H9V7z"/>
</svg>

<!-- Locked (same icon, different styling conveys state) -->
```

**Interaction:**
- Click toggles lock state.
- Click event must `stopPropagation()` so it does not also toggle guest
  selection.
- Locking a guest that is not selected does nothing (the button is hidden).
- If the user deselects a locked guest, the lock is automatically removed.

**Keyboard:** Focusable with `tabindex="0"`, toggles on Enter/Space.

---

### 2. Conflict Indicators

Conflicts are shown in two complementary ways: on the guest cards themselves,
and in a summary banner between the guest section and the amenity section.

#### 2a. Conflicting Preference Tags (on guest cards)

When a selected guest has a preference that conflicts with another selected
guest, that specific preference tag gets a red highlight.

**Current pref-tag (no conflict):**
```html
<span class="pref-tag">Clean</span>
```

**Conflicting pref-tag:**
```html
<span class="pref-tag conflict">Clean</span>
```

```css
.pref-tag.conflict {
  background: rgba(229, 57, 53, 0.2);
  color: var(--negative);
  border: 1px solid rgba(229, 57, 53, 0.4);
}

/* On selected cards, override the gold styling */
.guest-card.selected .pref-tag.conflict {
  background: rgba(229, 57, 53, 0.2);
  color: var(--negative);
}
```

This is the most important visual indicator. It is subtle enough not to
overwhelm the interface but clearly marks exactly which preferences are
causing problems. The user can immediately see "Clean" in red on Sika and
"Messy" in red on Moonberry and understand the tension.

#### 2b. Conflict Count Badge (on guest cards)

A small badge in the bottom-right of selected guest cards that have at least
one conflict. Shows the number of conflicts that guest is involved in.

```html
<div class="guest-conflict-badge">2</div>
```

```css
.guest-conflict-badge {
  position: absolute;
  bottom: 6px;
  right: 8px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: var(--negative);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 0 6px rgba(229, 57, 53, 0.4);
}
```

Only rendered when the guest has >= 1 conflict. If no conflicts, omitted
entirely (no empty badge).

#### 2c. Conflict Summary Banner

Placed between the Guest Selection section and the Amenity Selection section
(replacing or augmenting the existing `<hr class="ec-divider">`). Only
rendered when at least one conflict exists.

**Layout:**

```
+--------------------------------------------------------------+
|  WARNING ICON   2 Conflicts Detected                         |
|                                                               |
|  Cleanliness: Sika (Clean) vs Moonberry (Messy)             |
|  Formality:   Kassir (Formal) vs Stonehead (Casual)          |
|                                                               |
|  [Suggest Replacements]                                       |
+--------------------------------------------------------------+
```

**Styling:**

```css
.conflict-banner {
  background: linear-gradient(135deg, rgba(229, 57, 53, 0.08) 0%, rgba(139, 26, 58, 0.08) 100%);
  border: 1px solid rgba(229, 57, 53, 0.3);
  border-radius: var(--border-radius-lg);
  padding: var(--space-md) var(--space-lg);
  margin: var(--space-md) 0;
}

.conflict-banner-title {
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  color: var(--negative);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.conflict-banner-list {
  list-style: none;
  margin-bottom: var(--space-md);
}

.conflict-banner-item {
  font-size: 0.8rem;
  color: var(--text-secondary);
  padding: 3px 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.conflict-banner-item::before {
  content: "\2717";     /* X mark */
  color: var(--negative);
  font-size: 0.7rem;
  flex-shrink: 0;
}

.conflict-dim-name {
  color: var(--text-primary);
  font-weight: 600;
  min-width: 80px;
}
```

**Why a banner and not connecting lines?** Connecting lines between guest
cards across different slot rows would require either SVG overlays or canvas
drawing, adding significant complexity for minimal clarity. The banner is
simpler to implement, easier to read, and works correctly when the page
layout reflows on different screen sizes. The highlighted pref-tags on the
cards themselves provide the visual "connection" between conflicting guests
without any line-drawing.

#### 2d. What About Zero Conflicts?

When all selected guests have no conflicts, no banner is shown. The divider
between Guest Selection and Amenity Selection remains the standard gold
`<hr class="ec-divider">`. This is intentional: no conflicts is the
*default* good state and does not need celebration or acknowledgment.

---

### 3. Replacement Suggestion Panel

#### Trigger

The conflict banner includes a "Suggest Replacements" button. This is a
manual trigger, not auto-computed, because:
- It keeps the interface calm (no unsolicited suggestions on every click).
- The computation, while cheap, produces results that need user attention.
- Users who just want conflict awareness without replacement noise can
  ignore the button.

The button is styled consistently with the existing "Optimize Amenities"
button but smaller and using the red/negative accent instead of gold:

```css
.btn-suggest {
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 10px 24px;
  background: linear-gradient(135deg, var(--accent-red-dark) 0%, var(--accent-red) 100%);
  color: var(--text-heading);
  border: 1px solid var(--accent-red-light);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-suggest:hover {
  background: linear-gradient(135deg, var(--accent-red) 0%, var(--accent-red-light) 100%);
  box-shadow: 0 0 12px rgba(198, 45, 91, 0.3);
}
```

If all guests with conflicts are locked, the button is disabled with a
tooltip: "All conflicting guests are locked."

#### Panel Location

The suggestion panel appears **directly below the conflict banner**, pushing
the amenity section down. It does not appear as a modal or overlay, keeping
the flow simple and scannable.

#### Panel Content

```
+--------------------------------------------------------------+
|  Replacement Suggestions                          [Dismiss X] |
|                                                               |
|  1. Swap Moonberry -> The Countess (Slot 4)                  |
|     Resolves: Cleanliness conflict with Sika                  |
|     Net effect: -2 conflicts, happiness delta: +1             |
|     [Apply Swap]                                              |
|                                                               |
|  2. Swap Stonehead -> Kleia & Pelagos (Slot 2)               |
|     Resolves: Formality conflict with Kassir                  |
|     Net effect: -1 conflict, happiness delta: 0               |
|     [Apply Swap]                                              |
|                                                               |
|  -- or --                                                     |
|                                                               |
|  No conflicts can be resolved without swapping locked guests. |
+--------------------------------------------------------------+
```

**Key design decisions:**

1. **Multiple suggestions, ranked.** Show up to 3 suggestions, ordered by
   number of conflicts resolved (descending), then by happiness delta
   (descending). More than 3 creates choice paralysis.

2. **One swap per suggestion.** Each suggestion is a single swap (one guest
   out, one guest in). Multi-swap suggestions are harder to evaluate and
   the combinatorial space is small enough that single-swap suggestions
   cover most cases. If the user applies one suggestion and conflicts
   remain, they can click "Suggest Replacements" again.

3. **Show what it fixes.** Each suggestion explicitly names the conflicts
   it resolves so the user understands *why* this swap helps.

4. **Show happiness delta.** The suggestion computes the optimal amenities
   for the new guest lineup and compares the best possible happiness score.
   This prevents swaps that reduce conflicts but tank overall happiness.
   Format: "+1" in green, "0" in neutral, "-2" in red.

5. **Apply button.** Clicking "Apply Swap" immediately:
   - Replaces the guest in `selectedGuests[slotIndex]`.
   - Removes the swapped-out guest from `lockedGuests` if present (edge
     case, should not happen since we do not suggest replacing locked
     guests).
   - Calls `saveState()` and `render()`.
   - The conflict banner updates to reflect the new state.
   - The suggestion panel is dismissed.

6. **Dismiss button.** An X in the top-right of the panel dismisses
   suggestions without applying any. The conflict banner and its button
   remain visible.

#### Suggestion Panel Styling

```css
.suggestion-panel {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, #160e20 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  margin: var(--space-md) 0;
}

.suggestion-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}

.suggestion-panel-title {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  color: var(--text-heading);
}

.suggestion-dismiss {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}
.suggestion-dismiss:hover {
  color: var(--text-primary);
}

.suggestion-item {
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.suggestion-swap {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.suggestion-swap .guest-out {
  color: var(--negative);
  text-decoration: line-through;
  text-decoration-color: rgba(229, 57, 53, 0.5);
}

.suggestion-swap .guest-in {
  color: var(--positive);
  font-weight: 600;
}

.suggestion-swap .arrow {
  color: var(--text-muted);
  margin: 0 var(--space-xs);
}

.suggestion-resolves {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.suggestion-effect {
  font-size: 0.78rem;
  margin-bottom: var(--space-sm);
}

.suggestion-effect .delta-positive { color: var(--positive); }
.suggestion-effect .delta-negative { color: var(--negative); }
.suggestion-effect .delta-neutral  { color: var(--neutral); }

.btn-apply-swap {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 16px;
  background: rgba(76, 175, 80, 0.15);
  border: 1px solid rgba(76, 175, 80, 0.4);
  border-radius: var(--border-radius);
  color: var(--positive);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-apply-swap:hover {
  background: rgba(76, 175, 80, 0.25);
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.2);
}
```

---

## Algorithm: Replacement Suggestion Engine

### Input
- `selectedGuests[4]` -- current guest IDs (some may be null)
- `lockedGuests` -- Set of guest IDs that must not be swapped
- `DATA.slots` -- which guests are available in each slot

### Steps

```
1. Compute current conflicts (call them C_current).
2. If C_current is empty, return [] (no suggestions needed).
3. For each selected guest G that is NOT locked:
   a. Let slotIndex = the slot G is in.
   b. For each alternative guest A in DATA.slots[slotIndex] where A != G:
      i.   Construct a candidate lineup: replace G with A.
      ii.  Compute conflicts for the candidate lineup (C_candidate).
      iii. Let conflictsResolved = C_current.length - C_candidate.length.
      iv.  If conflictsResolved <= 0, skip (no improvement).
      v.   Compute bestHappiness for current lineup (run optimizer).
      vi.  Compute bestHappiness for candidate lineup (run optimizer).
      vii. Let happinessDelta = candidate best - current best.
      viii.Record suggestion: { guestOut: G, guestIn: A, slotIndex,
            conflictsResolved, resolvedDetails: [...], happinessDelta }.
4. Sort suggestions by conflictsResolved DESC, then happinessDelta DESC.
5. Deduplicate: if multiple suggestions swap the same guest out, keep only
   the best one (to avoid "swap X for Y" and "swap X for Z" cluttering).
6. Return top 3 suggestions.
```

### Performance

The optimizer is a brute-force search over 3^4 = 81 amenity combinations.
For each candidate swap, we run the optimizer once. With 4 slots x 3
alternatives each = 12 candidate lineups max, and 81 combinations each,
the total work is 12 x 81 = 972 scoring operations. Each scoring operation
checks 4 guests x 5 dimensions = 20 comparisons. Total: ~19,440 simple
integer comparisons. This completes in well under 1ms.

No web worker or async handling is needed.

---

## Interaction Flow

### Complete User Journey

```
1. User selects guests across RSVP slots.
   -> Conflicts are detected on each render.
   -> Conflicting pref-tags turn red on affected guest cards.
   -> Conflict count badges appear on affected guest cards.
   -> If conflicts exist, the conflict banner appears between
      Guest Selection and Amenity Selection.

2. User sees the conflict banner and reads the conflict list.
   -> "2 Conflicts Detected"
   -> "Cleanliness: Sika (Clean) vs Moonberry (Messy)"

3. (Optional) User locks guests they want to keep.
   -> Clicks the lock icon on a selected guest card.
   -> Lock icon fills gold; guest is now protected from suggestions.
   -> Lock state persists across page reloads.

4. User clicks "Suggest Replacements" in the conflict banner.
   -> Suggestion panel appears below the banner.
   -> Shows 1-3 ranked suggestions.

5. User reads a suggestion:
   -> "Swap Moonberry -> The Countess (Slot 4)"
   -> "Resolves: Cleanliness conflict with Sika"
   -> "Net effect: -1 conflict, happiness delta: +1"

6. User clicks [Apply Swap].
   -> Moonberry is deselected in Slot 4, The Countess is selected.
   -> Suggestion panel is dismissed.
   -> Page re-renders. Conflict banner updates (may disappear if
      all conflicts resolved).

7. If conflicts remain, user can click "Suggest Replacements" again.
```

### Edge Cases

| Scenario                                    | Behavior                                           |
|---------------------------------------------|----------------------------------------------------|
| No guests selected                          | No conflict detection runs. No banner.             |
| Only 1 guest selected                       | No pairwise conflicts possible. No banner.         |
| All conflicting guests are locked           | Banner shows conflicts but button is disabled.     |
|                                             | Tooltip: "All conflicting guests are locked."      |
| No swaps reduce conflicts                   | Suggestion panel shows: "No single-swap            |
|                                             | replacements can reduce conflicts. Consider        |
|                                             | unlocking a guest or selecting different guests."  |
| Guest deselected while locked               | Lock is automatically removed.                     |
| Suggestion applied creates new conflicts    | Rare but possible. User sees updated conflict      |
|                                             | banner and can suggest again.                      |
| Multiple conflicts on same dimension        | Banner groups them per dimension line but lists     |
|                                             | all guest pairs.                                   |

---

## Render Integration

### Where Conflict Detection Runs

Inside the existing `render()` function, immediately after building the guest
section. The conflict detection is a pure function of `selectedGuests` and
requires no DOM access.

```js
function render() {
  if (!root || !DATA) return;

  // Compute conflicts for this render cycle
  activeConflicts = detectConflicts(selectedGuests);

  root.innerHTML = [
    renderGuestSection(),         // uses activeConflicts for badges/tags
    renderConflictBanner(),       // new -- returns "" if no conflicts
    renderSuggestionPanel(),      // new -- returns "" if not showing
    '<hr class="ec-divider">',
    renderAmenitySection(),
    renderOptimizeButton(),
    '<hr class="ec-divider">',
    renderResultsSection(),
  ].join("");

  bindEvents();
}
```

### Modified Guest Card Rendering

The `renderGuestSection()` function is modified to:

1. Add the lock toggle to selected cards.
2. Add the `conflict` class to preference tags that are in conflict.
3. Add the conflict count badge to cards with conflicts.

```js
// Inside the guest card template (conceptual diff):

// Lock toggle (only on selected cards)
const lockHtml = isSelected
  ? `<div class="guest-lock ${isLocked ? 'locked' : ''}"
         data-slot="${slotIndex}" data-guest="${guestId}"
         role="checkbox" aria-checked="${isLocked}"
         aria-label="${isLocked ? 'Unlock' : 'Lock'} ${guest.name}"
         tabindex="0">
       ${isLocked ? LOCK_CLOSED_SVG : LOCK_OPEN_SVG}
     </div>`
  : '';

// Conflict-aware pref tags
const conflictsForGuest = activeConflicts.filter(
  c => c.guestA === guestId || c.guestB === guestId
);
const conflictingDims = new Set(conflictsForGuest.map(c => c.dimension));

const prefTagsHtml = DATA.dimensions.map(dim => {
  const v = guest.preferences[dim];
  if (v === 0) return '';
  const label = prefLabel(dim, v);
  const hasConflict = isSelected && conflictingDims.has(dim);
  return `<span class="pref-tag ${hasConflict ? 'conflict' : ''}">${label}</span>`;
}).join('');

// Conflict count badge
const conflictBadge = isSelected && conflictsForGuest.length > 0
  ? `<div class="guest-conflict-badge">${conflictsForGuest.length}</div>`
  : '';
```

### New Event Bindings

Added to `bindEvents()`:

```js
// Lock toggles
root.querySelectorAll(".guest-lock").forEach((lockEl) => {
  const handler = (e) => {
    e.stopPropagation(); // Don't toggle guest selection
    const guestId = lockEl.dataset.guest;
    if (lockedGuests.has(guestId)) {
      lockedGuests.delete(guestId);
    } else {
      lockedGuests.add(guestId);
    }
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
    // Remove lock from swapped-out guest (if any)
    // The old guest ID is no longer selected
    showingSuggestions = false;
    replacementSuggestions = [];
    saveState();
    render();
  });
});
```

---

## Responsive Considerations

### Desktop (>= 1024px)
- Full layout as described above.
- Conflict banner spans full content width.
- Suggestion panel spans full content width with suggestion items as cards.

### Tablet (600-1023px)
- Same layout, slightly tighter padding.
- Suggestion items stack vertically (they already do).

### Mobile (< 600px)
- Conflict banner: compact single-column layout.
- Conflict list items wrap naturally.
- Suggestion panel: full-width, suggestion items are full-width cards.
- Lock icon: same position, same size (20x20 meets the 44x44 touch target
  when you account for the padding of the guest card itself, but consider
  bumping to 28x28 on mobile).
- Conflict count badge: same position and size.

```css
@media (max-width: 640px) {
  .conflict-banner {
    padding: var(--space-sm) var(--space-md);
  }

  .suggestion-panel {
    padding: var(--space-md);
  }

  .guest-lock {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }
}
```

---

## Accessibility

- **Lock toggle:** Uses `role="checkbox"` with `aria-checked` and
  `aria-label`. Keyboard accessible via Enter/Space.
- **Conflict tags:** The `conflict` class adds a visible border, not just
  a color change. Screen readers get conflict info through the conflict
  banner text, which is structured as a list.
- **Conflict badge:** Has `aria-label="N conflicts"` for screen readers.
- **Suggestion panel:** Uses semantic heading (`<h3>`) and list markup.
  Apply buttons have descriptive `aria-label` values:
  `aria-label="Apply swap: replace Moonberry with The Countess"`.
- **Reduced motion:** All new transitions respect the existing
  `prefers-reduced-motion` rule.

---

## What This Design Intentionally Does NOT Include

1. **Auto-suggest on every render.** Would be noisy. Users trigger
   suggestions manually.

2. **Multi-swap suggestions.** A single swap per suggestion keeps things
   understandable. The user can apply one and suggest again.

3. **Connecting lines between conflicting cards.** Too complex for the
   rendering approach (innerHTML replacement), fragile across layouts,
   and the highlighted pref-tags + banner achieve the same goal more
   clearly.

4. **"Best guest lineup" solver.** This feature does not try to pick the
   optimal set of guests. That is a different (and much larger) feature.
   This only suggests minimal replacements to reduce conflicts in the
   current lineup.

5. **Conflict severity weighting.** All conflicts are treated equally.
   The actual happiness cost depends on amenity choices, but for the
   purpose of conflict detection, a conflict is a conflict. The happiness
   delta in suggestions captures the real impact.

6. **Persistent suggestion history.** Suggestions are ephemeral. They
   are recomputed on demand and dismissed on any state change.

---

## Implementation Checklist

- [ ] Add `lockedGuests` to state (Set), persistence, and reset logic
- [ ] Add `detectConflicts(guestIds)` pure function
- [ ] Add `computeSuggestions()` function (uses existing optimizer)
- [ ] Modify `renderGuestSection()` for lock toggle, conflict tags, badges
- [ ] Add `renderConflictBanner()` function
- [ ] Add `renderSuggestionPanel()` function
- [ ] Add event bindings for lock, suggest, dismiss, apply
- [ ] Add CSS for all new components
- [ ] Test conflict detection with known conflicting guest combos
- [ ] Test lock toggle interaction (does not interfere with card selection)
- [ ] Test suggestion algorithm produces correct results
- [ ] Test responsive layout at all breakpoints
- [ ] Test keyboard navigation through all new interactive elements
