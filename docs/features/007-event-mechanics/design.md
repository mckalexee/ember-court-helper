# Event Mechanics -- Design

> Feature 007. Created 2026-02-20.

## Problem Statement

The calculator currently models only **base atmosphere** from amenity selection. Players optimize amenities, pick what looks best, then enter the Ember Court event blind -- unsure which activities to complete, which to skip, and what choices to make during random events.

Two problems:

1. **No event playbook.** Players don't know what activities their amenity selection will generate, or which ones help/hurt their specific guest lineup.
2. **Optimizer ignores event potential.** Two amenities with identical base scores may differ in event value -- one has activities that further amplify guest preferences, the other doesn't. The optimizer can't distinguish them.

## Design

### 1. Data Model Changes (`data.js`)

#### 1a. Amenity Activities

Add an `activities` array to each amenity object (Entertainment, Refreshment, Decoration only -- Security has no activities per research).

```js
{ id: "atoning", name: "Atoning Rituals", category: "entertainment",
  effects: { cleanliness: 0, danger: 0, decadence: -1, excitement: 0, formality: 1 },
  activities: [
    { name: "Ritual of Accusation", dim: "formality", direction: 1,
      tip: "Judge 8 souls at the Main Stage -- match confessions to faults",
      dualNature: "Misjudge intentionally for +Casual instead",
      prepPhase: false },
    { name: "Ritual of Absolution", dim: "decadence", direction: -1,
      tip: "Kill 20 Manifestations near the altar",
      dualNature: null,
      prepPhase: false }
  ],
  unlock: { ... } }
```

Fields per activity:
- `name` (string): Activity display name.
- `dim` (string): Which dimension this activity pushes (one of the 5 dimension keys).
- `direction` (+1 or -1): Which pole it pushes toward. +1 = positive pole, -1 = negative pole.
- `tip` (string): Brief gameplay instruction (1 sentence).
- `dualNature` (string|null): If non-null, text explaining how the player can push the opposite direction instead.
- `prepPhase` (boolean): Whether completable during the 60-second Preparation phase.

Security amenities get `activities: []` (empty array).

Full activity data from research:

| Amenity | Activity 1 | dim | dir | Activity 2 | dim | dir |
|---------|-----------|-----|-----|-----------|-----|-----|
| Atoning Rituals | Ritual of Accusation | formality | +1 | Ritual of Absolution | decadence | -1 |
| Glimpse of the Wilds | Animal Rescue | cleanliness | +1 | Ride on the Wild Side | danger | -1 |
| Lost Chalice Band | Concert Kick-Off | excitement | +1 | Dance for Love | decadence | +1 |
| Tubbins's Tea Party | Tea Time | formality | +1 | A Quiet Moment | excitement | -1 |
| Divine Desserts | Food Fight | cleanliness | -1 | Made to Order | decadence | +1 |
| Mushroom Surprise | Fungi Experiments | danger | +1 | Lower Your Standards | decadence | -1 |
| Traditional | Traditional Candles | cleanliness | +1 | Roaring Fires | danger | +1 |
| Mortal Reminders | Cartel Ta Justice | formality | -1 | Stolen Mementos | excitement | -1 |
| Mystery Mirrors | Mystery Mirrors | excitement | +1 | Prison Break | danger | -1 |

#### 1b. Random Events

Add `randomEvents` array to `EmberCourtData`:

```js
randomEvents: [
  { name: "A Little More Comfortable", dim: "formality",
    positive: "Choose Fancy Outfit",
    negative: "Choose Unassuming Outfit" },
  { name: "Court Crusher", dim: "formality",
    positive: "Present Sinstones to Prince Renathal",
    negative: "Crush Sinstones" },
  // ... all from research
]
```

Fields:
- `name`: Event name.
- `dim`: Which dimension.
- `positive` (string): Choice text that pushes toward the positive pole (+1).
- `negative` (string): Choice text that pushes toward the negative pole (-1).

A random event can spawn if at least one invited guest has a non-zero preference on its `dim`.

#### 1c. Party Crashers

Add `partyCrashers` array to `EmberCourtData`:

```js
partyCrashers: [
  { name: "Master's Forces", boss: "High Inquisitor Vetar",
    dim: "excitement", direction: -1 },
  { name: "Stone Legion", boss: "Drezgruda",
    dim: "decadence", direction: 1 },
  { name: "Rampaging Dredgers", boss: "Sloppy",
    dim: "cleanliness", direction: 1 },
  { name: "Lost Souls", boss: "Sineater",
    dim: "formality", direction: 1 },
  { name: "Devourers", boss: "Kedu",
    dim: "danger", direction: -1 }
]
```

A party crasher can spawn if at least one invited guest has a preference that matches the crasher's dimension+direction.

### 2. Event Guide Section (new UI)

#### Placement

Between Results and Reward Collection sections. Only renders when:
- At least 1 guest is selected, AND
- At least 1 amenity is selected

#### Section Structure

```
During the Court
"Your activity playbook for this party"

[Category] [Amenity Name]
  [DO/SKIP] [Activity Name]        [+Dimension Tag] [Prep badge?]
            Brief gameplay tip
            Dual-nature note (if any)
  [DO/SKIP] [Activity Name]        [+Dimension Tag]
            Brief gameplay tip

[Category] [Amenity Name]
  ...

Random Events (may appear)
  [Event Name] (Dimension)
  Choose: [recommended choice text]

Party Crashers (may appear)
  [Boss Name] -- defeat for [+Dimension]
```

#### Activity Verdict Logic

For each activity, compute a verdict based on guest preferences:

```js
function activityVerdict(activity) {
  let benefit = 0, harm = 0;
  selectedGuests.forEach(gId => {
    if (!gId) return;
    const guest = getGuest(gId);
    if (!guest) return;
    const pref = guest.preferences[activity.dim];
    if (pref !== 0) {
      if (Math.sign(pref) === Math.sign(activity.direction)) benefit++;
      else harm++;
    }
  });
  if (benefit > 0 && harm === 0) return { verdict: "do", benefit, harm };
  if (harm > 0 && benefit === 0) return { verdict: "skip", benefit, harm };
  if (benefit > 0 && harm > 0) return { verdict: "caution", benefit, harm };
  return { verdict: "optional", benefit, harm };
}
```

Verdicts:
- **DO** (green check): All guests with opinions benefit. "Complete this activity."
- **SKIP** (red X): All guests with opinions are harmed. "Skip this activity."
- **CAUTION** (amber): Mixed -- some benefit, some harmed. Show guest counts. "X guests benefit, Y guests harmed."
- **OPTIONAL** (gray dash): No guest has a preference on this dimension. "No impact on your guests."

#### Random Event Recommendation

For each relevant random event, count guests preferring positive vs negative pole:

```js
function randomEventRecommendation(event) {
  let positive = 0, negative = 0;
  selectedGuests.forEach(gId => {
    if (!gId) return;
    const guest = getGuest(gId);
    if (!guest) return;
    const pref = guest.preferences[event.dim];
    if (pref > 0) positive++;
    else if (pref < 0) negative++;
  });
  if (positive > negative) return { choice: "positive", positive, negative };
  if (negative > positive) return { choice: "negative", positive, negative };
  if (positive > 0) return { choice: "either", positive, negative };
  return null; // shouldn't happen if filtered correctly
}
```

#### Party Crasher Recommendation

Always "Defeat" -- party crashers provide a large atmosphere bonus on defeat. Show which crashers could spawn and their bonus dimension.

### 3. Optimizer Changes

#### Event-Aware Scoring

Add a small weighted bonus for activities that align with guest preferences. The bonus acts as a tiebreaker when base scores are equal and nudges the optimizer toward amenities with useful events.

```js
const EVENT_WEIGHT = 0.1;

function eventBonus(amenitySelections) {
  let bonus = 0;
  Object.values(amenitySelections).forEach(amenityId => {
    if (!amenityId) return;
    const amenity = getAmenity(amenityId);
    if (!amenity || !amenity.activities) return;
    amenity.activities.forEach(activity => {
      selectedGuests.forEach(gId => {
        if (!gId) return;
        const guest = getGuest(gId);
        if (!guest) return;
        const pref = guest.preferences[activity.dim];
        if (pref !== 0 && Math.sign(pref) === Math.sign(activity.direction)) {
          bonus += 1;
        }
        // No penalty for conflicting activities -- they're skippable
      });
    });
  });
  return bonus * EVENT_WEIGHT;
}
```

Enhanced scoring in `totalHappiness()` or the optimizer loop:
```js
const score = totalHappiness(guestIds, current) + eventBonus(current);
```

**Why `EVENT_WEIGHT = 0.1`:**
- Max possible raw activity benefit: 4 guests x 6 activities = 24 alignment points
- Max event bonus: 24 x 0.1 = 2.4
- A base score difference of 1 point (one dimension match/conflict) is worth 10 activity alignment points
- This ensures events never override base scoring, but reliably break ties

**Important:** The `eventBonus` function must accept a `guestIds` parameter for use in `optimizeForLineup()` (replacement suggestions). Updated signature:

```js
function eventBonus(amenitySelections, guestIds)
```

### 4. CSS Design

#### New Classes

```css
/* Event Guide Section */
.event-guide-empty { /* italic prompt when no activities */ }

.event-category { /* wrapper per amenity category */ }
.event-category-label { /* "Entertainment: Atoning Rituals" header */ }

.event-activity { /* single activity row */ }
.event-activity.do { /* green left border */ }
.event-activity.skip { /* red left border */ }
.event-activity.caution { /* amber left border */ }
.event-activity.optional { /* gray left border */ }

.event-verdict { /* DO/SKIP/CAUTION icon + text */ }
.event-verdict-icon { /* checkmark/X/warning symbol */ }
.event-verdict-text { /* "DO" / "SKIP" / "CAUTION" label */ }

.event-activity-header { /* name + effect tag row */ }
.event-activity-name { /* Cinzel, heading color */ }
.event-activity-effect { /* dimension-colored tag, reuses .effect-tag.dim-* */ }
.event-activity-tip { /* gameplay instruction text */ }
.event-activity-note { /* dual-nature note, italic */ }
.event-prep-badge { /* "Prep Phase" indicator */ }

.event-random-section { /* Random events area */ }
.event-random-item { /* single random event */ }
.event-random-choice { /* recommended choice text */ }

.event-crasher-section { /* Party crashers area */ }
.event-crasher-item { /* single crasher entry */ }
```

#### Color Scheme

- DO: `var(--positive)` (#4caf50) left border, green verdict icon
- SKIP: `var(--negative)` (#e53935) left border, red verdict icon
- CAUTION: `var(--accent-gold)` (#d4a843) left border, amber verdict icon
- OPTIONAL: `var(--neutral)` (#78748c) left border, gray verdict icon
- Effect tags: Reuse existing `.effect-tag.dim-*` classes (dimension colors)
- Prep badge: Small gold pill, like `.ec-section-badge`

#### Activity Row Layout

```
[Verdict Col]  [Details Col]                              [Effect Tag]
  DO icon       Activity Name                              +Formal
  DO text       Brief gameplay tip
                Dual-nature note (italic, smaller)
                Prep Phase badge (if applicable)
```

Grid: `grid-template-columns: 56px 1fr auto;` with the verdict as a fixed-width column.

#### Responsive

- At 640px: Activity rows stack vertically, verdict moves above details.
- At 400px: Same stacked layout, smaller fonts.

### 5. Render Integration

In `render()`, add between results and reward collection:

```js
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
  renderEventGuide(),        // NEW
  '<hr class="ec-divider">',
  renderRewardCollectionSection(),
].join("");
```

New functions:
- `renderEventGuide()`: Main section renderer.
- `activityVerdict(activity, guestIds)`: Compute DO/SKIP/CAUTION/OPTIONAL.
- `getRelevantRandomEvents()`: Filter random events by guest preferences.
- `getRelevantPartyCrashers()`: Filter crashers by guest preferences.
- `randomEventRecommendation(event)`: Compute which choice to recommend.
- `eventBonus(amenitySelections, guestIds)`: Compute event-aware scoring bonus.

### 6. What This Feature Does NOT Include

- **Staff upgrades (2 per category):** Separate feature. Would change optimizer search space dramatically.
- **The Professionals (Rank 5 NPCs):** Acknowledged in a note ("At Rank 5, you also have The Professionals for fine-grained control") but not modeled.
- **Friendship level bonuses:** Not modeled.
- **Guest-specific bonus events:** Mentioned in research but not in the playbook (they're always beneficial, no decision needed).
- **Atmosphere magnitude values:** Research found no numerical data on event atmosphere shift amounts. Activities are shown as directional only.

## Implementation Notes

### `js/data.js`

1. Add `activities` array to each of the 12 amenity objects (9 with 2 activities each, 3 security with empty arrays).
2. Add `randomEvents` array (12 dimension events + 2 bonus happiness events = 14 total).
3. Add `partyCrashers` array (5 entries).

### `js/app.js`

1. Add `activityVerdict(activity, guestIds)` function near scoring engine.
2. Add `eventBonus(amenitySelections, guestIds)` function near scoring engine.
3. Update `optimize()` to use `totalHappiness(...) + eventBonus(...)` for scoring.
4. Update `optimizeForLineup()` similarly.
5. Add `renderEventGuide()` function with sub-helpers.
6. Add `renderEventGuide()` call in `render()`.
7. No new event bindings needed (section is display-only, no interactive elements).

### `css/styles.css`

1. Add Event Guide section styles after the Results section block.
2. Responsive adjustments at 640px and 400px breakpoints.

## Open Questions

None. Research is comprehensive, design decisions are straightforward.
