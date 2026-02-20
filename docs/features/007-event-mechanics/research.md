# Event Mechanics Research

> Feature 007. Created 2026-02-20.

## Summary

The calculator currently models only the **base atmosphere** from amenity selection. The actual in-game system has multiple layers of atmosphere manipulation during the Ember Court event. This research documents those layers and their implications for the calculator.

## The Full Atmosphere System

### Layer 1: Base Atmosphere (what the calculator models)

Each amenity shifts 2 dimensions by +1/-1. This sets the starting position of the atmosphere bars when the event begins. The calculator correctly models this and optimizes amenity combos by sign-matching against guest preferences.

### Layer 2: In-Event Activities (not modeled)

Each Entertainment, Refreshment, and Decoration amenity generates **2 interactive mini-events** during the party. These push the **same 2 dimensions** the amenity already affects -- they amplify the base effect. All activities are **optional** -- players can choose NOT to complete any event if the atmosphere shift would be detrimental.

---

#### Entertainment Activities

**Atoning Rituals** (base: +Humble, +Formal)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Ritual of Accusation | +Formal | Stand at Main Entertainment Stage. Five judgment abilities appear. Listen to Shackled Souls confess transgressions, then select the matching fault (Abusive, Coward, Greed, Hypocrite, Pride). Correctly judge 8 souls to complete. Intentionally misjudging gives +Casual instead. |
| 2 | Ritual of Absolution | +Humble | Kill 20 Manifestations that spawn near the altar. Straightforward combat event. |

**Glimpse of the Wilds** (base: +Clean, +Safe)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Animal Rescue | +Clean | Control Niya to collect 10 escaped animals. Groupers go in the water bubble onstage; Gormlings burrow underground into marked crates around the court. |
| 2 | Ride on the Wild Side | +Safe | Control a Hungry Gorm vehicle. Maintain its hunger bar by consuming objects and NPCs while avoiding hazard circles and breaking Trapper nets. Complete the route back to its cage. |

**Lost Chalice Band** (base: +Decadent, +Exciting)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Concert Kick-Off | +Exciting | Light 4 stage lights and retrieve 3 instruments: Ansel's Violin (behind dancers), Chiu's Lute (Lord Garridan's Tent), Noko's Flute (from Rowdy Roadie packs). Can be completed during the Preparation phase. |
| 2 | Dance for Love | +Decadent | Guide Iven through a dance by listening to his statements and selecting appropriate responses (Guide, Encourage, Instruct, or Take the Lead) within a few seconds. Progress bar tracks success. |

---

#### Refreshment Activities

**Tubbins's Tea Party** (base: +Relaxing, +Formal)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Tea Time | +Formal | Grab teapots from the Food Stall and serve tea to unserved NPCs and main Guests before tea grows cold. Using both teapots (or 3 with Lucky Teapot upgrade) completes the event. Cannot serve during combat. Repeatable every ~5 minutes for bonus happiness. |
| 2 | A Quiet Moment | +Relaxing | Sit in a glowing chair near the Food Stall and channel 3 abilities (each is an 8-second cast). Can be completed during the Preparation phase before guests arrive. |

**Divine Desserts** (base: +Messy, +Decadent)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Food Fight | +Messy | Flip 3 tables near the Food Stall, then throw food from behind them at 15 guests/NPCs. Each hit applies a Messy buff. |
| 2 | Made to Order | +Decadent | Control Wicklick the dredger. Use "Serve Cake" for hungry guests, "Serve Drinks" for thirsty ones, "Coming Through" to knock aside entitled guests. Serve 15 total. |

**Mushroom Surprise** (base: +Dangerous, +Humble)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Fungi Experiments | +Dangerous | Sample 10 flat-shaped mushrooms in the room adjacent to the Muck Pool. They either explode (heavy damage), spawn hostile Feral Fungus, or spawn Creeping Decay. Taller stalks provide Healing Spores buff. Can be started during the Preparation phase. |
| 2 | Lower Your Standards | +Humble | Collect 10 Wild Fungus from ground mushroom clusters (max 10 held), turn in 5 at a time to Picky Stefan. Can repeat for additional +Humble. Can be started during the Preparation phase. |

---

#### Decoration Activities

**Traditional** (base: +Clean, +Dangerous)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Traditional Candles | +Clean | Click 10 glowing dripping candles around the court to clean wax after fires spread. |
| 2 | Roaring Fires | +Dangerous | 10 fires spawn around the party (announced by Boot). With Anima-Infused Water buckets (unlocked from Sika's Friend tribute), pick up buckets and extinguish all 10 fires for +Safe instead. Auto-completes at party end regardless. Extinguishing spawns Ashen Remnants; rare spawn yields Ashen Amalgamation battle pet. |

> **Dual-nature note:** Traditional's fire event is the clearest dual-nature example. Leaving fires burning pushes +Dangerous (matching the base effect). Actively extinguishing with water buckets pushes +Safe instead. This means players with the water bucket upgrade can flip this dimension during the event.

**Mortal Reminders** (base: +Relaxing, +Casual)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Cartel Ta Justice | +Casual | Use Ta'saran's Trap on marked Suspicious Waiters around the court, then throw 10 of them off cliff edges to complete. |
| 2 | Stolen Mementos | +Relaxing | Trapped Waiters drop Stolen Mementos; collect 10 and return them to Keeper Ta'saran. |

**Mystery Mirrors** (base: +Safe, +Exciting)

| Activity | Name | Atmosphere Effect | Mechanics |
|----------|------|-------------------|-----------|
| 1 | Mystery Mirrors | +Exciting | Find 10 chained mirrors scattered throughout the court; clicking each spawns a combat enemy to defeat. 8 additional unchained transport mirrors enable fast movement between court locations. Can be started during the Preparation phase. |
| 2 | Prison Break | +Safe | Defeated enemies from the mirrors occasionally spawn Escaped Prisoners during the party. Kill 10 for +Safe. Ignoring them allows passive +Dangerous buildup instead. |

---

#### Security Activities

Security amenities do **NOT** generate the standard 2-activity pattern. Instead, they provide only base atmosphere effects and influence the Party Crasher invasion encounters. Community reports suggest security options may affect which crasher types spawn or the difficulty of invasions, but this is unconfirmed -- one Wowhead commenter notes: "It's still uncertain if Security has any impact on the Party Crashers that show up."

| Security Option | Base Effect 1 | Base Effect 2 | Description |
|-----------------|---------------|---------------|-------------|
| Venthyr Volunteers | +Dangerous | +Exciting | "The bravest among us will always rise to meet approaching enemies." |
| Stoneborn Reserves | +Safe | +Decadent | "Expensive to maintain a standing army of stoneborn, but gives guests extra peace of mind." |
| Maldraxxian Army | +Messy | +Casual | "Military training, effective weaponry, and disgusting messes." |

**Preparation phase interaction with Watchmaster Boromod:** During the Last-Minute Preparations phase, Boromod can be instructed to either "duel the Guests" (+Dangerous) or "guard the perimeters" (+Safe), providing a small additional atmosphere adjustment independent of the selected security option.

---

### Layer 3: Dual-Nature Mechanic

The Warcraft Wiki states each amenity "grants both its default and the opposite, with a slight boost to the default from the onset." Several events explicitly allow players to choose the opposite direction:

| Amenity | Default Direction | Opposite Available? | How |
|---------|-------------------|---------------------|-----|
| Atoning Rituals | +Formal (Accusation) | Yes, +Casual | Intentionally misjudge souls in Ritual of Accusation |
| Traditional | +Dangerous (fires) | Yes, +Safe | Extinguish fires with Anima-Infused Water buckets (Sika unlock) |
| Mystery Mirrors | +Safe (Prison Break) | Yes, +Dangerous | Ignore Escaped Prisoners instead of killing them |
| Mushroom Surprise | +Humble (Lower Your Standards) | Repeatable | Turn in mushrooms to Picky Stefan multiple times |

**Key implication:** Base-level cancellation (e.g., +Dangerous from one amenity and +Safe from another = net 0) doesn't fully cancel in practice, since players can selectively complete only the events pushing the direction they want, and skip or reverse the others.

### Layer 4: Random Dual-Choice Events

2 random events per party let players choose between opposing poles on a single dimension. These only spawn if relevant to at least one invited guest.

#### Complete Random Event List

**Formality (Casual vs. Formal):**

| Event Name | +Casual Choice | +Formal Choice |
|------------|---------------|----------------|
| A Little More Comfortable | Choose "Unassuming Outfit" | Choose "Fancy Outfit" |
| Court Crusher | Crush Sinstones | Present Sinstones to Prince Renathal |

**Cleanliness (Messy vs. Clean):**

| Event Name | +Messy Choice | +Clean Choice |
|------------|--------------|---------------|
| Clumpdump | Ignore the mess | Pick up trash following Clumpdump |
| Blustery Boil | Release the slime blob | Turn slime blob in to Prince Renathal |
| Party Pests | Detonate bugs with wand | Catch bugs with net |

**Danger (Safe vs. Dangerous):**

| Event Name | +Safe Choice | +Dangerous Choice |
|------------|-------------|-------------------|
| Knockerbock | Turn in Faulty Fireworks | Detonate Faulty Fireworks |
| Colonel Mort Murder | Hunt down Furtive Assassin | Close investigation, let killer go free |

**Decadence (Humble vs. Decadent):**

| Event Name | +Humble Choice | +Decadent Choice |
|------------|---------------|-----------------|
| Ember Skyterror | Deliver Cluster of Seeds to Prince Renathal | Plant Cluster of Seeds in soil |
| Legacy of Stone | Sculpture honors others | Sculpture honors self |

**Excitement (Relaxing vs. Exciting):**

| Event Name | +Relaxing Choice | +Exciting Choice |
|------------|-----------------|-----------------|
| Crime of Fashion | Reconcile Fredrik and Harlowe | Let Fredrik and Harlowe fight |
| Venthyr Provocateur | Deliver Court Gossip to Prince Renathal | Spread Court Gossip around the party |

**Bonus Happiness (no dimension, benefits all guests):**

| Event Name | Effect | Mechanics |
|------------|--------|-----------|
| Theotar's Toast | +Bonus Happiness for chosen guest | Catch falling teacup pieces; Theotar toasts a chosen guest |
| It's Raining Anima | +Bonus Happiness for all guests | Collect 15 anima orbs with Burly Hurly item |

### Layer 5: Party Crasher Events

Boss invasion events that, if defeated, provide large single-dimension atmosphere bonuses. Each crasher type only spawns if its atmosphere bonus would benefit at least one invited guest. The invasion has two stages: fill a progress bar by defeating waves of mobs, then a boss spawns.

| Invasion Name | Boss Name | Atmosphere Bonus on Defeat |
|---------------|-----------|---------------------------|
| Master's Forces | High Inquisitor Vetar | +Relaxing (large) |
| Stone Legion | Drezgruda | +Decadent (large) |
| Rampaging Dredgers | Sloppy | +Clean (large) |
| Lost Souls | Sineater | +Formal (large) |
| Devourers | Kedu | +Safe (large) |

> **Note on initial penalty:** One Wowhead commenter reported that the initial party crasher wave reduced Relaxing substantially, but the subsequent boss kill granted a large amount back. This suggests crasher invasions may temporarily push a negative direction before providing the large positive bonus on boss defeat.

### Layer 6: Guest-Specific Bonus Happiness Events

Some guests trigger unique bonus happiness events that do not shift any atmosphere dimension -- they provide raw happiness boosts to that specific guest.

| Guest | Event | Mechanics |
|-------|-------|-----------|
| Baroness Vashj | Shrouded Necromancer Heads | Collect 4 Shrouded Necromancer Heads around the court; repeatable for cumulative happiness bonus |
| The Countess | Countess Welcome / Assassin Defense | Personally welcome her at the bridge; kill House Iremoore Assassins defending her |
| Mikanikos | Magical Curios | Find 8 Magical Curios (max 5 unique held at once), deliver in batches |
| Lady Moonberry | Moonberry Pranks | Interact with Image of Lady Moonberry objects around the court |

### Layer 7: The Professionals (Sanctum Rank 5)

5 specialist NPCs unlocked via the "The Professionals" quest at Sanctum Rank 5. Each controls one atmosphere dimension. Players interact with them during the Preparation phase and during the event to give instructions pushing their dimension in either direction.

| NPC | Location | Dimension | Positive Instruction | Negative Instruction |
|-----|----------|-----------|---------------------|---------------------|
| **Breakfist** | Dredger pools area | Cleanliness | Clean things (+Clean) | Smash things (+Messy) |
| **Crooked Crick** | Refreshments area | Decadence | Increase luxury (+Decadent) | Decrease luxury (+Humble) |
| **Lady Ilinca** | Embassy area | Formality | Increase formality (+Formal) | Decrease formality (+Casual) |
| **Cosmin the Illusionist** | On stage | Excitement | Increase energy (+Exciting) | Decrease energy (+Relaxing) |
| **Wing Commander Vulpek** | Front gates | Danger | Increase threat (+Dangerous) | Decrease threat (+Safe) |

Once unlocked, The Professionals are available for **every subsequent Ember Court event**. They provide fine-grained atmosphere control on any dimension, making it easier to hit exact targets.

### Layer 8: Staff Upgrades (2 Per Category)

4 staff upgrades allow picking 2 amenities per category instead of 1:
- **Staff: Stage Crew** -- additional Entertainment option
- **Staff: Waiters** -- additional Refreshment option
- **Staff: Dredger Decorators** -- additional Decoration option
- **Staff: Bouncers** -- additional Security option

With 2 amenities, you get 4 in-event activities instead of 2 for that category, doubling the event-based atmosphere manipulation potential and stacking both base effects.

### Layer 9: Other Modifiers

- **Friendship level baseline bonus:** Higher friendship tiers give baseline happiness boosts (Acquaintance through Best Friend).
- **Theotar's "Life of the Party" soulbind:** Bonus happiness for each event completed, incentivizing completing all events regardless of atmosphere alignment.
- **Bonus Happiness:** A raw happiness boost mechanic independent of atmosphere dimensions. Sources include: Tea Time (serve tea every ~5 minutes), guest-specific events, Theotar's Toast, It's Raining Anima, Generous Gift items, and Theotar soulbind options.
- **Stock items:** Greeting Kits (+2 min preparation), Appetizers (+2 min event), Anima Samples (+3 min event), Comfy Chairs (passive comfort bonus). More event time = more activities completable.

## Event Timeline

The Ember Court event is a timed instanced scenario with three phases:

1. **Last-Minute Preparations (60 seconds base, extendable with Stock: Greeting Kits):** Interact with NPCs/objects to adjust atmosphere before guests arrive. The Professionals can be given instructions. Some activities are completable early: A Quiet Moment, Concert Kick-Off, Fungi Experiments, Lower Your Standards, Mystery Mirrors. Initial atmosphere is set by amenity base effects.

2. **The Court (~480 seconds / 8 minutes base, extendable with Stock items up to ~13 minutes):** Guests arrive and wander. Up to 10 events activate on the map (shown as star icons): 6 from amenities (2 per Entertainment, Refreshments, Decorations), 2 random dual-choice events, 1-2 party crasher invasions. Each event completion shifts atmosphere dimensions. Events only appear if they would benefit at least one invited guest. **Players can choose NOT to complete events** if the atmosphere shift would be detrimental.

3. **Closing/Tribute:** Guests evaluate the final cumulative atmosphere against their preferences. Rewards distributed based on happiness tiers (Miserable through Elated).

## Summary Tables

### Activities Per Amenity -- Quick Reference

| Category | Amenity | Activity 1 | Effect 1 | Activity 2 | Effect 2 | Prep Phase? |
|----------|---------|-----------|----------|-----------|----------|-------------|
| Entertainment | Atoning Rituals | Ritual of Accusation | +Formal | Ritual of Absolution | +Humble | No |
| Entertainment | Glimpse of the Wilds | Animal Rescue | +Clean | Ride on the Wild Side | +Safe | No |
| Entertainment | Lost Chalice Band | Concert Kick-Off | +Exciting | Dance for Love | +Decadent | Activity 1: Yes |
| Refreshment | Tubbins's Tea Party | Tea Time | +Formal | A Quiet Moment | +Relaxing | Activity 2: Yes |
| Refreshment | Divine Desserts | Food Fight | +Messy | Made to Order | +Decadent | No |
| Refreshment | Mushroom Surprise | Fungi Experiments | +Dangerous | Lower Your Standards | +Humble | Both: Yes |
| Decoration | Traditional | Traditional Candles | +Clean | Roaring Fires | +Dangerous | No |
| Decoration | Mortal Reminders | Cartel Ta Justice | +Casual | Stolen Mementos | +Relaxing | No |
| Decoration | Mystery Mirrors | Mystery Mirrors | +Exciting | Prison Break | +Safe | Activity 1: Yes |
| Security | Venthyr Volunteers | (no activities) | -- | -- | -- | -- |
| Security | Stoneborn Reserves | (no activities) | -- | -- | -- | -- |
| Security | Maldraxxian Army | (no activities) | -- | -- | -- | -- |

### Dimension Coverage by Layer

Shows which layers can push each dimension, useful for understanding how much control players have over each axis:

| Dimension | Base Amenities | In-Event Activities | Random Events | Party Crashers | Professionals |
|-----------|---------------|-------------------|---------------|----------------|---------------|
| Cleanliness | 4 amenities (2 +Clean, 2 +Messy) | Traditional Candles (+Clean), Animal Rescue (+Clean), Food Fight (+Messy) | 3 events (Clumpdump, Blustery Boil, Party Pests) | Sloppy (+Clean) | Breakfist |
| Danger | 4 amenities (2 +Dangerous, 2 +Safe) | Roaring Fires (+Dangerous), Fungi Experiments (+Dangerous), Ride on the Wild Side (+Safe), Prison Break (+Safe) | 2 events (Knockerbock, Colonel Mort Murder) | Kedu (+Safe) | Vulpek |
| Decadence | 4 amenities (2 +Decadent, 2 +Humble) | Dance for Love (+Decadent), Made to Order (+Decadent), Ritual of Absolution (+Humble), Lower Your Standards (+Humble) | 2 events (Ember Skyterror, Legacy of Stone) | Drezgruda (+Decadent) | Crooked Crick |
| Excitement | 4 amenities (2 +Exciting, 2 +Relaxing) | Concert Kick-Off (+Exciting), Mystery Mirrors (+Exciting), A Quiet Moment (+Relaxing), Stolen Mementos (+Relaxing) | 2 events (Crime of Fashion, Venthyr Provocateur) | Vetar (+Relaxing) | Cosmin |
| Formality | 4 amenities (2 +Formal, 2 +Casual) | Ritual of Accusation (+Formal), Tea Time (+Formal), Cartel Ta Justice (+Casual) | 2 events (A Little More Comfortable, Court Crusher) | Sineater (+Formal) | Lady Ilinca |

## Implications for the Calculator

### What we get right
- Base amenity effects (correct direction and magnitude)
- Sign-match scoring (correct logic)
- Optimizer direction recommendations (still correct -- events amplify, not contradict)

### What we could improve

1. **Event activity display:** Show which specific activities each amenity triggers, so players can plan their in-event strategy (e.g., "Traditional Deco gives you candle cleaning (+Clean) and fire events (+Dangerous)"). This is the primary deliverable for Feature 007.

2. **Activity dimension alignment indicators:** For each amenity, show whether its in-event activities align with or oppose the current guest set's preferences. An amenity whose activities all align with guest preferences is more valuable than one where only the base effect aligns.

3. **Dual-nature warnings:** Flag amenities where an event pushes the opposite direction of a guest's preference, and note whether it can be skipped or reversed (e.g., "Roaring Fires pushes +Dangerous -- skip this activity or use water buckets for +Safe instead").

4. **Random event coverage:** Show which random event pairs could spawn based on the invited guest set, so players know which "swing dimensions" they'll have control over during the event.

5. **Party crasher predictions:** Show which party crasher types could spawn based on guest preferences, and their atmosphere bonus.

6. **Preparation phase tips:** Flag which activities can be completed early during the 60-second prep phase.

7. **Staff upgrades (2 per category):** Would dramatically change the optimizer's search space from 3^4 = 81 to potentially much larger. This is the biggest missing mechanic but is a separate feature.

8. **Bonus happiness sources:** Note which amenities/events provide bonus happiness independent of atmosphere (Tea Time repeatability, guest-specific events, Theotar's Toast, It's Raining Anima).

9. **The Professionals:** Indicate that at Rank 5, players have fine-grained control over every dimension via NPCs, reducing the importance of perfect base atmosphere optimization.

## Data Confidence Assessment

| Data Category | Confidence | Notes |
|---------------|------------|-------|
| Amenity base effects | **High** | Confirmed across Wowhead, Warcraft Wiki, EU Forums, Icy Veins. Already implemented in calculator. |
| In-event activity names | **High** | Confirmed across Wowhead Event Guide, EU Forums, Warcraft Wiki. |
| Activity atmosphere directions | **High** | Each activity pushes the same dimension as its parent amenity's base effect. Confirmed by multiple sources. |
| Activity mechanics (gameplay) | **High** | Detailed in Wowhead Event Guide with step-by-step instructions. |
| Random event names and choices | **High** | Comprehensive list from Wowhead Event Guide with both choice options per event. |
| Party crasher names and effects | **Medium-High** | Boss names and atmosphere bonuses from Wowhead Event Guide. Initial penalty mechanic reported by single commenter. |
| Security event behavior | **Medium** | Security does NOT generate 2-activity events like other categories. Community uncertainty about crasher interaction. |
| The Professionals mechanics | **Medium** | NPCs and dimensions confirmed. Exact instruction options inferred from Breakfist's "smash or clean" description in Warcraft Wiki. |
| Dual-nature mechanic | **Medium** | Warcraft Wiki describes the concept. Specific reversible events confirmed for Traditional (water buckets), Atoning Rituals (misjudge), Mystery Mirrors (ignore prisoners). |
| Atmosphere shift magnitudes | **Low** | No numerical values found. One commenter mentioned "anywhere between 1% and 30% depending on activity" but this is vague. |
| Guest-specific bonus events | **Medium** | Listed in Wowhead Event Guide for Vashj, Countess, Mikanikos, Moonberry. Other guests may have unlisted events. |
| Preparation phase completable activities | **High** | Explicitly listed in Wowhead Event Guide: A Quiet Moment, Concert Kick-Off, Fungi Experiments, Lower Your Standards, Mystery Mirrors. |

## Sources

- [Wowhead - Ember Court Main Guide](https://www.wowhead.com/guide/venthyr-covenant-ember-court)
- [Wowhead - Ember Court Event Guide](https://www.wowhead.com/guide/venthyr-ember-court-event-guide)
- [Wowhead - Ember Court Strategy: Increase Happiness](https://www.wowhead.com/guide/venthyr-ember-court-strategy-increase-happiness-guests)
- [Warcraft Wiki - Ember Court](https://warcraft.wiki.gg/wiki/Ember_Court)
- [Wowpedia - Ember Court](https://wowpedia.fandom.com/wiki/Ember_Court)
- [Wowpedia - The Professionals](https://wowpedia.fandom.com/wiki/The_Professionals)
- [Icy Veins - Ember Court Guide](https://www.icy-veins.com/wow/the-ember-court-venthyr-weekly-activity)
- [EU Forums - Helpful Guide to the Ember Court](https://eu.forums.blizzard.com/en/wow/t/hopefully-helpfull-guide-to-the-ember-court/239635)
- Existing project research: `docs/features/001-initial-calculator/research.md`
