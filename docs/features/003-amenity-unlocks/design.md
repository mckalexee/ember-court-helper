# Amenity Unlocks -- Design

> Feature 003. Created 2026-02-19.

## Problem Statement

Not all 12 amenities in Ember Court are available from the start. In the game, some amenities require quest completions or reputation thresholds to unlock. Currently, the calculator treats all 12 amenities as available, which creates two problems:

1. **The optimizer recommends amenities the player cannot use.** The brute-force search over all 81 combinations may select an amenity the player has not yet unlocked.
2. **Players lack visibility into unlock requirements.** The calculator offers no information about what is needed to unlock locked amenities.

This feature allows players to mark amenities as locked (not yet unlocked in-game), excludes those amenities from the optimizer and replacement suggestions, and provides inline unlock requirement information with links to Wowhead.

## Design

### Data Model Changes

#### 1. New static data: unlock requirements in `EmberCourtData`

Add an `unlock` field to each amenity object in `js/data.js`:

```js
{
  id: "band",
  name: "Lost Chalice Band",
  category: "entertainment",
  effects: { ... },
  unlock: {
    requirement: "Staff: Stage Crew (Honored)",
    questId: 61738,
    wowheadUrl: "https://www.wowhead.com/quest=61738/ember-court-lost-chalice-band"
  }
}
```

Complete unlock data from research:

| ID | Name | Requirement | Quest ID | Wowhead URL |
|----|------|-------------|----------|-------------|
| `atoning` | Atoning Rituals | Available from start | 61407 | quest=61407 |
| `wilds` | Glimpse of the Wilds | Available from start | 61408 | quest=61408 |
| `band` | Lost Chalice Band | Staff: Stage Crew (Honored) | 61738 | quest=61738 |
| `tea` | Tubbin's Tea Party | Available from start | 61404 | quest=61404 |
| `desserts` | Divine Desserts | Available from start | 61405 | quest=61405 |
| `mushroom` | Mushroom Surprise | Staff: Waiters (Honored) | 61406 | quest=61406 |
| `traditional` | Traditional | Building: Dredger Pool (Friendly) | 61398 | quest=61398 |
| `mortal` | Mortal Reminders | Building: Dredger Pool (Friendly) | 61399 | quest=61399 |
| `mirrors` | Mystery Mirrors | Staff: Dredger Decorators (Revered) | 61400 | quest=61400 |
| `venthyr` | Venthyr Volunteers | Building: Guardhouse (Honored) | 61401 | quest=61401 |
| `stoneborn` | Stoneborn Reserves | Building: Guardhouse (Honored) | 61402 | quest=61402 |
| `maldraxxian` | Maldraxxian Army | Staff: Bouncers (Revered) | 61403 | quest=61403 |

#### 2. New persistent state: `lockedAmenities`

```js
let lockedAmenities = new Set();  // amenity IDs the player has NOT unlocked
```

- Default is empty (all amenities available) -- experienced players (majority audience) have everything unlocked.
- Persisted in localStorage alongside existing state as an array.
- If a selected amenity is locked, it is automatically deselected.
- `resetAll()` clears `lockedAmenities`.

### UI Changes

#### 1. Three-state amenity chip visuals

| State | Border | Opacity | Cursor | Extra |
|-------|--------|---------|--------|-------|
| Selected | `--accent-gold` | 1.0 | pointer | Existing glow |
| Available (not selected) | `--border-color` | 1.0 | pointer | -- |
| Locked | `--border-color` dashed | 0.45 | default | Strikethrough name, hidden impact |

#### 2. Lock toggle on each amenity chip

- Positioned top-right of each chip (same pattern as guest locks from Feature 002).
- Uses existing `LOCK_OPEN_SVG` / `LOCK_CLOSED_SVG` icons.
- Hidden by default on unlocked chips, revealed on hover. Always visible on locked chips.
- On mobile (no hover), always visible at reduced opacity.
- `stopPropagation()` prevents triggering chip selection.

#### 3. Unlock requirement info on locked chips

When locked, a line appears below effect tags showing the requirement and a Wowhead link:

```html
<div class="amenity-unlock-info">
  <span class="unlock-req-text">Staff: Stage Crew (Honored)</span>
  <a href="https://www.wowhead.com/quest=61738" target="_blank" class="unlock-wowhead-link">
    Wowhead &#x2197;
  </a>
</div>
```

#### 4. Section header badge

Shows "X / 12 Unlocked" badge when any amenities are locked.

### Algorithm / Logic

#### 1. Optimizer changes (`optimize()`)

Filter locked amenities from options before enumeration:

```js
const optionsPerCat = cats.map((cat) =>
  getAmenitiesByCategory(cat).filter((a) => !lockedAmenities.has(a.id))
);
```

Edge case: if all amenities in a category are locked, treat as null (no selection). Insert `[{ id: null }]` sentinel.

#### 2. Replacement suggestions (`computeSuggestions()`)

`optimizeForLineup()` uses the same filtered options, so suggestions automatically respect locks.

#### 3. Selection guard

`handleAmenityClick()` returns early if amenity is locked (belt-and-suspenders with CSS `pointer-events: none`).

## Implementation Notes

### `js/data.js`
- Add `unlock` property to all 12 amenity objects with `{ requirement, questId, wowheadUrl }`.

### `js/app.js`
- Add `lockedAmenities` Set to state variables.
- Add `handleAmenityLockToggle()` handler.
- Guard `handleAmenityClick()` against locked amenities.
- Update `saveState()` / `loadState()` / `resetAll()` for persistence.
- Filter locked amenities in `optimize()` and `optimizeForLineup()`.
- Update `renderAmenitySection()`: add lock toggle, locked class, unlock info, section badge.
- Update `bindEvents()`: bind `.amenity-lock-toggle` click/keydown with stopPropagation.

### `css/styles.css`
- `.amenity-chip.locked` -- opacity, strikethrough, pointer-events.
- `.amenity-lock-toggle` -- positioning, hover reveal, locked-always-visible.
- `.amenity-unlock-info` -- layout, text styling.
- `.unlock-wowhead-link` -- gold color, hover state.
- Responsive: always show toggle on mobile.

## Open Questions

1. **Exact quest IDs** -- Most are confirmed from Wowhead. Quest 61402 (Stoneborn Reserves) is inferred from sequential pattern.
2. **Default amenities lockable?** -- Yes, keep uniform. Harmless edge case.
3. **Keyboard accessibility** -- Locked chips use `pointer-events: none` but toggle inside has `pointer-events: auto`. Test tab navigation.
