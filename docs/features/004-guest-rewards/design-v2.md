# Guest Reward Tracking -- Design v2 (Overhaul)

> Feature 004, revision 2. Created 2026-02-20.
> Supersedes the original design.md. Addresses all user feedback from the initial implementation.

## User Feedback Summary

1. **"This UI is too subtle"** -- Reward buttons on guest cards are small colored dots that users miss entirely.
2. **"I want a full list somewhere that I can see all of the rewards"** -- No global reward summary exists.
3. **"Icons are missing for the rewards"** -- Reward types show as colored dots, not actual WoW item icons.
4. **"Rewards are a second class citizen and should be first class citizens"** -- Rewards need more visual weight across the entire application.
5. **"The formatting of the rewards is slightly off in the table. Alignment is off"** -- Reward panel layout has alignment issues.

---

## Design Goals

1. Make rewards visually prominent on guest cards using actual item icons (56x56 Wowhead icons, already downloaded to `img/rewards/`).
2. Fix the reward detail panel with proper alignment using CSS grid.
3. Add a dedicated **Reward Collection** section to the page -- a full-page section like Guest Selection, Amenity Selection, and Results -- showing all 29 rewards organized by type with progress tracking.
4. Maintain the dark Venthyr theme, responsive design, and existing architecture (innerHTML string templates, full re-render, bindEvents).

---

## Change 1: Guest Card Reward Indicators (Overhauled)

### Problem

The current `renderRewardDots()` renders tiny 8px colored circles with a text label like "2 Rewards". Users described this as "too subtle." The dots communicate type via color alone, which is not discoverable.

### Solution

Replace the dot-based reward button with a row of **actual item icon thumbnails** (20x20px, cropped from the 56x56 source images). Each reward is shown as a small square icon with a rounded border. Collected rewards get a gold checkmark overlay and reduced opacity.

### New guest card anatomy

```
+------------------------------------------+
| [lock]                            [check] |
|            [portrait 56x56]               |
|             Guest Name                    |
|             Faction                       |
|        [pref] [pref] [pref]              |
|                                           |
|   [icon][icon][icon]  <- reward icons     |
|                              [conflict]   |
+------------------------------------------+
```

### HTML structure: `renderRewardIndicators(guest)`

Replaces the existing `renderRewardDots(guest)` function.

```html
<div class="guest-reward-icons" data-guest="countess" tabindex="0"
     role="button" aria-label="Rewards for The Countess: 2 uncollected">
  <img class="reward-icon" src="img/rewards/countess-mount.jpg"
       alt="Mount: Desire's Battle Gargon" title="Mount: Desire's Battle Gargon">
  <img class="reward-icon collected" src="img/rewards/countess-toy.jpg"
       alt="Toy: The Countess's Parasol (Collected)" title="Toy: The Countess's Parasol (Collected)">
  <img class="reward-icon" src="img/rewards/transmog.jpg"
       alt="Transmog: Venthyr Weapons" title="Transmog: Venthyr Weapons">
</div>
```

When all rewards are collected:

```html
<div class="guest-reward-icons all-collected" data-guest="countess" tabindex="0"
     role="button" aria-label="Rewards for The Countess - all collected">
  <img class="reward-icon collected" src="img/rewards/countess-mount.jpg" ...>
  <img class="reward-icon collected" src="img/rewards/countess-toy.jpg" ...>
  <img class="reward-icon collected" src="img/rewards/transmog.jpg" ...>
  <span class="reward-icons-check">&check;</span>
</div>
```

### CSS: `.guest-reward-icons`

```css
/* Reward icon row on guest cards */
.guest-reward-icons {
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  margin-top: var(--space-sm);
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}
.guest-reward-icons:hover {
  border-color: var(--accent-gold);
  background: rgba(212, 168, 67, 0.08);
}
.guest-reward-icons:focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: 1px;
}
.guest-reward-icons.expanded {
  border-color: var(--accent-gold);
  background: rgba(212, 168, 67, 0.12);
}
.guest-reward-icons.all-collected {
  opacity: 0.5;
}
.guest-reward-icons.all-collected:hover {
  opacity: 0.8;
}

.reward-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  object-fit: cover;
  display: block;
  transition: opacity 0.2s, border-color 0.2s;
}
.reward-icon:hover {
  border-color: var(--accent-gold);
}
.reward-icon.collected {
  opacity: 0.35;
  filter: grayscale(50%);
}

.reward-icons-check {
  font-size: 0.7rem;
  color: var(--positive);
  margin-left: 2px;
}
```

### JS function signature

```js
function renderRewardIndicators(guest)
```

Returns the HTML string for the reward icon row. Uses `getRewardIconPath(reward)` from the icons-research document to resolve image paths.

```js
function getRewardIconPath(reward) {
  if (reward.type === "transmog") {
    return "img/rewards/transmog.jpg";
  }
  return "img/rewards/" + reward.id + ".jpg";
}
```

### Responsive behavior

At **400px and below**, icons shrink to 20x20px:

```css
@media (max-width: 400px) {
  .reward-icon {
    width: 20px;
    height: 20px;
  }
}
```

---

## Change 2: Reward Detail Panel (Fixed Alignment)

### Problem

The current reward panel uses a flex layout with `gap: var(--space-sm)` between the dot, type label, name, and checkbox. The type label has `min-width: 65px` but the actual text widths vary ("Mount" vs "Transmog"), causing jagged alignment. The dot + label + name alignment drifts across rows.

### Solution

Replace the flex layout with a **CSS grid** on `.reward-list` that enforces column alignment across all rows. Add item icons (28x28) next to each reward entry.

### New panel layout

```
+--------------------------------------------------------------+
|  Rewards for The Countess                        [Close X]    |
|  ------------------------------------------------------------|
|  [icon] Mount      Desire's Battle Gargon             [ ]    |
|  [icon] Toy        The Countess's Parasol             [x]    |
|  [icon] Transmog   Venthyr Weapons                    [ ]    |
+--------------------------------------------------------------+
```

### HTML structure: `renderRewardPanel(guestId)` (revised)

```html
<div class="reward-panel" data-guest="countess">
  <div class="reward-panel-header">
    <h3 class="reward-panel-title">Rewards for The Countess</h3>
    <button class="reward-panel-close" aria-label="Close reward panel">&times;</button>
  </div>
  <div class="reward-grid">
    <div class="reward-row">
      <img class="reward-row-icon" src="img/rewards/countess-mount.jpg"
           alt="Desire's Battle Gargon" width="28" height="28">
      <span class="reward-row-type">Mount</span>
      <span class="reward-row-name">Desire's Battle Gargon</span>
      <button class="reward-collect-btn" data-reward="countess-mount"
              role="checkbox" aria-checked="false"
              aria-label="Mark Desire's Battle Gargon as collected"
              tabindex="0">
        <span class="reward-checkbox"></span>
      </button>
    </div>
    <!-- more rows -->
  </div>
</div>
```

### CSS: `.reward-grid` (replaces `.reward-list`)

```css
.reward-grid {
  display: grid;
  grid-template-columns: 1fr; /* each row is a sub-grid item */
}

.reward-row {
  display: grid;
  grid-template-columns: 28px 72px 1fr 28px;
  gap: var(--space-sm);
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 0.85rem;
}
.reward-row:last-child {
  border-bottom: none;
}

.reward-row-icon {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  object-fit: cover;
  display: block;
}

.reward-row-type {
  font-family: 'Cinzel', serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.reward-row-name {
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Collected state on grid rows */
.reward-row.collected .reward-row-name {
  color: var(--text-muted);
  text-decoration: line-through;
  text-decoration-color: rgba(154, 142, 176, 0.4);
}

.reward-row.collected .reward-row-icon {
  opacity: 0.35;
  filter: grayscale(50%);
}
```

The grid approach with fixed column widths (`28px 72px 1fr 28px`) ensures the icon, type label, name, and checkbox are perfectly aligned across all rows regardless of content length.

### Mobile adjustment

At **640px and below**, the type label column shrinks:

```css
@media (max-width: 640px) {
  .reward-row {
    grid-template-columns: 24px 60px 1fr 24px;
    font-size: 0.8rem;
  }
  .reward-row-icon {
    width: 24px;
    height: 24px;
  }
}
```

---

## Change 3: Reward Collection Section (NEW)

This is the major new addition. A dedicated, always-visible page section that shows ALL 29 rewards across all 16 guests, organized by reward type, with collection checkboxes and progress counters.

### Placement in the render flow

The Reward Collection section appears as a top-level section in the `render()` output, placed **after the Results section** as the final content section. This makes it a "second screen" destination -- the calculator workflow (guests -> amenities -> results) remains the primary flow, and the collection tracker lives below as a reference/tracking tool.

```js
function render() {
  if (!root || !DATA) return;
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
    renderRewardCollectionSection(),   // <-- NEW
  ].join("");

  bindEvents();
}
```

### Section layout

```
+================================================================+
|  Reward Collection                        12 / 29 Collected    |
|================================================================|
|                                                                 |
|  [mount-icon] MOUNTS                          1 / 4 Collected  |
|  +------------------------------------------------------------+|
|  | [icon] Desire's Battle Gargon    The Countess         [ ]  ||
|  | [icon] Gruesome Flayedwing       Mograine             [x]  ||
|  | [icon] Pale Acidmaw              Korayn               [ ]  ||
|  | [icon] Dauntless Duskrunner      Mikanikos            [ ]  ||
|  +------------------------------------------------------------+|
|                                                                 |
|  [pet-icon] PETS                              3 / 8 Collected  |
|  +------------------------------------------------------------+|
|  | [icon] Brightscale Hatchling     Sika                 [x]  ||
|  | [icon] Violet Dredwing Pup       Stonehead            [x]  ||
|  | [icon] Pearlwing Heron           Aliothe              [ ]  ||
|  | ... (8 entries)                                             ||
|  +------------------------------------------------------------+|
|                                                                 |
|  [toy-icon] TOYS                              0 / 1 Collected  |
|  +------------------------------------------------------------+|
|  | [icon] The Countess's Parasol    The Countess         [ ]  ||
|  +------------------------------------------------------------+|
|                                                                 |
|  [tmog-icon] TRANSMOG                         8 / 16 Collected |
|  +------------------------------------------------------------+|
|  | [icon] Crypt Keeper's Mantle...  Kassir               [ ]  ||
|  | [icon] Plagueborne Weapons       Marileth             [x]  ||
|  | ... (16 entries)                                            ||
|  +------------------------------------------------------------+|
|                                                                 |
+================================================================+
```

### HTML structure: `renderRewardCollectionSection()`

```html
<section class="ec-section" id="reward-collection-section">
  <div class="ec-section-header">
    <h2 class="ec-section-title">Reward Collection</h2>
    <span class="ec-section-badge">12 / 29 Collected</span>
  </div>

  <!-- Overall progress bar -->
  <div class="reward-progress-bar">
    <div class="reward-progress-fill" style="width: 41%"></div>
  </div>

  <!-- Mount category -->
  <div class="reward-category">
    <div class="reward-category-header">
      <img class="reward-category-icon" src="img/rewards/mount-category.jpg"
           alt="" width="28" height="28">
      <h3 class="reward-category-title">Mounts</h3>
      <span class="reward-category-count">1 / 4</span>
    </div>
    <div class="reward-category-grid">
      <div class="reward-collection-row">
        <img class="reward-row-icon" src="img/rewards/countess-mount.jpg"
             alt="Desire's Battle Gargon" width="32" height="32">
        <span class="reward-collection-name">Desire's Battle Gargon</span>
        <span class="reward-collection-guest faction-venthyr">The Countess</span>
        <button class="reward-collect-btn" data-reward="countess-mount"
                role="checkbox" aria-checked="false"
                aria-label="Mark Desire's Battle Gargon as collected"
                tabindex="0">
          <span class="reward-checkbox"></span>
        </button>
      </div>
      <!-- more mount rows -->
    </div>
  </div>

  <!-- Pet category, Toy category, Transmog category ... -->
</section>
```

### CSS for the collection section

```css
/* Overall progress bar */
.reward-progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-primary);
  border-radius: 4px;
  margin-bottom: var(--space-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.reward-progress-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--accent-red-dark), var(--accent-gold));
  transition: width 0.4s ease-out;
}

/* Category blocks */
.reward-category {
  margin-bottom: var(--space-lg);
  background: linear-gradient(135deg, var(--bg-secondary) 0%, #160e20 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: var(--space-md) var(--space-lg);
}

.reward-category-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}

.reward-category-icon {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  object-fit: cover;
}

.reward-category-title {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent-gold);
  letter-spacing: 0.04em;
  flex: 1;
}

.reward-category-count {
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  padding: 2px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

/* Reward rows in the collection section */
.reward-category-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.reward-collection-row {
  display: grid;
  grid-template-columns: 32px 1fr auto 28px;
  gap: var(--space-sm);
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}
.reward-collection-row:last-child {
  border-bottom: none;
}

.reward-collection-row .reward-row-icon {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  object-fit: cover;
  display: block;
}

.reward-collection-name {
  color: var(--text-primary);
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reward-collection-guest {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  white-space: nowrap;
}

/* Faction coloring on guest name badges */
.reward-collection-guest.faction-venthyr  { color: var(--faction-venthyr); }
.reward-collection-guest.faction-necrolord { color: var(--faction-necrolord); }
.reward-collection-guest.faction-nightfae  { color: var(--faction-nightfae); }
.reward-collection-guest.faction-kyrian    { color: var(--faction-kyrian); }

/* Collected row state */
.reward-collection-row.collected .reward-collection-name {
  color: var(--text-muted);
  text-decoration: line-through;
  text-decoration-color: rgba(154, 142, 176, 0.4);
}

.reward-collection-row.collected .reward-row-icon {
  opacity: 0.35;
  filter: grayscale(50%);
}

.reward-collection-row.collected .reward-collection-guest {
  opacity: 0.5;
}
```

### Responsive behavior

**Tablet (max-width: 1023px):** No changes needed. Grid columns flex naturally.

**Mobile (max-width: 640px):**

```css
@media (max-width: 640px) {
  .reward-collection-row {
    grid-template-columns: 28px 1fr 28px;
    gap: var(--space-xs);
  }
  .reward-collection-row .reward-row-icon {
    width: 28px;
    height: 28px;
  }
  /* Guest name moves below item name on mobile */
  .reward-collection-guest {
    display: none;
  }
  .reward-category {
    padding: var(--space-sm) var(--space-md);
  }
}
```

On mobile, the guest name badge is hidden to save horizontal space. The item name and checkbox are sufficient for the checklist use case. Users who need to know which guest gives a reward can scroll up to the guest cards.

**Very small (max-width: 400px):**

```css
@media (max-width: 400px) {
  .reward-collection-row {
    grid-template-columns: 24px 1fr 24px;
  }
  .reward-collection-row .reward-row-icon {
    width: 24px;
    height: 24px;
  }
  .reward-collection-name {
    font-size: 0.78rem;
  }
}
```

---

## JS Function Signatures

### New functions

```js
/** Returns the img path for a reward's icon */
function getRewardIconPath(reward)
// Returns "img/rewards/transmog.jpg" for transmog, "img/rewards/{id}.jpg" for others.

/** Returns the img path for a category header icon */
function getCategoryIconPath(type)
// Returns "img/rewards/{type}-category.jpg"

/** Renders the reward icon row on a guest card (replaces renderRewardDots) */
function renderRewardIndicators(guest)
// Returns HTML string with <div class="guest-reward-icons"> containing <img> elements.

/** Renders the full Reward Collection section */
function renderRewardCollectionSection()
// Returns HTML string for the <section id="reward-collection-section">.
// Iterates over REWARD_CATEGORIES, groups all guest rewards by type,
// renders each category block with header icon, progress counter, and reward rows.
```

### New constant

```js
const REWARD_CATEGORIES = [
  { key: "mount",    label: "Mounts" },
  { key: "pet",      label: "Pets" },
  { key: "toy",      label: "Toys" },
  { key: "transmog", label: "Transmog" },
];
```

This provides the ordering for the collection section. Mounts first (rarest/most prestigious), transmog last (most common).

### Modified functions

```js
/** renderGuestSection() -- change one line */
// Replace: ${renderRewardDots(guest)}
// With:    ${renderRewardIndicators(guest)}

/** renderRewardPanel() -- replace flex layout with grid layout */
// Use .reward-grid and .reward-row instead of .reward-list and .reward-item
// Add <img class="reward-row-icon"> to each row

/** render() -- add renderRewardCollectionSection() to output array */
// Append after renderResultsSection()

/** bindEvents() -- add collection section checkbox handlers */
// The existing .reward-collect-btn handler already works for both the panel
// and the collection section, since both use the same class and data-reward attribute.
// The guest-reward-icons click handler replaces the guest-rewards-btn handler.
```

### Event binding changes in `bindEvents()`

Replace `.guest-rewards-btn` selector with `.guest-reward-icons`:

```js
// Reward icon row click (open/close panel) -- replaces .guest-rewards-btn binding
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
```

The existing `.reward-collect-btn` binding in `bindEvents()` already uses `querySelectorAll` and will naturally pick up checkboxes in both the per-guest panel AND the new collection section, since both use the same class name and `data-reward` attribute. No duplication needed.

---

## Helper: `getAllRewardsByType(type)`

Returns an array of `{ reward, guest }` objects for all rewards of the given type, sorted by guest slot order:

```js
function getAllRewardsByType(type) {
  const results = [];
  DATA.guests.forEach((guest) => {
    if (!guest.rewards) return;
    guest.rewards.forEach((reward) => {
      if (reward.type === type) {
        results.push({ reward, guest });
      }
    });
  });
  return results;
}
```

This is used by `renderRewardCollectionSection()` to build each category block.

---

## State Management

### No new state variables

The overhaul does not add new state. It reuses:
- `collectedRewards` (Set) -- already exists, persisted to localStorage.
- `expandedRewardGuest` (string|null) -- already exists, ephemeral.

### No persistence changes

`saveState()` and `loadState()` remain unchanged. The collection section reads from the same `collectedRewards` set as the guest card indicators and the per-guest panel.

---

## Computed Values for the Collection Section

These are computed inline during rendering, not cached:

```js
// Total collected / total rewards
const totalRewards = DATA.guests.reduce((sum, g) => sum + (g.rewards ? g.rewards.length : 0), 0);
const totalCollected = DATA.guests.reduce((sum, g) => {
  if (!g.rewards) return sum;
  return sum + g.rewards.filter(r => collectedRewards.has(r.id)).length;
}, 0);

// Per-category counts
const categoryRewards = getAllRewardsByType(category.key);
const categoryCollected = categoryRewards.filter(r => collectedRewards.has(r.reward.id)).length;
```

---

## CSS Cleanup: Remove Old Classes

The following classes from the v1 design are replaced and should be removed:

- `.guest-rewards-btn` -- replaced by `.guest-reward-icons`
- `.rewards-btn-dots` -- no longer used (icons replace dots)
- `.rewards-btn-label` -- no longer used
- `.rewards-btn-icon` -- no longer used
- `.reward-dot` -- no longer used on guest cards; dots are removed entirely in favor of icons. However, `.reward-dot` was also used in the panel; the panel now uses `.reward-row-icon` instead.
- `.reward-list` -- replaced by `.reward-grid`
- `.reward-item` -- replaced by `.reward-row`
- `.reward-type-label` -- replaced by `.reward-row-type`
- `.reward-name` (in reward-item context) -- replaced by `.reward-row-name`

---

## Accessibility

- **Guest card reward icons**: The container `<div class="guest-reward-icons">` has `role="button"`, `tabindex="0"`, and a descriptive `aria-label` ("Rewards for The Countess: 2 uncollected"). Each `<img>` has an `alt` with the reward type and name.
- **Collection section checkboxes**: Same pattern as existing `.reward-collect-btn` -- `role="checkbox"`, `aria-checked`, `aria-label` with reward name.
- **Category progress counters**: Visible text ("1 / 4") and the category title provide sufficient context. No additional ARIA needed.
- **All new icons**: Have `alt` text. Category header icons use `alt=""` (decorative, since the text title is adjacent).
- **Keyboard navigation**: Tab into `.guest-reward-icons`, Enter/Space to toggle panel. Tab through `.reward-collect-btn` checkboxes in both panel and collection section.
- **Reduced motion**: All transitions inherit from the existing `prefers-reduced-motion: reduce` rule.

---

## Full Render Flow (After Overhaul)

```
render()
  |
  +-- renderGuestSection()
  |     |-- For each slot:
  |     |     |-- For each guest card:
  |     |     |     |-- renderRewardIndicators(guest)  <-- CHANGED (was renderRewardDots)
  |     |     |-- If expandedRewardGuest in this slot:
  |     |           |-- renderRewardPanel(guestId)     <-- CHANGED (grid layout, icons)
  |     |
  +-- renderConflictBanner()
  +-- renderSuggestionPanel()
  +-- <hr>
  +-- renderAmenitySection()
  +-- renderOptimizeButton()
  +-- <hr>
  +-- renderResultsSection()
  +-- <hr>
  +-- renderRewardCollectionSection()                   <-- NEW
  |
  +-- bindEvents()
        |-- .guest-reward-icons click/keydown           <-- CHANGED (was .guest-rewards-btn)
        |-- .reward-panel-close click
        |-- .reward-collect-btn click/keydown            (covers both panel + collection section)
        |-- (all existing bindings unchanged)
```

---

## Implementation Checklist

### js/app.js

- [ ] Add `REWARD_CATEGORIES` constant
- [ ] Add `getRewardIconPath(reward)` helper
- [ ] Add `getCategoryIconPath(type)` helper
- [ ] Add `getAllRewardsByType(type)` helper
- [ ] Replace `renderRewardDots(guest)` with `renderRewardIndicators(guest)` -- uses `<img>` icons instead of dots
- [ ] Update `renderRewardPanel(guestId)` -- switch from `<ul>/<li>` flex to `<div>` grid, add reward icons
- [ ] Add `renderRewardCollectionSection()` -- full section with 4 category blocks, progress bar, per-item rows
- [ ] Update `render()` -- add `renderRewardCollectionSection()` with `<hr>` divider after results
- [ ] Update `bindEvents()` -- replace `.guest-rewards-btn` with `.guest-reward-icons` selector
- [ ] Verify existing `.reward-collect-btn` binding covers both panel and collection section checkboxes

### css/styles.css

- [ ] Add `.guest-reward-icons` styles (replaces `.guest-rewards-btn`)
- [ ] Add `.reward-icon` styles (24x24 thumbnail icons on cards)
- [ ] Add `.reward-grid`, `.reward-row`, `.reward-row-icon`, `.reward-row-type`, `.reward-row-name` (panel grid)
- [ ] Add `.reward-progress-bar`, `.reward-progress-fill` (overall progress bar)
- [ ] Add `.reward-category`, `.reward-category-header`, `.reward-category-icon`, `.reward-category-title`, `.reward-category-count` (category blocks)
- [ ] Add `.reward-category-grid`, `.reward-collection-row`, `.reward-collection-name`, `.reward-collection-guest` (collection rows)
- [ ] Add responsive rules for collection section at 640px and 400px
- [ ] Remove old unused classes: `.guest-rewards-btn`, `.rewards-btn-dots`, `.rewards-btn-label`, `.rewards-btn-icon`, `.reward-dot`, `.reward-list`, `.reward-item`, `.reward-type-label`

### Testing

- [ ] Verify all 18 reward icons load correctly (4 mounts, 8 pets, 1 toy, 1 transmog shared, 4 category headers)
- [ ] Verify reward icons display on all 16 guest cards
- [ ] Verify collected state syncs between guest card icons, per-guest panel, and collection section
- [ ] Verify panel grid alignment is consistent across all guests (1-3 rewards per guest)
- [ ] Verify collection section shows correct counts for all 4 categories (4 mounts, 8 pets, 1 toy, 16 transmog = 29 total)
- [ ] Verify collection progress persists across page reloads
- [ ] Verify Reset All does not clear collection progress
- [ ] Test at all 4 responsive breakpoints: >1023px, 640-1023px, 400-640px, <400px
- [ ] Test keyboard navigation through reward icons and collection checkboxes
- [ ] Verify `prefers-reduced-motion` disables all new transitions
