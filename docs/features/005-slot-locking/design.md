# Slot-Based Locking -- Design

> Feature 005. Created 2026-02-20.

## Problem Statement

Guest locks are currently stored by guest ID (`lockedGuests: Set<string>`). This creates confusing behavior when a user locks a guest in a slot, then switches to a different guest in that same slot. The original guest's lock persists silently in the background; returning to that guest shows it still locked even though the user's intent was to lock the *slot position*, not a specific guest.

The mental model users have is "don't change this slot", not "don't change this specific guest." Slot-based locking aligns the implementation with that mental model.

## Design

### Data Model Changes

**Replace:**
```js
let lockedGuests = new Set();   // Set<string> of guest IDs
```

**With:**
```js
let lockedSlots = new Set();    // Set<number> of slot indices (0-3)
```

The `lockedAmenities` set is unaffected by this change.

**localStorage schema change:**
```js
// Before
{ selectedGuests, selectedAmenities, lockedGuests: [...], lockedAmenities: [...], collectedRewards: [...] }

// After
{ selectedGuests, selectedAmenities, lockedSlots: [...], lockedAmenities: [...], collectedRewards: [...] }
```

### UI Changes

#### Lock Icon Placement

**Current:** Lock icon is rendered inside each guest card (`<div class="guest-lock">`) and only visible on the selected card.

**New:** Lock icon moves to the slot header row, next to the "RSVP Slot N" label. It is only visible when a guest is selected in that slot.

The slot label area changes from:
```html
<div class="slot-label">RSVP Slot 1</div>
```
To:
```html
<div class="slot-label">
  RSVP Slot 1
  <div class="slot-lock {locked?}" data-slot="0"
       role="checkbox" aria-checked="{locked?}"
       aria-label="{Lock/Unlock} Slot 1"
       tabindex="0"
       title="{tooltip}">
    {LOCK_OPEN_SVG or LOCK_CLOSED_SVG}
  </div>
</div>
```

The lock icon is hidden when no guest is selected in the slot (nothing to lock).

#### Tooltip Text

- Unlocked state: `"Click to lock -- locked slots won't be suggested for replacement"`
- Locked state: `"Locked -- click to unlock"`

#### Visual Feedback on Locked Slots

When a slot is locked, the selected guest card in that slot receives a subtle visual indicator (e.g., a gold left-border or a small lock badge overlay) so the user can see at a glance which slots are locked without hovering the slot header. This can be achieved by adding a `locked` class to the `.slot-row` element when the slot is locked, and using CSS to style `.slot-row.locked .guest-card.selected`.

### Behavior

1. **Lock persists when switching guests within a slot.** If slot 1 is locked and the user selects a different guest in slot 1, the slot remains locked.

2. **Deselecting a guest in a locked slot keeps the slot locked.** The user must explicitly click the lock icon to unlock. However, since the lock icon is hidden when no guest is selected, deselecting a guest in a locked slot should auto-unlock the slot. This prevents an invisible locked state. (Alternative: keep the lock icon visible on empty locked slots with reduced opacity -- but this adds complexity for a rare edge case. Auto-unlock on deselect is simpler.)

3. **Locking an empty slot is not allowed.** The lock icon is only rendered when `selectedGuests[slotIndex] !== null`.

4. **Reset clears all slot locks.** `resetAll()` sets `lockedSlots = new Set()`.

### Suggestions

The `computeSuggestions()` function currently skips locked guests:
```js
if (lockedGuests.has(guestId)) return;
```

This changes to skip locked slots:
```js
if (lockedSlots.has(slotIndex)) return;
```

The "all conflicting locked" check in `renderConflictBanner()` currently collects conflicting guest IDs and checks if all are in `lockedGuests`. This changes to:
1. Collect the slot indices of all conflicting guests (by finding each guest's position in `selectedGuests`).
2. Check if all those slot indices are in `lockedSlots`.

```js
// Before
const allConflictingLocked = [...conflictingGuestIds].every((id) => lockedGuests.has(id));

// After
const conflictingSlotIndices = new Set();
conflictingGuestIds.forEach((id) => {
  const idx = selectedGuests.indexOf(id);
  if (idx !== -1) conflictingSlotIndices.add(idx);
});
const allConflictingLocked = [...conflictingSlotIndices].every((idx) => lockedSlots.has(idx));
```

The empty-suggestions message changes from:
```
"Consider unlocking a guest or selecting different guests."
```
To:
```
"Consider unlocking a slot or selecting different guests."
```

### Suggestion Swap Behavior

When a suggestion swap is applied, the current code removes the lock from the swapped-out guest:
```js
lockedGuests.delete(oldGuestId);
```

With slot-based locking, swapping a guest in a slot should **not** auto-unlock the slot. The slot lock is the user's intent to keep that position stable. However, the suggestion system already skips locked slots, so swap buttons will never appear for locked slots. No change needed here -- but the old `lockedGuests.delete(oldGuestId)` line should be removed entirely.

### Optimizer

The optimizer (`optimize()`) brute-forces amenity combinations for the current guest lineup. It does not consider guest locks at all -- it only optimizes amenities. No change needed for the optimizer.

## Migration

Users with existing `lockedGuests` data in localStorage need migration to `lockedSlots`.

In `loadState()`, after loading the state object:

```js
// Migration: lockedGuests (guest IDs) -> lockedSlots (slot indices)
if (Array.isArray(state.lockedGuests) && state.lockedGuests.length > 0) {
  state.lockedGuests.forEach((guestId) => {
    const slotIndex = selectedGuests.indexOf(guestId);
    if (slotIndex !== -1) {
      lockedSlots.add(slotIndex);
    }
  });
  // Persist migration immediately
  saveState();
}
// Normal load path for new format
if (Array.isArray(state.lockedSlots)) {
  lockedSlots = new Set(state.lockedSlots);
}
```

The migration is one-time: once `saveState()` writes the new format, the `lockedGuests` key is no longer written and will be absent on next load.

## Implementation Plan

Ordered list of code changes, all in `js/app.js` unless noted:

1. **Rename state variable.** Change `let lockedGuests = new Set()` to `let lockedSlots = new Set()`.

2. **Update `saveState()`.** Change `lockedGuests: Array.from(lockedGuests)` to `lockedSlots: Array.from(lockedSlots)`.

3. **Update `loadState()`.** Add migration path from `lockedGuests` to `lockedSlots`. Load `state.lockedSlots` into the new set. Remove the old cleanup logic that deleted locks for unselected guests (slot locks don't need this).

4. **Update `resetAll()`.** Change `lockedGuests = new Set()` to `lockedSlots = new Set()`.

5. **Update `handleGuestClick()`.** Remove the line `lockedGuests.delete(guestId)` on deselect. Instead, add `lockedSlots.delete(slotIndex)` when a guest is deselected (auto-unlock on deselect).

6. **Update `renderGuestSection()`.** Move lock icon from inside the guest card to the slot header row. The lock element uses `data-slot` instead of `data-guest`. Conditionally render only when `selectedGuests[slotIndex] !== null`. Add `locked` class to `.slot-row` when slot is locked.

7. **Update `bindEvents()`.** Change `.guest-lock` event listeners to use `lockedSlots` with the slot index from `data-slot` instead of `lockedGuests` with the guest ID.

8. **Update `computeSuggestions()`.** Change `lockedGuests.has(guestId)` to `lockedSlots.has(slotIndex)`.

9. **Update `renderConflictBanner()`.** Change the "all conflicting locked" check to use slot indices and `lockedSlots`.

10. **Update suggestion swap handler in `bindEvents()`.** Remove the `lockedGuests.delete(oldGuestId)` line (no longer needed).

11. **Update suggestion empty-state text.** Change "unlocking a guest" to "unlocking a slot".

12. **CSS changes (`css/styles.css`).** Move `.guest-lock` styles to apply within `.slot-label` instead of `.guest-card`. Add `.slot-row.locked` styles for visual feedback on the selected card. Adjust responsive breakpoint styles for the new lock placement.

## Open Questions

- None. The design is straightforward and all edge cases are addressed above.
