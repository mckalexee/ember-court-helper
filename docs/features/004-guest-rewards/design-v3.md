# Guest Rewards v3 -- Individual Items, Wowhead Links, Requirements

> Feature 004, revision 3. Created 2026-02-20.
> Supersedes design-v2.md. Adds individual transmog items, Wowhead URLs, and friendship requirements.

## Problem

The v2 reward data used generic category names like "Ardenweald Weapons" and "Kyrian Weapons" for transmog entries. These are not real items -- they are invented shorthand for groups of 3--21 individual weapon appearances. Users also had no way to know:

1. **What each item actually is** (name, Wowhead page)
2. **What's required to earn it** (friendship level, happiness threshold)
3. **Where to look it up** (no links to Wowhead)

## Design Decisions

### 1. Individual Transmog Items

Replace each generic "Faction Weapons" entry with 1--3 specific items per guest:

- **Unique items** (only drop from one guest) are always included
- **Shared faction weapons** (drop from any guest of the same covenant) are included only when a guest has no unique items
- **Cosmetic cloaks** (Kassir, Stonehead) are listed as separate transmog entries
- **Adrestes' shoulder** (Stalwart Pauldron of Resolve) is included as a unique transmog item

This increases total rewards from 29 to 44, while keeping the UI manageable.

### 2. Wowhead URLs

Every reward gets a `wowheadUrl` field linking to `https://www.wowhead.com/item=ITEMID`.

- Reward names render as clickable Wowhead links (opens new tab)
- External link indicator (arrow glyph) appended to name
- Links are styled to match the theme (gold on hover)

### 3. Friendship Requirements

Every reward gets a `requirement` field:

- `"Any"` -- available from Stranger onward (any tribute level); **not displayed** in the UI to reduce noise
- `"Good Friend"` -- requires Good Friend friendship level
- `"Best Friend"` -- requires Best Friend friendship level

Requirements appear as small gold-tinted tags next to the type label (in the reward panel) or as a dedicated column (in the collection section).

### 4. Icon Strategy

All transmog items (including cloaks and weapons) continue to use `img/rewards/transmog.jpg` (generic sword icon). Individual weapon icons could be downloaded later but are not necessary for this iteration. Mount, pet, and toy icons remain unchanged.

## Data Model Changes

### Reward Object (in `data.js`)

```js
{
  id: "kassir-cloak",
  type: "transmog",          // unchanged: mount | pet | toy | transmog
  name: "Kassir's Crypt Mantle",  // actual item name
  wowheadUrl: "https://www.wowhead.com/item=183713",  // NEW
  requirement: "Good Friend"  // NEW: "Any" | "Good Friend" | "Best Friend"
}
```

### Reward Count by Type

| Type | v2 Count | v3 Count |
|------|----------|----------|
| Mount | 4 | 4 |
| Pet | 8 | 8 |
| Toy | 1 | 1 |
| Transmog | 16 | 31 |
| **Total** | **29** | **44** |

## UI Changes

### Reward Panel (guest card expandable)

- **Name column**: rendered as `<a>` linking to Wowhead (with &#x2197; arrow)
- **Type column**: shows requirement tag below type label when not "Any"
- Grid stays 4 columns: `28px 72px 1fr 28px`

### Reward Collection Section (bottom of page)

- **Name column**: rendered as `<a>` linking to Wowhead
- **Requirement column**: new 5th column for the requirement tag
- Grid: `32px 1fr auto auto 28px` (icon, name, guest, requirement, checkbox)
- At 640px: guest hidden, falls to 4 columns
- At 400px: guest hidden, 4 columns with smaller icons

### New CSS Classes

- `.reward-wowhead-link` -- styled link on reward names (gold on hover)
- `.reward-requirement` -- small pill tag for friendship level requirement

## Responsive Behavior

| Breakpoint | Collection Row Grid |
|------------|-------------------|
| Desktop | `32px 1fr auto auto 28px` |
| 640px | `28px 1fr auto 28px` (guest hidden) |
| 400px | `24px 1fr auto 24px` (guest hidden) |
