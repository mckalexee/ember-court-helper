# Rarity Colors -- Design

> Feature 008. Created 2026-02-20.

## Problem Statement

Reward item icons currently display with a plain dark border (`--border-color`), giving no visual indication of item quality. In World of Warcraft, every item has a colored border matching its rarity tier (green for Uncommon, blue for Rare, purple for Epic, etc.). Additionally, transmog/appearance items display pink corner indicators on the upper-right and bottom-left. Without these visual cues, the reward display feels disconnected from the in-game experience.

## Design

### 1. Rarity Color System

WoW canonical item quality colors, added as CSS custom properties:

| Quality | Hex | Items |
|---------|-----|-------|
| Poor | `#9d9d9d` | (not used currently) |
| Common | `#ffffff` | (not used currently) |
| Uncommon | `#1eff00` | All 8 pets, 6 transmog weapons |
| Rare | `#0070dd` | 1 toy, 12 transmog weapons |
| Epic | `#a335ee` | All 4 mounts, 13 transmog (cloaks, shoulders, weapons) |
| Legendary | `#ff8000` | (not used currently) |

**Important:** Rarity is per-item, not per-type. Transmog items have mixed rarities (uncommon, rare, and epic). Each reward object in `data.js` has a `rarity` field sourced from Wowhead.

### 2. Per-Item Rarity Data

Each reward object in `data.js` gets a `rarity` field:
```js
{ id: "kassir-cloak", type: "transmog", name: "Kassir's Crypt Mantle", rarity: "epic", ... }
{ id: "kassir-staff", type: "transmog", name: "Crypt Watcher's Spire", rarity: "rare", ... }
```

All 44 items verified against Wowhead:
- 4 mounts: all epic
- 8 pets: all uncommon
- 1 toy: rare
- 31 transmog: 13 epic, 12 rare, 6 uncommon

### 3. Rarity Border

All reward icons (guest card thumbnails, reward panel icons, collection section icons) get a 2px border colored by rarity tier, replacing the default `--border-color`.

Each `<img>` is wrapped in a `<span class="reward-icon-wrap rarity-{rarity}">`. High-specificity CSS selectors override the img's `border-color`:

```css
.reward-icon-wrap.rarity-uncommon > img { border-color: var(--rarity-uncommon); }
.reward-icon-wrap.rarity-rare > img { border-color: var(--rarity-rare); }
.reward-icon-wrap.rarity-epic > img { border-color: var(--rarity-epic); }
```

The `.reward-icon-wrap.rarity-X > img` selector (specificity 0,2,1) must beat contextual selectors like `.reward-collection-row .reward-row-icon` (specificity 0,2,0).

Category header icons (Mounts, Pets, etc. section labels) do NOT get rarity borders since they represent categories, not individual items.

### 4. Transmog Corner Indicators

Transmog items get pink L-shaped border overlays at the upper-right and bottom-left corners, resembling the in-game transmog appearance UI where a quarter of the border is pink.

Color: `--transmog-corner: #ff80c0` (hot pink).

Implementation: `::before` and `::after` pseudo-elements on `.reward-icon-wrap.type-transmog`, sized to 45% of the icon and using border edges:

```css
.reward-icon-wrap.type-transmog::before {
  top: 0; right: 0;
  width: 45%; height: 45%;
  border-top: 2px solid var(--transmog-corner);
  border-right: 2px solid var(--transmog-corner);
}
.reward-icon-wrap.type-transmog::after {
  bottom: 0; left: 0;
  width: 45%; height: 45%;
  border-bottom: 2px solid var(--transmog-corner);
  border-left: 2px solid var(--transmog-corner);
}
```

This creates L-shaped border segments that overlay the rarity border at the corners, covering approximately 45% of each adjacent edge. The wrapper has `overflow: hidden; border-radius: 4px;` so the indicators clip to the icon's rounded shape.

### 5. Collected State

When items are marked as collected:
- Icon already gets `opacity: 0.35; filter: grayscale(50%);`
- Transmog corner pseudo-elements also dim to `opacity: 0.35`
- Rarity border dims with the icon (inherited from img opacity)

### 6. Responsive

At 400px breakpoint, transmog corner indicators shrink to 40% width/height.

## Implementation Notes

### `js/data.js`
1. Add `rarity` field to all 44 reward objects (verified from Wowhead).

### `js/app.js`
1. Add `rewardIconWrap(reward, collected, innerHtml)` helper that wraps an img in a rarity-typed span using `reward.rarity`.
2. Update `renderRewardIndicators()`, `renderRewardPanel()`, `renderRewardCollectionSection()` to wrap icons.
3. Category header icons left unwrapped (not individual items).

### `css/styles.css`
1. Add 7 rarity + transmog color variables to `:root`.
2. Increase icon border from 1px to 2px on `.reward-icon`, `.reward-row-icon`, `.reward-collection-row .reward-row-icon`.
3. Add `.reward-icon-wrap` wrapper styles with `overflow: hidden; border-radius: 4px`.
4. Add rarity border color overrides with sufficient specificity.
5. Add transmog L-shaped corner pseudo-elements.
6. Add collected state dimming for corners.
7. Responsive override at 400px breakpoint.
