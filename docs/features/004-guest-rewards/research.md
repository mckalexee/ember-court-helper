# Guest Rewards -- Research

> Feature 004. Created 2026-02-20.

## Questions to Answer

- What permanent collectible rewards (mounts, pets, toys, transmog) does each of the 16 Ember Court guests give?
- At what friendship level is each reward obtainable?
- What Wowhead item IDs correspond to each reward?
- How does the tribute/happiness system affect reward availability?

## Background: Tribute System

Ember Court rewards come from **tribute chests** that guests leave at the end of each court session. The quality of the tribute depends on the guest's **happiness level** at the end of the event:

| Happiness Level | Tribute Tier            |
|-----------------|-------------------------|
| Miserable       | Disgruntled Gift        |
| Unhappy         | Trifling Tribute        |
| Uncomfortable   | Trifling Tribute        |
| Comfortable     | Tribute                 |
| Happy           | Substantial Tribute     |
| Elated          | Extravagant Tribute     |

Higher-tier tributes have better loot tables and higher drop rates for rare items. Some items (like mounts and pets) may only appear in Substantial or Extravagant tributes.

Separately, guests have a **friendship level** (reputation) that increases each time they attend: Stranger, Acquaintance, Buddy, Friend, Good Friend, Best Friend. Certain rewards only become available at specific friendship thresholds. The friendship level at the **start** of the party determines what loot pool is active.

## Findings by Guest

---

### Slot 1: Cryptkeeper Kassir (Venthyr)

**Transmog Weapons/Armor:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Crypt Watcher's Spire | Staff (2H) | 180954 | Stranger+ | Drops from Tribute, Substantial, Extravagant |
| Crypt Keeper's Vessel | Off-hand | 180963 | Stranger+ | Drops from Tribute, Substantial, Extravagant |
| Batwing Glaive | Warglaive | 180957 | Stranger+ | Drops from various tribute tiers |
| Axeblade Blunderbuss | Gun | 180956 | Stranger+ | Drops from Extravagant Tribute |
| Ember Court Barrier | Shield | 180964 | Stranger+ | Shared across multiple Venthyr guests |
| Kassir's Crypt Mantle | Back (Cloak) | 183713 | Good Friend | Epic cosmetic cloak; requires Elated happiness |

**Wowhead Tribute Objects:**
- [Cryptkeeper Kassir's Substantial Tribute](https://www.wowhead.com/object=356753)
- [Cryptkeeper Kassir's Extravagant Tribute](https://www.wowhead.com/object=356752)

---

### Slot 1: Plague Deviser Marileth (Necrolord)

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Gem-Crowned Wand | Wand | 181321 | Stranger+ | |
| Blightclutched Greatstaff | Staff (2H) | 181323 | Stranger+ | |
| Bloodstained Hacksaw | Dagger | 181326 | Stranger+ | |
| Spineforged Tenderizer | Mace (1H) | 181327 | Stranger+ | Shared with other Necrolord guests |
| Marrowfused Warglaive | Warglaive | 181330 | Stranger+ | Shared with other Necrolord guests |

**Court Favor:** Training Dummies (ID: 181437) -- unlocked at Elated happiness. Grants +Excitement to the court. Not a permanent collectible.

**Wowhead Tribute Object:**
- [Plague Deviser Marileth's Extravagant Tribute](https://www.wowhead.com/object=356705)

---

### Slot 1: Choofa (Night Fae)

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Nightwillow Barb | Dagger | 179499 | Stranger+ | |
| Elderwood Gavel | Mace (1H) | 179548 | Stranger+ | Shared across Night Fae guests |
| Heartwood Stem | Off-hand | 179563 | Stranger+ | |
| Elderwood Barrier | Shield | 179605 | Stranger+ | Shared across Night Fae guests |

**Court Favor:** Bounding Shroom Seeds (ID: 177233) -- unlocked at Friend. Adds bouncing mushrooms to the court. Not a permanent collectible.

**Wowhead Tribute Object:**
- [Choofa's Extravagant Tribute](https://www.wowhead.com/object=356720)

---

### Slot 1: Sika (Kyrian)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Brightscale Hatchling | Battle Pet | 180815 | Good Friend | Chance drop from tribute chests |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Bronze Dual-Bladed Glaive | Warglaive | 181226 | Stranger+ | Shared across Kyrian guests |
| Tranquil's Censer | Off-hand | 181229 | Stranger+ | |
| Pugilist's Chakram | Thrown/Off-hand | 181230 | Stranger+ | Shared across Kyrian guests |
| Cupbearer's Claymore | Sword (2H) | 181232 | Stranger+ | Shared across Kyrian guests |

**Court Favor:** Anima-Infused Water (ID: 177230) -- unlocked at Friend. Adds fire buckets to the court.

**Wowhead Tribute Object:**
- [Sika's Extravagant Tribute](https://www.wowhead.com/object=356737)

---

### Slot 2: Stonehead (Venthyr)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Violet Dredwing Pup | Battle Pet | 180603 | Best Friend | Chance drop from tribute chests |

**Transmog Weapons/Armor:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Stonewing Halberd | Polearm | 180955 | Stranger+ | |
| Axeblade Blunderbuss | Gun | 180956 | Stranger+ | Shared Venthyr weapon |
| Batwing Glaive | Warglaive | 180957 | Stranger+ | Shared Venthyr weapon |
| Shiny-Metal Topped Basher | Mace (1H) | 180960 | Stranger+ | |
| Ember Court Barrier | Shield | 180964 | Stranger+ | Shared Venthyr weapon |
| Large Muck Stained Blade | Sword (2H) | 179301 | Stranger+ | |
| Muck-Encrusted Dagger | Dagger | 179302 | Stranger+ | |
| Bronze-Bound Sinstone | Back (Cloak) | 183709 | Good Friend | Epic cosmetic cloak |

**Court Favor:** Slippery Muck (ID: 181440) -- unlocked at Buddy.

**Wowhead Tribute Object:**
- [Stonehead's Extravagant Tribute](https://www.wowhead.com/object=356748)

---

### Slot 2: Droman Aliothe (Night Fae)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Pearlwing Heron | Battle Pet | 180628 | Best Friend | Chance drop from tribute chests |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Ripvine Saber | Sword (1H) | 179514 | Stranger+ | |
| Grove Warden's Maul | Mace (2H) | 179538 | Stranger+ | |
| Elderwood Gavel | Mace (1H) | 179548 | Stranger+ | Shared Night Fae weapon |
| Elderwood Barrier | Shield | 179605 | Stranger+ | Shared Night Fae weapon |

**Court Favor:** The Wild Drum (ID: 181438) -- unlocked at Good Friend. Grants haste/damage buff.

**Wowhead Tribute Object:**
- [Droman Aliothe's Extravagant Tribute](https://www.wowhead.com/object=356716)

---

### Slot 2: Grandmaster Vole (Necrolord)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Corpulent Bonetusk | Battle Pet | 181168 | Good Friend | Chance drop from tribute chests |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Spineforged Tenderizer | Mace (1H) | 181327 | Stranger+ | Shared Necrolord weapon |
| Marrowfused Sword | Sword (1H) | 181328 | Stranger+ | |
| Marrowfused Claymore | Sword (2H) | 181329 | Stranger+ | |
| Marrowfused Warglaive | Warglaive | 181330 | Stranger+ | Shared Necrolord weapon |

**Wowhead Tribute Object:**
- [Grandmaster Vole's Extravagant Tribute](https://www.wowhead.com/object=356700)

---

### Slot 2: Kleia & Pelagos (Kyrian)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Sable | Battle Pet | 180814 | Best Friend | Chance drop from tribute chests |

**Transmog Weapons:**

Kleia & Pelagos have one of the largest transmog weapon pools, featuring both a "standard" set and a Kyrian-themed cosmetic set.

*Kyrian Cosmetic Weapons (shared Kyrian pool):*

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Crossbow of Contemplative Calm | Crossbow | 181225 | Stranger+ | |
| Bronze Dual-Bladed Glaive | Warglaive | 181226 | Stranger+ | |
| Bronze Ceremonial Targe | Shield | 181227 | Stranger+ | |
| Temple Guard's Partisan | Polearm | 181228 | Stranger+ | |
| Tranquil's Censer | Off-hand | 181229 | Stranger+ | |
| Pugilist's Chakram | Thrown/Off-hand | 181230 | Stranger+ | |
| Broadbladed Severer | Axe (1H) | 181231 | Stranger+ | |
| Cupbearer's Claymore | Sword (2H) | 181232 | Stranger+ | |
| Bellringer's Hammer | Mace (1H) | 181233 | Stranger+ | |
| Final Arbiter's Gavel | Mace (2H) | 181235 | Stranger+ | |

*Bastion Arsenal Weapons (alternate models):*

| Item | Type | Item ID | Notes |
|------|------|---------|-------|
| Honorguide Crossbow | Crossbow | 176793 | |
| Gilded Glaive | Warglaive | 176794 | |
| Defender's Aspis | Shield | 176795 | |
| Elysian Dory | Polearm | 176796 | |
| Ritual Bell | Off-hand | 176797 | |
| Larion Claw | Fist weapon | 176798 | |
| Reverent Dagger | Dagger | 176799 | |
| Modest Greatblade | Sword (2H) | 176800 | |
| Unburdened Hammer | Mace (1H) | 176801 | |
| Meditator's Blade | Sword (1H) | 176802 | |
| Harmonious Mallet | Mace (2H) | 176803 | |

**Wowhead Tribute Object:**
- [Kleia and Pelagos' Extravagant Tribute](https://www.wowhead.com/object=356733)

---

### Slot 3: Rendle & Cudgelface (Venthyr)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Bloodfeaster Spiderling | Battle Pet | 181315 | Stranger+ | Can drop at any friendship level; requires Elated happiness for best chance |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Dredger Anklebiter | Dagger | 180959 | Stranger+ | |
| Sterling-Silver Cudgel | Mace (1H) | 180962 | Stranger+ | |
| Axeblade Blunderbuss | Gun | 180956 | Stranger+ | Shared Venthyr weapon |
| Batwing Glaive | Warglaive | 180957 | Stranger+ | Shared Venthyr weapon |
| Ember Court Barrier | Shield | 180964 | Stranger+ | Shared Venthyr weapon |

**Court Favors:**
- Venthyr Arsenal -- unlocked at Good Friend. Combat weapons appear during court events.
- Dredger Party Supplies (ID: 177237) -- unlocked at Good Friend.

**Note:** Rendle's tribute can also contain "A Wrapped Weapon" mystery containers that grant a random Venthyr-themed transmog weapon when opened.

**Wowhead Tribute Object:**
- [Rendle and Cudgelface's Extravagant Tribute](https://www.wowhead.com/object=356744)

---

### Slot 3: Alexandros Mograine (Necrolord)

**Mount:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Gruesome Flayedwing | Mount | 181300 | Stranger+ | Can drop at any friendship level; reports of first-visit drops. Higher happiness = better chance. |

**Transmog Weapons/Armor:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Marrowfused Dagger | Dagger | 181325 | Stranger+ | |
| Spineforged Tenderizer | Mace (1H) | 181327 | Stranger+ | Shared Necrolord weapon |
| Marrowfused Warglaive | Warglaive | 181330 | Stranger+ | Shared Necrolord weapon |
| Marrowfused Shield | Shield | 181331 | Stranger+ | |

**Court Favor:** Necrolord Arsenal -- unlocked at Good Friend.

**Wowhead Tribute Object:**
- [Alexandros Mograine's Extravagant Tribute](https://www.wowhead.com/object=356697)

---

### Slot 3: Hunt-Captain Korayn (Night Fae)

**Mount:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Pale Acidmaw | Mount | 180726 | Best Friend (likely) | Chance drop from tribute chests; some reports suggest lower friendship may work |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Grove Warden's Edge | Glaive (1H) | 179509 | Stranger+ | |
| Grove Warden's Harvester | Polearm | 179533 | Stranger+ | |
| Elderwood Gavel | Mace (1H) | 179548 | Stranger+ | Shared Night Fae weapon |
| Nightwillow Shortbow | Bow | 179585 | Stranger+ | |
| Elderwood Barrier | Shield | 179605 | Stranger+ | Shared Night Fae weapon |

**Court Favor:** Night Fae Arsenal -- unlocked at Good Friend.

**Wowhead Tribute Object:**
- [Hunt-Captain Korayn's Extravagant Tribute](https://www.wowhead.com/object=356712)

---

### Slot 3: Polemarch Adrestes (Kyrian)

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Broadbladed Severer | Axe (1H) | 181231 | Stranger+ | |
| Temple Guard's Partisan | Polearm | 181228 | Stranger+ | |
| Pugilist's Chakram | Thrown/Off-hand | 181230 | Stranger+ | Shared Kyrian weapon |
| Bronze Dual-Bladed Glaive | Warglaive | 181226 | Stranger+ | Shared Kyrian weapon |
| Cupbearer's Claymore | Sword (2H) | 181232 | Stranger+ | Shared Kyrian weapon |

**Court Favors:**
- Generous Gift (ID: 177238) -- unlocked at Good Friend. Boosts guest happiness.
- Kyrian Arsenal -- unlocked at Best Friend + Elated happiness, plus completing the quest chain starting with "A Short Letter to Forgelite Sophone" (ID: 183845).

**Wowhead Tribute Object:**
- [Polemarch Adrestes' Extravagant Tribute](https://www.wowhead.com/object=356725)

---

### Slot 4: The Countess (Venthyr)

**Mount:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Desire's Battle Gargon | Mount | 182209 | Best Friend | Must invite after reaching Best Friend; guest must end at Happy or Elated |

**Toy:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| The Countess's Parasol | Toy | 182696 | Stranger+ | Can drop at any friendship level and any happiness level |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Redelev House Foil | Sword (1H) | 180958 | Stranger+ | Epic quality |
| Silver-Bladed Ritual Dagger | Dagger | 180961 | Stranger+ | Epic quality |
| Axeblade Blunderbuss | Gun | 180956 | Stranger+ | Shared Venthyr weapon |
| Batwing Glaive | Warglaive | 180957 | Stranger+ | Shared Venthyr weapon |
| Ember Court Barrier | Shield | 180964 | Stranger+ | Shared Venthyr weapon |

**Court Favor:** Vanity Mirror (ID: 181436) -- unlocked at Good Friend.

**Wowhead Tribute Object:**
- [The Countess' Extravagant Tribute](https://www.wowhead.com/object=356741)

---

### Slot 4: Baroness Vashj (Necrolord)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Plaguelouse Larva | Battle Pet | 181264 | Best Friend | Chance drop from tribute chests |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Bonejowl Ballista | Crossbow | 181320 | Stranger+ | |
| Bonebound Tome | Off-hand | 181322 | Stranger+ | Epic quality |
| Spineforged Tenderizer | Mace (1H) | 181327 | Stranger+ | Shared Necrolord weapon |
| Marrowfused Warglaive | Warglaive | 181330 | Stranger+ | Shared Necrolord weapon |

**Wowhead Tribute Object:**
- [Baroness Vashj's Extravagant Tribute](https://www.wowhead.com/object=356693)

---

### Slot 4: Lady Moonberry (Night Fae)

**Battle Pet:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Dusty Sporeflutterer | Battle Pet | 180639 | Good Friend or Best Friend | Exact threshold uncertain |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Songwood Staff | Staff (2H) | 179516 | Stranger+ | |
| Elderwood Gavel | Mace (1H) | 179548 | Stranger+ | Shared Night Fae weapon |
| Elderwood Barrier | Shield | 179605 | Stranger+ | Shared Night Fae weapon |

**Court Favor:** Bewitched Wardrobe (ID: 177232) -- unlocked at Friend.

**Wowhead Tribute Object:**
- [Lady Moonberry's Extravagant Tribute](https://www.wowhead.com/object=356709)

---

### Slot 4: Mikanikos (Kyrian)

**Mount:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Dauntless Duskrunner | Mount | 181317 | Best Friend (likely) | Also drops from Polemarch Adrestes; requires Bastion guests at best friend |

**Transmog Weapons:**

| Item | Type | Item ID | Friendship Req | Notes |
|------|------|---------|----------------|-------|
| Bronze Dual-Bladed Glaive | Warglaive | 181226 | Stranger+ | Shared Kyrian weapon |
| Bronze Ceremonial Targe | Shield | 181227 | Stranger+ | |
| Pugilist's Chakram | Thrown/Off-hand | 181230 | Stranger+ | Shared Kyrian weapon |
| Cupbearer's Claymore | Sword (2H) | 181232 | Stranger+ | Shared Kyrian weapon |
| Final Arbiter's Gavel | Mace (2H) | 181235 | Stranger+ | |

**Court Favor:** Protective Braziers (ID: 181439) -- unlocked at Good Friend. Grants 50% damage reduction.

**Wowhead Tribute Object:**
- [Mikanikos' Extravagant Tribute](https://www.wowhead.com/object=356728)

---

## Shared / Global Rewards

### Quill of Correspondence (Toy)

| Item | Type | Item ID | Requirement | Notes |
|------|------|---------|-------------|-------|
| Quill of Correspondence | Toy | 183876 | Best Friend with any 1 guest | Purchased from Lady Ilinca for 500 gold; sends letters to best friends |

This is a **vendor-purchased toy**, not a tribute drop. It becomes available from Lady Ilinca (Court Concierge at Sinfall) once you reach Best Friend with at least one Ember Court guest.

### Permanent RSVP

Upon reaching Best Friend with any guest and completing their "Best Friend" quest, that guest becomes permanently available for invitation without needing an RSVP item. This is a gameplay unlock, not a collectible.

---

## Summary: High-Value Collectibles by Type

### Mounts (4 total)

| Mount | Item ID | Guest | Friendship Req |
|-------|---------|-------|----------------|
| Desire's Battle Gargon | 182209 | The Countess | Best Friend + Happy/Elated |
| Gruesome Flayedwing | 181300 | Alexandros Mograine | Stranger+ (can drop first visit) |
| Pale Acidmaw | 180726 | Hunt-Captain Korayn | Best Friend (likely) |
| Dauntless Duskrunner | 181317 | Mikanikos / Polemarch Adrestes | Best Friend (likely) |

### Battle Pets (8 total)

| Pet | Item ID | Guest | Friendship Req |
|-----|---------|-------|----------------|
| Brightscale Hatchling | 180815 | Sika | Good Friend |
| Violet Dredwing Pup | 180603 | Stonehead | Best Friend |
| Pearlwing Heron | 180628 | Droman Aliothe | Best Friend |
| Corpulent Bonetusk | 181168 | Grandmaster Vole | Good Friend |
| Sable | 180814 | Kleia & Pelagos | Best Friend |
| Bloodfeaster Spiderling | 181315 | Rendle & Cudgelface | Stranger+ (Elated happiness helps) |
| Plaguelouse Larva | 181264 | Baroness Vashj | Best Friend |
| Dusty Sporeflutterer | 180639 | Lady Moonberry | Good Friend or Best Friend |

### Toys (2 total)

| Toy | Item ID | Source | Requirement |
|-----|---------|--------|-------------|
| The Countess's Parasol | 182696 | The Countess | Stranger+ (any happiness) |
| Quill of Correspondence | 183876 | Vendor (Lady Ilinca) | Best Friend with any 1 guest; costs 500g |

### Unique Transmog Armor (Cloaks)

| Item | Item ID | Guest | Friendship Req |
|------|---------|-------|----------------|
| Kassir's Crypt Mantle | 183713 | Cryptkeeper Kassir | Good Friend + Elated |
| Bronze-Bound Sinstone | 183709 | Stonehead | Good Friend + Elated |

---

## Data Confidence Notes

1. **Friendship level requirements for pets/mounts:** Many sources are based on player reports in Wowhead comments rather than official documentation. Some players report receiving pets at lower friendship levels than expected, suggesting RNG may be involved or thresholds may have been adjusted in patches.

2. **Transmog weapons:** Most transmog weapons appear to drop regardless of friendship level (available from Stranger onward), with the main factor being happiness/tribute tier. Higher tribute tiers have larger loot tables that include rarer items.

3. **Shared weapon pools:** Many weapon transmogs are shared across guests of the same covenant faction (e.g., all Necrolord guests can drop Spineforged Tenderizer). Guest-unique weapons are more distinctive and tend to be higher rarity.

4. **Mount drop rates:** The Gruesome Flayedwing appears to have a notably higher drop rate than other covenant feature mounts, with multiple reports of first-visit drops. The other mounts (Pale Acidmaw, Dauntless Duskrunner) appear to require Best Friend status and have lower drop rates.

5. **Tribute tiers for pets:** The Bloodfeaster Spiderling from Rendle & Cudgelface appears to be unique in that it can drop from even the Disgruntled Gift tier, while most other pets require at minimum a Substantial or Extravagant Tribute.

## Sources

- [Wowhead: Ember Court Guide](https://www.wowhead.com/guide/venthyr-covenant-ember-court)
- [Wowhead: Comprehensive List of Tribute Rewards](https://www.wowhead.com/guide/comprehensive-list-of-tribute-rewards-for-completing-the-ember-court-23121)
- [Wowhead: Ember Court Strategy Guide](https://www.wowhead.com/guide/venthyr-ember-court-strategy-increase-happiness-guests)
- [Warcraft Wiki: Ember Court](https://warcraft.wiki.gg/wiki/Ember_Court)
- [Warcraft Wiki: Court Favors](https://warcraft.wiki.gg/wiki/Court_Favors)
- [Wowpedia: Ember Court](https://wowpedia.fandom.com/wiki/Ember_Court)
- [Icy Veins: The Ember Court](https://www.icy-veins.com/wow/the-ember-court-venthyr-weekly-activity)
- [Wowhead: Desire's Battle Gargon Found](https://www.wowhead.com/news/desires-battle-gargon-mount-found-reward-from-the-countess-at-the-ember-court-321356)
- [None the Wiser Guild: Be Our Guest Guide](https://nonethewiserguild.wordpress.com/be-our-guest-venthyr/)
- [EU Forums: Hopefully Helpful Guide to the Ember Court](https://eu.forums.blizzard.com/en/wow/t/hopefully-helpfull-guide-to-the-ember-court/239635)
- Individual Wowhead item pages (linked by item ID throughout this document, e.g., https://www.wowhead.com/item=182209)
- Individual Wowhead tribute object pages (linked throughout this document)
