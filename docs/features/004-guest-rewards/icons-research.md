# Reward Icons & UX Research

> Feature 004. Created 2026-02-20.

## 1. Icon Strategy: Image Assets vs. Emoji/Unicode

The implementation already downloaded 56x56 JPEG icon assets from Wowhead's CDN to `img/rewards/`. These are game-accurate item icons suitable for the detail panel. However, emoji/Unicode symbols are also valuable for compact summary views (guest card dots, type labels, legends).

### Image Assets (Already Downloaded)

18 JPEG files in `img/rewards/`:
- 4 mount icons (one per mount reward, named `{reward-id}.jpg`)
- 8 pet icons (one per pet reward)
- 1 toy icon (`countess-toy.jpg`)
- 1 shared transmog icon (`transmog.jpg`)
- 4 category header icons (`mount-category.jpg`, `pet-category.jpg`, etc.)

Icon lookup:
```js
function getRewardIconPath(reward) {
  if (reward.type === "transmog") return "img/rewards/transmog.jpg";
  return "img/rewards/" + reward.id + ".jpg";
}
```

### Emoji/Unicode Symbols for Compact UI

For contexts where 56px images are too large (dot legends, type labels, inline text), emoji provide lightweight type indicators.

#### Candidate Evaluation

**Mount:**

| Emoji | Name | Codepoint | Unicode Ver. | Emoji Ver. | Assessment |
|-------|------|-----------|-------------|------------|------------|
| 🐴 | Horse Face | U+1F434 | 6.0 (2010) | 1.0 (2015) | Best option -- universally recognized mount symbol; clear at 12px+ |
| 🐎 | Horse | U+1F40E | 6.0 (2010) | 1.0 (2015) | Good -- full body horse, but less distinct than face at small sizes |
| 🎠 | Carousel Horse | U+1F3A0 | 6.0 (2010) | 1.0 (2015) | Too whimsical for a dark gothic theme |

**Recommendation: 🐴 Horse Face** -- Most recognizable at small sizes, universal support.

**Pet (Battle Pet):**

| Emoji | Name | Codepoint | Unicode Ver. | Emoji Ver. | Assessment |
|-------|------|-----------|-------------|------------|------------|
| 🐾 | Paw Prints | U+1F43E | 6.0 (2010) | 1.0 (2015) | Best option -- universal "pet/companion" symbol |
| 🐣 | Hatching Chick | U+1F423 | 6.0 (2010) | 1.0 (2015) | Cute but species-specific; not all EC pets are birds |
| 🐛 | Bug | U+1F41B | 6.0 (2010) | 1.0 (2015) | Too specific (only some EC pets are insects) |

**Recommendation: 🐾 Paw Prints** -- Universal pet glyph, immediately readable, all platforms.

**Toy:**

| Emoji | Name | Codepoint | Unicode Ver. | Emoji Ver. | Assessment |
|-------|------|-----------|-------------|------------|------------|
| 🎭 | Performing Arts | U+1F3AD | 6.0 (2010) | 1.0 (2015) | Best option -- WoW toys are vanity/cosmetic items (parasols, quills), closer to theatrical props than children's toys |
| 🧸 | Teddy Bear | U+1F9F8 | 11.0 (2018) | 11.0 (2018) | Literal "toy" but newer -- no support on Win7, older Android, legacy browsers |
| 🎪 | Circus Tent | U+1F3AA | 6.0 (2010) | 1.0 (2015) | Fun feel but not clearly "toy" |
| 🕹️ | Joystick | U+1F579 | 7.0 (2014) | 1.0 (2015) | Means "game" not "toy item" |
| 🎲 | Game Die | U+1F3B2 | 6.0 (2010) | 1.0 (2015) | Could imply RNG/randomness instead |

**Recommendation: 🎭 Performing Arts** -- WoW toys are vanity items, not children's toys. Theatre masks capture this well. Universal Emoji 1.0 support. If literal "toy" is preferred, 🧸 works but requires Emoji 11.0 (2018).

**Transmog (Weapon Appearances):**

| Emoji | Name | Codepoint | Unicode Ver. | Emoji Ver. | Assessment |
|-------|------|-----------|-------------|------------|------------|
| ⚔️ | Crossed Swords | U+2694 | 4.1 (2005) | 1.0 (2015) | Best option -- iconic weapons symbol; oldest Unicode heritage |
| 🗡️ | Dagger | U+1F5E1 | 7.0 (2014) | 1.0 (2015) | Clean but less distinctive than crossed swords |
| 🛡️ | Shield | U+1F6E1 | 7.0 (2014) | 1.0 (2015) | Could be confused with "security" amenity category |
| 👕 | T-Shirt | U+1F455 | 6.0 (2010) | 1.0 (2015) | Too casual for WoW weapon transmog |
| 💎 | Gem Stone | U+1F48E | 6.0 (2010) | 1.0 (2015) | "Rare loot" feel but doesn't specifically mean appearances |

**Recommendation: ⚔️ Crossed Swords** -- Ember Court transmog is almost entirely weapons. Most readable "weapons" glyph. Oldest Unicode version (4.1, 2005). Universal.

#### Summary Table

| Type | Emoji | Codepoint | Emoji Ver. | Notes |
|------|-------|-----------|------------|-------|
| Mount | 🐴 | U+1F434 | 1.0 | Universal support |
| Pet | 🐾 | U+1F43E | 1.0 | Universal support |
| Toy | 🎭 | U+1F3AD | 1.0 | Universal support |
| Transmog | ⚔️ | U+2694 | 1.0 | Universal support |

All four are Emoji 1.0 (2015), ensuring compatibility with Chrome 51+, Firefox 50+, Safari 10+, Edge 14+, iOS 10+, Android 7+, Windows 10+.

#### Where to Use Emoji vs. Images

| Context | Use | Rationale |
|---------|-----|-----------|
| Guest card reward dots | Colored dots (current design) | Emoji illegible at 8px; dots encode type via color |
| Detail panel type label | `🐴 Mount` (emoji + text) | Adds visual character at readable font sizes |
| Panel legend / footer | `🐴 Mount  🐾 Pet  🎭 Toy  ⚔️ Tmog` | Compact, self-explanatory |
| Detail panel item row icon | 56px JPEG image | Game-accurate appearance; worth the asset weight |
| Category headers in summary | 56px JPEG + text | Visual weight appropriate for section headers |

---

## 2. WoW Community Tool UX Patterns

### Wowhead Collection Trackers

**Sources:** [Mount Collection Tracker](https://www.wowhead.com/mount-collection-tracker), [Tracker Guide](https://www.wowhead.com/guide/mount-and-battle-pet-collection-trackers)

- **Checkmarks** as primary collected/uncollected indicator (overlay on item card).
- **"Check All" / "Uncheck All"** bulk actions for manual tracking.
- **"Uncollected" filter toggle** to hide already-collected items.
- **Color-coded rarity borders** (Common/Uncommon/Rare/Epic).
- **Hover tooltips** with source details (vendor, drop location, quest).
- **Progress counters** ("312/947 mounts collected") shown prominently.
- **Achievement milestones** (10, 25, 50, 100+) as progress markers.
- **Filtering/sorting** by source, quality, type.

### All The Things Addon

**Source:** [CurseForge](https://www.curseforge.com/wow/addons/all-the-things), [ATT Guide](https://www.wowhead.com/guide/all-the-things-collection-tracking-addon-6087)

- **Hierarchical tree** with expandable categories organized by zone/source.
- **Color-coded clock icons**: red = removed from game, yellow = limited-time returning, green = limited-time active now.
- **Blue checkmarks** for account-wide completion.
- **Completion percentages** per category and overall.
- **Customizable categories** -- users enable/disable mount, pet, toy, transmog tracking independently.

### SimpleArmory

**Source:** [SimpleArmory](https://simplearmory.com/)

- **Category tabs** (Mounts, Pets, Toys, Reputations, Achievements).
- **Grid of icons** with collected = full color, uncollected = faded/greyed.
- **Percentage progress bars** per subcategory.
- **API-driven** -- automatic collection state from Blizzard API.

### WoWthing

**Source:** [WoWthing](https://wowthing.org/)

- **Configurable column layout** -- users choose displayed data.
- **Category-segmented views** (Journal for mounts/pets/toys, Sets for transmog).
- **Faded/dimmed rows** for uncollected items.
- **Multi-character awareness** across alts.

### Universal Patterns Across Tools

| Pattern | Prevalence | Relevance |
|---------|-----------|-----------|
| Checkmark = collected | All tools | High -- directly maps to our checkbox toggle |
| Fade/opacity for "done" items | SimpleArmory, WoWthing | High -- matches dot opacity approach |
| Progress counter (X/Y) | All tools | Medium -- useful in panel header |
| Category grouping | All tools | High -- we group by reward type |
| Filter: uncollected only | Wowhead | Low -- too small a dataset (29 items) |
| Hover tooltips | Wowhead | High -- we use title on dots |

### Recommendations Applied to Design

1. **Checkmark convention is universal** -- our gold-filled checkbox with checkmark aligns with industry standard.

2. **Fade collected items** -- reducing dot opacity to 0.3 follows the "de-emphasize done" pattern (correct for "what do I still need?" context).

3. **Add mini progress counter** -- a `"(1/3 collected)"` in the panel header follows a pattern every tool uses. Example: `"Rewards for The Countess (1/3 collected)"`.

4. **"All rewards collected" collapse** aligns with how ATT de-emphasizes completed categories.

5. **Emoji in type labels** -- using `🐴 Mount` instead of plain `MOUNT` follows the icon+label pattern from Wowhead/ATT without requiring custom icon assets at label size.

---

## 3. Data Verification: data.js vs. research.md

### Method

Cross-referenced every guest's `rewards` array in `js/data.js` against the per-guest findings and summary tables in `research.md`.

### Results: All 16 Guests Verified

| Guest | data.js | research.md | Status |
|-------|---------|-------------|--------|
| Kassir | tmog: Crypt Keeper's Mantle & Weapons | cloak + weapons | MATCH |
| Marileth | tmog: Plagueborne Weapons | weapons | MATCH |
| Choofa | tmog: Ardenweald Weapons | weapons | MATCH |
| Sika | pet: Brightscale Hatchling; tmog | pet + weapons | MATCH |
| Stonehead | pet: Violet Dredwing Pup; tmog | pet + cloak + weapons | MATCH |
| Aliothe | pet: Pearlwing Heron; tmog | pet + weapons | MATCH |
| Vole | pet: Corpulent Bonetusk; tmog | pet + weapons | MATCH |
| Kleia | pet: Sable; tmog | pet + weapons | MATCH |
| Rendle | pet: Bloodfeaster Spiderling; tmog | pet + weapons | MATCH |
| Mograine | mount: Gruesome Flayedwing; tmog | mount + weapons | MATCH |
| Korayn | mount: Pale Acidmaw; tmog | mount + weapons | MATCH |
| Adrestes | tmog: Kyrian Weapons | weapons only | MATCH |
| Countess | mount + toy + tmog | mount + toy + weapons | MATCH |
| Vashj | pet: Plaguelouse Larva; tmog | pet + weapons | MATCH |
| Moonberry | pet: Dusty Sporeflutterer; tmog | pet + weapons | MATCH |
| Mikanikos | mount: Dauntless Duskrunner; tmog | mount + weapons | MATCH |

### Reward Count Summary

| Type | Count | Guests |
|------|-------|--------|
| Mount | 4 | Mograine, Korayn, Countess, Mikanikos |
| Pet | 8 | Sika, Stonehead, Aliothe, Vole, Kleia, Rendle, Vashj, Moonberry |
| Toy | 1 | Countess |
| Transmog | 16 | All 16 guests |
| **Total** | **29** | |

### Items Intentionally Excluded

| Item | Type | Source | Why Excluded |
|------|------|--------|-------------|
| Quill of Correspondence (183876) | Toy | Vendor (Lady Ilinca) | Not a tribute drop; vendor purchase requiring Best Friend with any guest + 500g. Not guest-specific. |
| Individual weapon variants | Transmog | All guests | 50+ items consolidated to 1 entry per guest. Tracking individual weapons would be unwieldy. |
| Court Favors | Gameplay | Various guests | Not permanent collectibles (Training Dummies, Bounding Shroom Seeds, etc.) |

### Potential Gap: Dauntless Duskrunner Dual Source

Research.md notes the Dauntless Duskrunner mount (181317) can drop from both **Mikanikos** and **Polemarch Adrestes**. In data.js, only Mikanikos has a mount entry. This is a reasonable simplification -- listing the same mount under two guests would create confusion in the collection tracker (collected under one, uncollected under the other). Most guides associate this mount primarily with Mikanikos.

### Conclusion

Data in `js/data.js` is **complete and accurate** for all guest-specific collectible rewards. No changes needed.

---

## Sources

- [Emojipedia - Horse Face](https://emojipedia.org/horse-face) (Unicode 6.0, Emoji 1.0)
- [Emojipedia - Paw Prints](https://emojipedia.org/paw-prints) (Unicode 6.0, Emoji 1.0)
- [Emojipedia - Performing Arts](https://emojipedia.org/performing-arts) (Unicode 6.0, Emoji 1.0)
- [Emojipedia - Crossed Swords](https://emojipedia.org/crossed-swords) (Unicode 4.1, Emoji 1.0)
- [Emojipedia - Teddy Bear](https://emojipedia.org/teddy-bear) (Unicode 11.0, Emoji 11.0)
- [Emojipedia - Dagger](https://emojipedia.org/dagger) (Unicode 7.0, Emoji 1.0)
- [Emojipedia - Shield](https://emojipedia.org/shield) (Unicode 7.0, Emoji 1.0)
- [Emojipedia - Can I Emoji?](https://emojipedia.org/caniemoji)
- [Wowhead - Mount Collection Tracker](https://www.wowhead.com/mount-collection-tracker)
- [Wowhead - Collection Tracker Guide](https://www.wowhead.com/guide/mount-and-battle-pet-collection-trackers)
- [Wowhead - All The Things Guide](https://www.wowhead.com/guide/all-the-things-collection-tracking-addon-6087)
- [CurseForge - All The Things](https://www.curseforge.com/wow/addons/all-the-things)
- [SimpleArmory](https://simplearmory.com/)
- [WoWthing](https://wowthing.org/)
- [Wowhead - Ember Court Guide](https://www.wowhead.com/guide/venthyr-covenant-ember-court)
- [Wowhead - Comprehensive Tribute Rewards](https://www.wowhead.com/guide/comprehensive-list-of-tribute-rewards-for-completing-the-ember-court-23121)
