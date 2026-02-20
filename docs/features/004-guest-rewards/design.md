# Guest Reward Tracking -- Design

> Feature 004. Created 2026-02-20.

## Problem Statement

Players grinding Ember Court reputation must repeatedly invite guests across many weeks to reach Best Friend status and earn permanent collectibles (mounts, pets, transmog, toys). Currently, the calculator provides no information about what rewards each guest offers, forcing players to Alt-Tab to Wowhead or wiki pages to check reward tables before choosing guests.

This creates two problems:

1. **No reward visibility during guest selection.** Players cannot see what collectibles a guest offers while deciding who to invite. A player who already has all of Sika's rewards might prefer to invite Choofa instead, but the calculator gives them no way to know this.

2. **No way to track collection progress.** Players running the court weekly over months lose track of which rewards they have already collected across 16 guests, each with multiple reward tiers.

This feature adds reward data to each guest and lets players mark rewards as collected, surfacing collection progress directly in the guest selection UI where it influences decisions.

---

## Design Principles

1. **Informational, not strategic.** Rewards do not affect the happiness scoring algorithm. They are presented as supplementary context alongside the existing preference/conflict data. The calculator does not try to optimize for "uncollected rewards" -- that is the player's judgment call.

2. **Minimal footprint on guest cards.** Guest cards are already dense (portrait, name, faction, preference tags, lock toggle, check badge, conflict badge). Reward info must not compete with the primary preference data. A compact summary indicator on cards, with full details available on demand, is the right balance.

3. **Progressive disclosure.** Show a small reward summary on the guest card at all times. Show full reward details (item names, types, collection status) in an expandable detail panel triggered by user action.

4. **Persistence parity.** Reward tracking state follows the same localStorage pattern as existing state (selectedGuests, selectedAmenities, lockedGuests, lockedAmenities).

---

## Data Model Changes

### 1. New static data: `rewards` array on each guest in `EmberCourtData`

Add a `rewards` property to each guest object in `js/data.js`. Each reward is an object with a type, name, and a stable ID for tracking.

```js
{
  id: "countess",
  name: "The Countess",
  faction: "Venthyr",
  slot: 4,
  preferences: { ... },
  rewards: [
    { id: "countess-mount-gargon", type: "mount", name: "Desire's Battle Gargon" },
    { id: "countess-toy-parasol", type: "toy", name: "The Countess's Parasol" },
    { id: "countess-tmog-weapons", type: "transmog", name: "Venthyr Weapons" }
  ]
}
```

**Reward object shape:**

```js
{
  id: string,       // Stable unique key: "{guestId}-{type}-{shortname}"
  type: string,     // One of: "mount", "pet", "transmog", "toy"
  name: string      // Display name of the collectible
}
```

**Why a flat array instead of tiers?** The friendship tier at which each reward drops is interesting trivia but does not affect the player's decision in the calculator. What matters is: "Does this guest give a mount I don't have?" Grouping by tier would add data complexity without actionable value. If tier info is desired later, it can be added as an optional `tier` property without breaking the schema.

### Complete reward data by guest

This data is compiled from Wowhead's comprehensive tribute rewards guide, Wowpedia, and Warcraft Wiki. Only permanent collectibles are included (no consumables, anima, grey vendor items, or timed buffs). Transmog entries are consolidated per guest rather than listing every weapon variant individually -- a single "transmog" entry represents that the guest offers unique weapon/armor appearances.

| Guest | ID | Rewards |
|-------|----|---------|
| Cryptkeeper Kassir | `kassir` | transmog: Crypt Keeper's Mantle & Weapons |
| Plague Deviser Marileth | `marileth` | transmog: Plagueborne Weapons |
| Choofa | `choofa` | transmog: Ardenweald Weapons |
| Sika | `sika` | pet: Brightscale Hatchling; transmog: Kyrian Weapons |
| Stonehead | `stonehead` | pet: Violet Dredwing Pup; transmog: Bronze-Bound Sinstone & Weapons |
| Droman Aliothe | `aliothe` | pet: Pearlwing Heron; transmog: Ardenweald Weapons |
| Grandmaster Vole | `vole` | pet: Corpulent Bonetusk; transmog: Maldraxxian Weapons |
| Kleia & Pelagos | `kleia` | pet: Sable; transmog: Kyrian Weapons |
| Rendle & Cudgelface | `rendle` | pet: Bloodfeaster Spiderling; transmog: Revendreth Weapons |
| Alexandros Mograine | `mograine` | mount: Gruesome Flayedwing; transmog: Maldraxxian Weapons |
| Hunt-Captain Korayn | `korayn` | mount: Pale Acidmaw; transmog: Night Fae Weapons |
| Polemarch Adrestes | `adrestes` | transmog: Kyrian Weapons |
| The Countess | `countess` | mount: Desire's Battle Gargon; toy: The Countess's Parasol; transmog: Venthyr Weapons |
| Baroness Vashj | `vashj` | pet: Plaguelouse Larva; transmog: Maldraxxian Weapons |
| Lady Moonberry | `moonberry` | pet: Dusty Sporeflutterer; transmog: Ardenweald Weapons |
| Mikanikos | `mikanikos` | mount: Dauntless Duskrunner; transmog: Kyrian Weapons |

**Reward type distribution across all 16 guests:**
- Mounts: 4 guests (Mograine, Korayn, Countess, Mikanikos)
- Pets: 8 guests (Sika, Stonehead, Aliothe, Vole, Kleia, Rendle, Vashj, Moonberry)
- Toys: 1 guest (Countess)
- Transmog: all 16 guests (every guest offers unique weapon/armor appearances)

### 2. New persistent state: `collectedRewards`

```js
let collectedRewards = new Set();  // reward IDs the player has collected
```

- Default is empty (nothing collected).
- Persisted in localStorage alongside existing state as an array of reward ID strings.
- Independent of guest selection -- collecting a reward does not affect whether the guest is selected or locked.
- `resetAll()` does **not** clear `collectedRewards`. Collection progress represents real account-wide game state and should not be wiped by a calculator reset. A separate "Reset Collection" action is provided in the reward panel.

---

## UI Changes

### 1. Reward summary indicator on guest cards

A small row of colored dots (one per uncollected reward) appears below the preference tags on each guest card. This provides at-a-glance "this guest still has rewards for me" information without adding text clutter.

**Anatomy of updated guest card:**

```
+----------------------------------+
| [lock]                    [check]|
|         [portrait]               |
|          Guest Name              |
|          Faction                 |
|     [pref] [pref] [pref]        |
|     [reward dots row]            |
|                        [conflict]|
+----------------------------------+
```

**Reward dots specification:**

```html
<div class="guest-rewards-summary">
  <span class="reward-dot reward-mount" title="Mount: Desire's Battle Gargon"></span>
  <span class="reward-dot reward-toy collected" title="Toy: The Countess's Parasol (Collected)"></span>
  <span class="reward-dot reward-transmog" title="Transmog: Venthyr Weapons"></span>
</div>
```

Each dot is a small colored circle (8x8px) representing one reward:
- **Mount** dot: gold (`--accent-gold`) -- mounts are the most prestigious reward
- **Pet** dot: green (`--positive`) -- pets are the next most notable
- **Toy** dot: purple (`--accent-purple`) -- toys are rare in Ember Court
- **Transmog** dot: blue-grey (`--text-secondary`) -- every guest has transmog, so it is the least distinctive

When a reward is collected, its dot gets a reduced opacity (0.3) and a subtle line-through effect (a CSS `::after` pseudo-element strike line), visually crossing it off.

**Why dots instead of text?** Text labels ("1 mount, 2 transmog") would add too much visual weight to the card, competing with the preference tags that are the card's primary informational purpose. Dots communicate "how many rewards" and "what types" with minimal space. Hover/title attributes provide the actual item names for users who want specifics.

**Why not icons?** Icons (mount silhouette, paw print, etc.) at 8-10px would be illegible and inconsistent across platforms. Colored dots with a legend (provided in the reward detail panel) are simpler and more reliable.

```css
.guest-rewards-summary {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: var(--space-xs);
  min-height: 12px;
}

.reward-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  transition: opacity 0.2s;
}

.reward-dot.reward-mount    { background: var(--accent-gold); }
.reward-dot.reward-pet      { background: var(--positive); }
.reward-dot.reward-toy      { background: var(--accent-purple); }
.reward-dot.reward-transmog { background: var(--text-secondary); }

/* Collected state */
.reward-dot.collected {
  opacity: 0.3;
}

.reward-dot.collected::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -1px;
  right: -1px;
  height: 1px;
  background: var(--text-primary);
  transform: translateY(-50%);
}
```

### 2. Reward detail panel (expandable)

Clicking a guest card's reward dots row (or a dedicated "Rewards" button on the card) opens a **reward detail panel** that slides in below the guest card's slot row. This panel shows all rewards for that guest with collection toggles.

**Why not a modal?** Modals break the page flow and feel heavy for what is essentially a checklist lookup. An inline expansion keeps the user in context and allows them to see the guest card and reward panel simultaneously.

**Why not a tooltip?** Tooltips are ephemeral (disappear on mouse-out), making them unsuitable for interactive elements like collection toggles. They also do not work well on mobile (no hover).

**Panel layout:**

```
+--------------------------------------------------------------+
|  RSVP Slot 4                                                  |
|  [Card] [Card] [Card] [Card]                                  |
+--------------------------------------------------------------+
|  Rewards for The Countess                         [Close X]   |
|  +----------------------------------------------------------+|
|  |  [gold dot] Mount     Desire's Battle Gargon       [ ]   ||
|  |  [purp dot] Toy       The Countess's Parasol       [x]   ||
|  |  [grey dot] Transmog  Venthyr Weapons               [ ]   ||
|  +----------------------------------------------------------+|
|  Legend: gold=Mount  green=Pet  purple=Toy  grey=Transmog     |
+--------------------------------------------------------------+
```

**Panel HTML structure:**

```html
<div class="reward-panel" data-guest="countess">
  <div class="reward-panel-header">
    <h3 class="reward-panel-title">Rewards for The Countess</h3>
    <button class="reward-panel-close" aria-label="Close reward panel">&times;</button>
  </div>
  <ul class="reward-list">
    <li class="reward-item">
      <span class="reward-dot reward-mount"></span>
      <span class="reward-type-label">Mount</span>
      <span class="reward-name">Desire's Battle Gargon</span>
      <button class="reward-collect-btn" data-reward="countess-mount-gargon"
              role="checkbox" aria-checked="false" aria-label="Mark as collected"
              tabindex="0">
        <span class="reward-checkbox"></span>
      </button>
    </li>
    <!-- ... more items ... -->
  </ul>
</div>
```

**Panel styling:**

```css
.reward-panel {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, #160e20 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--space-md) var(--space-lg);
  margin-top: var(--space-sm);
  margin-bottom: var(--space-md);
}

.reward-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}

.reward-panel-title {
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  color: var(--text-heading);
}

.reward-panel-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}
.reward-panel-close:hover {
  color: var(--text-primary);
}

.reward-list {
  list-style: none;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 0.85rem;
}
.reward-item:last-child {
  border-bottom: none;
}

.reward-type-label {
  font-family: 'Cinzel', serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  min-width: 65px;
}

.reward-name {
  flex: 1;
  color: var(--text-primary);
}

.reward-item.collected .reward-name {
  color: var(--text-muted);
  text-decoration: line-through;
  text-decoration-color: rgba(154, 142, 176, 0.4);
}

/* Checkbox button */
.reward-collect-btn {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.reward-collect-btn:hover {
  border-color: var(--accent-gold);
  background: rgba(212, 168, 67, 0.1);
}

.reward-collect-btn[aria-checked="true"] {
  background: var(--accent-gold);
  border-color: var(--accent-gold);
}

.reward-collect-btn[aria-checked="true"] .reward-checkbox::after {
  content: "\2713";
  color: var(--bg-primary);
  font-size: 0.75rem;
  font-weight: 700;
}
```

### 3. "All collected" indicator on guest cards

When all of a guest's rewards have been marked as collected, the reward dots row is replaced with a single muted text indicator:

```html
<div class="guest-rewards-summary all-collected">
  <span class="rewards-complete-text">All rewards collected</span>
</div>
```

```css
.rewards-complete-text {
  font-size: 0.6rem;
  color: var(--text-muted);
  font-style: italic;
}
```

This provides an at-a-glance signal that the player has nothing left to earn from this guest, which may influence their decision to invite a different guest instead.

### 4. Reward panel placement in the render flow

The reward panel appears inside the guest section, immediately after the slot row that contains the guest whose rewards are being viewed. It is rendered conditionally based on an `expandedRewardGuest` state variable.

```js
function render() {
  if (!root || !DATA) return;

  activeConflicts = detectConflicts(selectedGuests);

  root.innerHTML = [
    renderGuestSection(),        // includes reward panel if expanded
    renderConflictBanner(),
    renderSuggestionPanel(),
    '<hr class="ec-divider">',
    renderAmenitySection(),
    renderOptimizeButton(),
    '<hr class="ec-divider">',
    renderResultsSection(),
  ].join("");

  bindEvents();
}
```

Inside `renderGuestSection()`, after rendering each slot's guest cards grid, check if the expanded reward guest belongs to this slot and, if so, append the reward panel:

```js
// After the slot-guests grid closes:
if (expandedRewardGuest && DATA.slots[slotIndex].guestIds.includes(expandedRewardGuest)) {
  html += renderRewardPanel(expandedRewardGuest);
}
```

---

## Interaction Flows

### Flow 1: Viewing reward information

```
1. User sees colored dots below preference tags on each guest card.
   -> Dots indicate type and quantity of rewards.
   -> Hover/long-press on a dot shows a tooltip with the reward name.

2. User clicks on the reward dots area of a guest card.
   -> The reward detail panel expands below that slot row.
   -> Clicking reward dots on a different guest closes the current panel
      and opens the new one.
   -> Clicking reward dots on the same guest toggles the panel closed.
```

### Flow 2: Marking a reward as collected

```
1. User opens the reward detail panel for a guest.
2. User clicks the checkbox next to "Desire's Battle Gargon".
   -> The checkbox fills with gold and shows a checkmark.
   -> The reward name gets strikethrough styling.
   -> The corresponding dot on the guest card fades (opacity: 0.3).
   -> State is saved to localStorage immediately.
3. The panel remains open so the user can mark additional rewards.
```

### Flow 3: Unmarking a collected reward

```
1. User opens the reward detail panel for a guest.
2. User clicks the filled checkbox next to a collected reward.
   -> The checkbox reverts to empty.
   -> The reward name loses its strikethrough.
   -> The dot on the guest card regains full opacity.
   -> State is saved to localStorage.
```

### Flow 4: Reset button interaction

```
1. User clicks the "Reset All" button in the header.
   -> Guest selections, amenity selections, locks are all cleared.
   -> Reward collection state is NOT cleared.
   -> This is intentional: collection progress reflects the player's
      real account state and should not be lost with a calculator reset.

2. To clear collection progress, the user would need to individually
   uncheck rewards, or a future "Reset Collection" button could be added
   to the reward panel. For MVP, individual unchecking is sufficient
   given the small number of rewards (roughly 30 total across all guests).
```

### Edge Cases

| Scenario | Behavior |
|----------|----------|
| Guest has no rewards (theoretical) | No dots row rendered. No expandable panel. |
| All rewards collected | Dots row replaced with "All rewards collected" text. Panel still accessible. |
| Guest not selected but has rewards | Dots still visible (rewards are informational, not tied to selection). |
| Reward panel open, user selects different guest in same slot | Panel stays open (selection change does not auto-close). The reward panel is associated with a specific guest, not the selection state. |
| Reward panel open, user clicks optimize | Panel closes (full re-render with `expandedRewardGuest = null`). |
| localStorage unavailable | Reward collection tracking gracefully degrades. Dots show but checkboxes do not persist. Same pattern as existing state handling. |

---

## Algorithm / Logic

### No scoring impact

Rewards are purely informational. They do not feed into `scoreGuest()`, `totalHappiness()`, `optimize()`, or `computeSuggestions()`. No existing scoring functions are modified.

### Reward data lookup

```js
function getGuestRewards(guestId) {
  const guest = getGuest(guestId);
  return guest && guest.rewards ? guest.rewards : [];
}

function isRewardCollected(rewardId) {
  return collectedRewards.has(rewardId);
}

function allRewardsCollected(guestId) {
  const rewards = getGuestRewards(guestId);
  return rewards.length > 0 && rewards.every(r => collectedRewards.has(r.id));
}

function uncollectedRewardCount(guestId) {
  const rewards = getGuestRewards(guestId);
  return rewards.filter(r => !collectedRewards.has(r.id)).length;
}
```

### Toggle collection handler

```js
function handleRewardToggle(rewardId) {
  if (collectedRewards.has(rewardId)) {
    collectedRewards.delete(rewardId);
  } else {
    collectedRewards.add(rewardId);
  }
  saveState();
  render();
}
```

---

## State Management Changes

### New state variable

```js
let collectedRewards = new Set();   // reward IDs marked as collected
let expandedRewardGuest = null;     // guest ID whose reward panel is open, or null
```

`expandedRewardGuest` is ephemeral (not persisted). It resets on page load.

### Persistence changes

**`saveState()`** -- add `collectedRewards`:

```js
function saveState() {
  try {
    const state = {
      selectedGuests,
      selectedAmenities,
      lockedGuests: Array.from(lockedGuests),
      lockedAmenities: Array.from(lockedAmenities),
      collectedRewards: Array.from(collectedRewards),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage may be unavailable
  }
}
```

**`loadState()`** -- restore `collectedRewards`:

```js
if (Array.isArray(state.collectedRewards)) {
  collectedRewards = new Set(state.collectedRewards);
}
```

**`resetAll()`** -- intentionally does NOT clear `collectedRewards`:

```js
function resetAll() {
  selectedGuests = [null, null, null, null];
  selectedAmenities = { entertainment: null, refreshment: null, decoration: null, security: null };
  lockedGuests = new Set();
  lockedAmenities = new Set();
  showingSuggestions = false;
  replacementSuggestions = [];
  expandedRewardGuest = null;    // close any open panel
  // collectedRewards is NOT cleared -- see design rationale above
  saveState();
  render();
}
```

### Separate localStorage key option (considered and rejected)

Using a separate localStorage key (e.g., `"ember-court-rewards"`) for reward tracking was considered. This would cleanly separate "calculator state" from "collection state" and make the "reset doesn't clear rewards" behavior more natural. However, it adds persistence complexity (two keys, two save/load paths) for minimal benefit. The single-key approach with selective reset is simpler and consistent with the existing pattern.

---

## Responsive Behavior

### Desktop (>= 1024px)

- Guest cards show reward dots below preference tags.
- Reward panel spans the full width of the slot row (same width as the 4-column guest card grid).
- Reward items are laid out in a single-column list with type label, name, and checkbox.

### Tablet (640-1023px)

- Guest cards in 2-column grid. Reward dots still visible.
- Reward panel spans full width below the 2-column grid.
- No layout changes needed -- the panel is already full-width and single-column.

### Mobile (< 640px)

- Guest cards in 2-column grid. Reward dots still visible.
- Reward panel spans full width.
- Checkbox targets are already 22x22px, which is adequate for touch when combined with the row padding. No size increase needed.

### Very small screens (< 400px)

- Preference tags are hidden at this breakpoint (existing CSS: `.guest-prefs { display: none }`).
- Reward dots remain visible since they are a separate element with minimal width.
- This provides useful information even when preference details are hidden.

```css
@media (max-width: 400px) {
  .guest-rewards-summary {
    margin-top: 2px;
  }
  .reward-dot {
    width: 6px;
    height: 6px;
  }
}
```

---

## Accessibility

- **Reward dots:** Each dot has a descriptive `title` attribute ("Mount: Desire's Battle Gargon" or "Mount: Desire's Battle Gargon (Collected)"). Screen readers announce these on focus. The dots container has `role="group"` and `aria-label="Rewards"`.
- **Reward panel:** Uses semantic `<ul>` list markup. Close button has `aria-label="Close reward panel"`.
- **Collection checkboxes:** Use `role="checkbox"` with `aria-checked` attribute. Keyboard accessible via Enter/Space. Descriptive `aria-label` ("Mark Desire's Battle Gargon as collected" / "Unmark Desire's Battle Gargon as collected").
- **Reduced motion:** All new transitions respect the existing `prefers-reduced-motion` rule.
- **Color independence:** Collected state is conveyed via both opacity change AND strikethrough/checkmark, not color alone.

---

## What This Design Intentionally Does NOT Include

1. **Reward-based guest recommendations.** The calculator does not suggest "invite this guest because you haven't collected their mount." That conflates happiness optimization with collection progress and would make the optimizer's output confusing.

2. **Wowhead links per reward.** Unlike amenity unlock info (Feature 003), individual reward Wowhead links add clutter to an already-dense panel. The reward names are specific enough for players to search if needed. This can be added later if requested.

3. **Friendship tier display.** The tier at which each reward drops (Friend, Good Friend, Best Friend) is not shown. Players at the point of using this calculator generally know the friendship system. Adding tier data would increase data.js complexity and visual density without aiding the core decision: "should I invite this guest?"

4. **Reward filtering or sorting.** With a maximum of ~3 rewards per guest and ~30 total, filtering/sorting adds UI complexity without meaningful benefit.

5. **Global collection summary.** A "You've collected 18/32 rewards" banner was considered but rejected for MVP. It does not aid per-guest decision-making and could be added later as a standalone feature.

6. **Import from game data.** Automatic detection of collected rewards (via addon export or API) is out of scope for a static client-side calculator.

---

## Implementation Notes

### `js/data.js`

Add a `rewards` array to each of the 16 guest objects in `EmberCourtData.guests`. Each reward has `{ id, type, name }`. The `EmberCourtData` object remains frozen.

Example for The Countess:

```js
{ id: "countess", name: "The Countess", faction: "Venthyr", slot: 4,
  preferences: { cleanliness: 0, danger: 0, decadence: 1, excitement: -1, formality: 1 },
  rewards: [
    { id: "countess-mount-gargon", type: "mount", name: "Desire's Battle Gargon" },
    { id: "countess-toy-parasol", type: "toy", name: "The Countess's Parasol" },
    { id: "countess-tmog-weapons", type: "transmog", name: "Venthyr Weapons" }
  ]
}
```

### `js/app.js`

**State additions:**
- Add `let collectedRewards = new Set();`
- Add `let expandedRewardGuest = null;`

**Helper functions (new):**
- `getGuestRewards(guestId)` -- returns the rewards array for a guest.
- `isRewardCollected(rewardId)` -- checks if a reward ID is in the collected set.
- `allRewardsCollected(guestId)` -- checks if all rewards for a guest are collected.
- `handleRewardToggle(rewardId)` -- toggles a reward's collected state.
- `handleRewardPanelToggle(guestId)` -- opens/closes the reward detail panel for a guest.

**Render function modifications:**
- `renderGuestSection()`:
  - After the guest preference tags, add the reward dots row using `renderRewardDots(guest)`.
  - After each slot's guest grid, conditionally render the reward panel if `expandedRewardGuest` is in that slot.
- New `renderRewardDots(guest)` function -- returns the dots HTML for a single guest card.
- New `renderRewardPanel(guestId)` function -- returns the full expandable reward panel HTML.

**Event binding additions in `bindEvents()`:**
- `.guest-rewards-summary` click handler (with `stopPropagation()` so it does not trigger guest selection) -- calls `handleRewardPanelToggle()`.
- `.reward-collect-btn` click handler -- calls `handleRewardToggle()`.
- `.reward-panel-close` click handler -- sets `expandedRewardGuest = null` and re-renders.

**Persistence updates:**
- `saveState()`: add `collectedRewards: Array.from(collectedRewards)` to the state object.
- `loadState()`: restore `collectedRewards` from the stored array.
- `resetAll()`: close the reward panel (`expandedRewardGuest = null`) but do NOT clear `collectedRewards`.

### `css/styles.css`

New CSS classes:
- `.guest-rewards-summary` -- flex row of dots below preference tags.
- `.reward-dot`, `.reward-dot.reward-mount`, `.reward-dot.reward-pet`, `.reward-dot.reward-toy`, `.reward-dot.reward-transmog` -- dot colors.
- `.reward-dot.collected` -- faded with strikethrough.
- `.rewards-complete-text` -- "All rewards collected" muted text.
- `.reward-panel` -- expandable panel container.
- `.reward-panel-header`, `.reward-panel-title`, `.reward-panel-close` -- panel header.
- `.reward-list`, `.reward-item`, `.reward-item.collected` -- reward list items.
- `.reward-type-label` -- uppercase type indicator.
- `.reward-name` -- item name with strikethrough when collected.
- `.reward-collect-btn` -- checkbox button with gold fill on checked.
- Responsive adjustments at 400px for dot size.

---

## Implementation Checklist

- [ ] Add `rewards` array to all 16 guest objects in `js/data.js`
- [ ] Add `collectedRewards` Set and `expandedRewardGuest` to app state
- [ ] Add `getGuestRewards()`, `isRewardCollected()`, `allRewardsCollected()` helper functions
- [ ] Add `handleRewardToggle()` and `handleRewardPanelToggle()` event handlers
- [ ] Update `saveState()` and `loadState()` to persist `collectedRewards`
- [ ] Confirm `resetAll()` does not clear `collectedRewards`
- [ ] Add `renderRewardDots(guest)` function for guest card summary dots
- [ ] Add `renderRewardPanel(guestId)` function for expandable detail panel
- [ ] Modify `renderGuestSection()` to include dots and conditional panel
- [ ] Add event bindings for reward dots click, checkbox toggle, panel close
- [ ] Add all new CSS classes to `css/styles.css`
- [ ] Add responsive styles for 400px breakpoint
- [ ] Test reward dot display for all 16 guests
- [ ] Test collection toggle persistence across page reloads
- [ ] Test that `resetAll()` preserves collection state
- [ ] Test reward panel open/close interaction does not interfere with guest selection
- [ ] Test keyboard navigation (tab to dots, Enter to open panel, tab to checkboxes)
- [ ] Test at all responsive breakpoints (1023px, 640px, 400px)
- [ ] Verify `prefers-reduced-motion` disables dot/panel transitions

---

## Research Sources

- [Wowhead - Ember Court Guide](https://www.wowhead.com/guide/venthyr-covenant-ember-court)
- [Wowhead - Comprehensive Tribute Rewards List](https://www.wowhead.com/guide/comprehensive-list-of-tribute-rewards-for-completing-the-ember-court-23121)
- [Wowpedia - Ember Court](https://wowpedia.fandom.com/wiki/Ember_Court)
- [Warcraft Wiki - Ember Court](https://warcraft.wiki.gg/wiki/Ember_Court)
- [Icy Veins - Ember Court Guide](https://www.icy-veins.com/wow/the-ember-court-venthyr-weekly-activity)
- [Wowhead - Desire's Battle Gargon Discovery](https://www.wowhead.com/news/desires-battle-gargon-mount-found-reward-from-the-countess-at-the-ember-court-321356)
