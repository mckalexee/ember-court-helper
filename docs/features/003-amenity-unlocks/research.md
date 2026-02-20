# Amenity Unlocks -- Research

> Feature 003. Created 2026-02-19.

## Questions to Answer

- What unlocks each of the 12 amenities?
- Is there a progression tier system?
- What Wowhead URLs are relevant?

## Findings

### Important Note: Amenity Names

The feature request referenced amenity names (e.g., "Casual Ceremony", "Appetizing Platter", "Luxurious Linens") that do not match the actual in-game names. The calculator's `data.js` already uses the correct in-game names. All research below uses the canonical in-game names as they appear in `data.js`.

### Ember Court Progression Overview

The Ember Court uses a multi-layered unlock system:

1. **Sanctum Upgrade Tiers** -- The Ember Court feature itself must be unlocked and upgraded through the Venthyr Covenant Sanctum using Reservoir Anima and Redeemed Souls. Each tier expands guest capacity.
2. **Reputation Levels** -- The Ember Court is also a reputation faction (Friendly, Honored, Revered, Exalted). Earning reputation unlocks the ability to purchase buildings and staff from the NPC vendor Temel.
3. **Buildings** -- Two buildings (Dredger Pool and Guardhouse) must be purchased from Temel to unlock the Decoration and Security amenity categories respectively.
4. **Staff** -- Four staff upgrades (Stage Crew, Waiters, Dredger Decorators, Bouncers) must be purchased from Temel to unlock the third (premium) amenity in each category.
5. **Contracts (Quests)** -- Each individual amenity requires completing a specific quest that awards a "Contract" item. The quest becomes available only after the prerequisite building/staff has been obtained (if applicable).

### Sanctum Upgrade Tiers

The Ember Court must be unlocked via the Venthyr Sanctum Reservoir. There are 5 upgrade ranks:

| Rank | Name | Cost | Build Time | Unlocks |
|------|------|------|------------|---------|
| 1 | A New Court | 1,000 Reservoir Anima + 1 Redeemed Soul | 1 hour | Basic court; 2 guest slots; Entertainment + Refreshment categories |
| 2 | Homegrown Help | 5,000 Reservoir Anima + 8 Redeemed Souls | 12 hours | Dredger butler assistant |
| 3 | Court Influencer | 10,000 Reservoir Anima + 22 Redeemed Souls | 24 hours | Third guest slot |
| 4 | Discerning Taste | 12,000 Reservoir Anima + 40 Redeemed Souls | 24 hours | Fourth guest slot |
| 5 | The Professionals | 15,000 Reservoir Anima + 40 Redeemed Souls | 24 hours | Five specialist staff members |

Note: Sources disagree slightly on exact costs (e.g., Rank 1 listed as 1,000 or 1,500 Anima in different sources; Rank 2 as 8 or 12 Souls). The values above are from Warcraft Wiki (warcraft.wiki.gg).

### Reputation-Gated Purchases from Temel

Temel is the primary vendor NPC for Ember Court upgrades. Buildings and staff are purchased from him at specific reputation thresholds.

#### Buildings

Buildings unlock entirely new amenity categories (Decorations and Security are not available at the start).

| Item | Cost | Reputation Required | What It Unlocks |
|------|------|---------------------|-----------------|
| Building: Dredger Pool | 100 Reservoir Anima | Friendly | Decoration category (NPC: Boot the Beaut) |
| Building: Guardhouse | 100 Reservoir Anima | Honored | Security category (NPC: Watchmaster Boromod) |

#### Staff

Staff purchases unlock the third amenity option within each category. Each costs 2,500 gold (displayed as 2,500,000 copper on Wowhead).

| Item | Cost | Reputation Required | What It Unlocks |
|------|------|---------------------|-----------------|
| Staff: Stage Crew | 2,500 gold | Honored | Lost Chalice Band (Entertainment, 3rd option) |
| Staff: Waiters | 2,500 gold | Honored | Mushroom Surprise (Refreshment, 3rd option) |
| Staff: Dredger Decorators | 2,500 gold | Revered | Mystery Mirrors (Decoration, 3rd option) |
| Staff: Bouncers | 2,500 gold | Revered | Maldraxxian Army (Security, 3rd option) |

### Amenity Tier System

Each amenity category has exactly 3 options that follow a tiered unlock pattern:

- **Tier 1 (Default/First)**: Available immediately once the category is accessible. Requires only the unlock quest.
- **Tier 2 (Second)**: Available once the category is accessible. Requires only the unlock quest.
- **Tier 3 (Premium/Staff-gated)**: Requires purchasing the corresponding Staff upgrade from Temel (reputation-gated), then completing the unlock quest.

For Entertainment and Refreshments, the category itself is available from the start (Rank 1 Sanctum). For Decorations, you need Building: Dredger Pool first (Friendly reputation). For Security, you need Building: Guardhouse first (Honored reputation).

### NPC Managers by Category

| Category | NPC Manager | Available From |
|----------|-------------|----------------|
| Entertainment | Hips | Sanctum Rank 1 (start) |
| Refreshment | Picky Stefan | Sanctum Rank 1 (start) |
| Decoration | Boot the Beaut | After purchasing Building: Dredger Pool (Friendly) |
| Security | Watchmaster Boromod | After purchasing Building: Guardhouse (Honored) |

### Contract Unlock Quests

Each amenity is unlocked by completing a specific quest that rewards a "Contract" item. The quest typically involves traveling to a Shadowlands zone to gather items or complete objectives.

#### Entertainment Quests

| Amenity | Quest Name | Quest ID | Prerequisite |
|---------|-----------|----------|--------------|
| Atoning Rituals | Ember Court: Atoning Rituals | 61407 | None (available from start) |
| Glimpse of the Wilds | Ember Court: Glimpse of the Wilds | 61408 | None (available from start) |
| Lost Chalice Band | Ember Court: Lost Chalice Band | 61738 | Staff: Stage Crew (Honored) |

#### Refreshment Quests

| Amenity | Quest Name | Quest ID | Prerequisite |
|---------|-----------|----------|--------------|
| Tubbin's Tea Party | Ember Court: Tubbins's Tea Party | 61404 | None (available from start) |
| Divine Desserts | Ember Court: Divine Desserts | 61405 | None (available from start) |
| Mushroom Surprise | Ember Court: Mushroom Surprise! | 61406 | Staff: Waiters (Honored) |

#### Decoration Quests

| Amenity | Quest Name | Quest ID | Prerequisite |
|---------|-----------|----------|--------------|
| Traditional | Ember Court: Traditional | 61398 | Building: Dredger Pool (Friendly) |
| Mortal Reminders | Ember Court: Mortal Reminders | 61399 | Building: Dredger Pool (Friendly) |
| Mystery Mirrors | Ember Court: Mystery Mirrors | 61400 | Building: Dredger Pool (Friendly) + Staff: Dredger Decorators (Revered) |

#### Security Quests

| Amenity | Quest Name | Quest ID | Prerequisite |
|---------|-----------|----------|--------------|
| Venthyr Volunteers | Ember Court: Venthyr Volunteers | 61401 | Building: Guardhouse (Honored) |
| Stoneborn Reserves | Ember Court: Stoneborn Reserves | 61402* | Building: Guardhouse (Honored) |
| Maldraxxian Army | Ember Court: Maldraxxus Army | 61403 | Building: Guardhouse (Honored) + Staff: Bouncers (Revered) |

*Note: Quest ID 61402 for Stoneborn Reserves is inferred from the sequential pattern (61398-61408) but was not directly confirmed in sources. The Wowhead URL may differ.

### Party Palace Achievement

The "Party Palace" achievement (added in Patch 9.0.2) requires unlocking all buildings, staff, stock items, and other upgrades. Its criteria include:

- Building: Dredger Pool
- Building: Guardhouse
- Staff: Stage Crew
- Staff: Waiters
- Staff: Dredger Decorators
- Staff: Bouncers
- Stock: Appetizers
- Stock: Greeting Kits
- Stock: Comfy Chairs
- Stock: Water Buckets
- Staff: Ambassador
- Various Guest List Pages and other items

### Stock Items (Not Amenities)

"Stock" items are separate from amenities -- they are permanent quality-of-life upgrades to the Ember Court event rather than atmosphere-affecting selections:

| Item | Effect | Source |
|------|--------|--------|
| Stock: Appetizers | +2 minutes to Court time limit | Quest: Small Bites |
| Stock: Greeting Kits | +2 minutes to Preparation time limit | Quest: Undercover Security |
| Stock: Comfy Chairs | +5 minutes to Court time limit | Unknown |
| Stock: Water Buckets (Anima-Infused Water) | Adds water buckets to extinguish fires from Traditional decoration | Guest friendship reward (Sika) |

### Atmosphere Adjusters (Not Amenities)

In addition to the 4 amenity categories, there are also "atmosphere adjuster" NPCs available during the event that can fine-tune specific dimensions:

| NPC | Location | Adjusts |
|-----|----------|---------|
| Crooked Crick | Refreshments area | Decadence |
| Lady Ilinca | Embassy area | Formality |
| Cosmin the Illusionist | Stage | Excitement |
| Wing Commander Vulpek | Front gates | Danger |

These are interactive NPCs during the Ember Court scenario, not pre-event selections.

## Data Tables

### Complete Amenity Unlock Requirements

| ID (data.js) | Name | Category | Effects | Min. Reputation | Building Required | Staff Required | Quest Name | Quest ID |
|--------------|------|----------|---------|-----------------|-------------------|----------------|------------|----------|
| `atoning` | Atoning Rituals | Entertainment | Humble, Formal | None | None | None | Ember Court: Atoning Rituals | 61407 |
| `wilds` | Glimpse of the Wilds | Entertainment | Clean, Safe | None | None | None | Ember Court: Glimpse of the Wilds | 61408 |
| `band` | Lost Chalice Band | Entertainment | Decadent, Exciting | Honored | None | Stage Crew | Ember Court: Lost Chalice Band | 61738 |
| `tea` | Tubbin's Tea Party | Refreshment | Relaxing, Formal | None | None | None | Ember Court: Tubbins's Tea Party | 61404 |
| `desserts` | Divine Desserts | Refreshment | Messy, Decadent | None | None | None | Ember Court: Divine Desserts | 61405 |
| `mushroom` | Mushroom Surprise | Refreshment | Dangerous, Humble | Honored | None | Waiters | Ember Court: Mushroom Surprise! | 61406 |
| `traditional` | Traditional | Decoration | Clean, Dangerous | Friendly | Dredger Pool | None | Ember Court: Traditional | 61398 |
| `mortal` | Mortal Reminders | Decoration | Relaxing, Casual | Friendly | Dredger Pool | None | Ember Court: Mortal Reminders | 61399 |
| `mirrors` | Mystery Mirrors | Decoration | Safe, Exciting | Revered | Dredger Pool | Dredger Decorators | Ember Court: Mystery Mirrors | 61400 |
| `venthyr` | Venthyr Volunteers | Security | Dangerous, Exciting | Honored | Guardhouse | None | Ember Court: Venthyr Volunteers | 61401 |
| `stoneborn` | Stoneborn Reserves | Security | Safe, Decadent | Honored | Guardhouse | None | Ember Court: Stoneborn Reserves | ~61402 |
| `maldraxxian` | Maldraxxian Army | Security | Messy, Casual | Revered | Guardhouse | Bouncers | Ember Court: Maldraxxus Army | 61403 |

### Unlock Progression Summary

A player starting from scratch would unlock amenities in roughly this order:

1. **Sanctum Rank 1** -- Unlocks Ember Court. Entertainment and Refreshment categories available.
2. **Complete initial quests** -- Unlock Atoning Rituals, Glimpse of the Wilds, Tubbin's Tea Party, Divine Desserts (4 amenities).
3. **Reach Friendly reputation** -- Buy Building: Dredger Pool (100 Anima). Decoration category unlocks.
4. **Complete decoration quests** -- Unlock Traditional, Mortal Reminders (2 amenities).
5. **Reach Honored reputation** -- Buy Building: Guardhouse (100 Anima). Security category unlocks. Also can buy Staff: Stage Crew and Staff: Waiters (2,500g each).
6. **Complete security quests** -- Unlock Venthyr Volunteers, Stoneborn Reserves (2 amenities).
7. **Complete staff-gated quests** -- Unlock Lost Chalice Band, Mushroom Surprise (2 amenities).
8. **Reach Revered reputation** -- Buy Staff: Dredger Decorators and Staff: Bouncers (2,500g each).
9. **Complete premium quests** -- Unlock Mystery Mirrors, Maldraxxian Army (2 amenities).

Total: 12 amenities unlocked progressively over the Ember Court reputation grind.

## Sources

- [Ember Court - Wowhead Guide (main)](https://www.wowhead.com/guide/venthyr-covenant-ember-court)
- [Ember Court Strategy Guide - Wowhead](https://www.wowhead.com/guide/venthyr-ember-court-strategy-increase-happiness-guests)
- [Ember Court - Warcraft Wiki (warcraft.wiki.gg)](https://warcraft.wiki.gg/wiki/Ember_Court)
- [Ember Court - Wowpedia (fandom)](https://wowpedia.fandom.com/wiki/Ember_Court)
- [The Ember Court - Icy Veins](https://www.icy-veins.com/wow/the-ember-court-venthyr-weekly-activity)
- [Helpful Guide to the Ember Court - EU Blizzard Forums](https://eu.forums.blizzard.com/en/wow/t/hopefully-helpfull-guide-to-the-ember-court/239635)
- [The Ember Court - Reputation Faction (Wowhead)](https://www.wowhead.com/faction=2445/the-ember-court)
- **Wowhead Quest Pages:**
  - [Ember Court: Atoning Rituals (Quest 61407)](https://www.wowhead.com/quest=61407/ember-court-atoning-rituals)
  - [Ember Court: Glimpse of the Wilds (Quest 61408)](https://www.wowhead.com/quest=61408/ember-court-glimpse-of-the-wilds)
  - [Ember Court: Lost Chalice Band (Quest 61738)](https://www.wowhead.com/quest=61738/ember-court-lost-chalice-band)
  - [Ember Court: Tubbins's Tea Party (Quest 61404)](https://www.wowhead.com/quest=61404/ember-court-tubbinss-tea-party)
  - [Ember Court: Divine Desserts (Quest 61405)](https://www.wowhead.com/quest=61405/ember-court-divine-desserts)
  - [Ember Court: Mushroom Surprise! (Quest 61406)](https://www.wowhead.com/quest=61406/ember-court-mushroom-surprise)
  - [Ember Court: Traditional (Quest 61398)](https://www.wowhead.com/quest=61398/ember-court-traditional)
  - [Ember Court: Mortal Reminders (Quest 61399)](https://www.wowhead.com/quest=61399/ember-court-mortal-reminders)
  - [Ember Court: Mystery Mirrors (Quest 61400)](https://www.wowhead.com/quest=61400/ember-court-mystery-mirrors)
  - [Ember Court: Venthyr Volunteers (Quest 61401)](https://www.wowhead.com/quest=61401/ember-court-venthyr-volunteers)
  - [Ember Court: Maldraxxus Army (Quest 61403)](https://www.wowhead.com/quest=61403/ember-court-maldraxxus-army)
- **Wowhead Item Pages:**
  - [Building: Dredger Pool (Item 181517)](https://www.wowhead.com/item=181517/building-dredger-pool)
  - [Building: Guardhouse (Item 181518)](https://www.wowhead.com/item=181518/building-guardhouse)
  - [Staff: Stage Crew (Item 181520)](https://www.wowhead.com/item=181520/staff-stage-crew)
  - [Staff: Waiters (Item 181522)](https://www.wowhead.com/item=181522/staff-waiters)
  - [Staff: Dredger Decorators (Item 181519)](https://www.wowhead.com/item=181519/staff-dredger-decorators)
  - [Staff: Bouncers (Item 181523)](https://www.wowhead.com/item=181523/staff-bouncers)
  - [Contract: Lost Chalice Band (Item 176132)](https://www.wowhead.com/item=176132/contract-lost-chalice-band)
  - [Contract: Divine Desserts (Item 176135)](https://www.wowhead.com/item=176135/contract-divine-desserts)
  - [Contract: Tubbins's Tea Party (Item 176134)](https://www.wowhead.com/item=176134/contract-tubbinss-tea-party)
