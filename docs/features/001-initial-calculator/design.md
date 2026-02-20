# Ember Court Calculator -- UI/UX Plan

## Overview

A single-page web application that helps World of Warcraft Venthyr Covenant players
optimise their Ember Court party by selecting guests and calculating the best combination
of entertainment, refreshments, decorations, and staff to maximise guest happiness and
reputation gains.

---

## 1. Layout Structure

The page uses a single-column vertical flow with distinct sections. No multi-page
routing is needed; the user scrolls or is guided through collapsible panels.

```
+----------------------------------------------------------+
|  HEADER  (logo / title / tagline)                        |
+----------------------------------------------------------+
|  GUEST SELECTION PANEL                                   |
|  (pick 1-4 guests to invite)                             |
+----------------------------------------------------------+
|  OPTION PANELS  (4 category strips, always visible)      |
|  -- Entertainment                                        |
|  -- Refreshments                                         |
|  -- Decorations / Theme                                  |
|  -- Staff / Special Guests                               |
+----------------------------------------------------------+
|  RESULTS DASHBOARD                                       |
|  (auto-calculated optimal picks + per-guest breakdown)   |
+----------------------------------------------------------+
|  FOOTER  (credits, data source, links)                   |
+----------------------------------------------------------+
```

### Panel Behaviour

- All panels are visible at once on desktop (no tabs, no wizard steps).
  The page is short enough to show everything above the fold on a 1080p
  monitor when guests are selected and options are compact.
- On mobile, panels become full-width accordion sections that expand/collapse.
  Only Guest Selection and Results are open by default.
- A sticky mini-bar at the bottom of the viewport on mobile shows a
  live happiness summary so the user always sees the impact of changes.

### Spacing and Containment

- Maximum content width: 1120px, centred.
- Sections separated by thin gold horizontal rules with subtle glow.
- Each section has a heading styled like a Venthyr chapter title.

---

## 2. Guest Selection

### Component: Guest Card Grid

Guests are displayed as a grid of selectable cards (3 columns desktop,
2 columns tablet, 1 column mobile).

```
+-----------------------+
|  [Portrait]           |
|  Baroness Vashj       |
|  Nathrian Noble       |
|  [  Invite  ]         |
+-----------------------+
```

#### Card Anatomy

| Element          | Detail                                                    |
|------------------|-----------------------------------------------------------|
| Portrait         | 80x80px circular frame with gothic gold border.           |
|                  | Placeholder silhouette if no image asset is available.    |
| Name             | Bold, cream/gold text. Gothic serif font.                 |
| Faction/Title    | Smaller italic text beneath the name.                     |
| Invite Toggle    | A single button that toggles between "Invite" (outline)   |
|                  | and "Invited" (filled deep-red with gold check icon).     |
| Happiness Chip   | After options are selected, a small floating badge on the |
|                  | top-right corner of the card shows the guest's projected  |
|                  | happiness score (colour-coded green/yellow/red).          |

#### Interaction

- Clicking anywhere on the card toggles invitation.
- Maximum of 4 guests can be selected (the Ember Court limit). Once 4 are
  chosen, remaining cards dim and the Invite button is replaced with "Full"
  in muted text. A brief toast appears: "Party is full (4 guests)."
- A counter pill in the section heading reads "Guests (2/4)" and updates live.
- Selected cards get a glowing red/purple border animation to stand out.

#### Guest Data Tooltip

On hover (desktop) or long-press (mobile), a tooltip reveals the guest's
preference summary:

```
Likes:    Atoning Rituals, Sinstone Decor
Dislikes: Crude Humor, Light-themed items
```

This helps advanced users make manual picks without scrolling to results.

---

## 3. Option Selection

Four horizontal strips, one per category. Each strip contains a row of
selectable option chips/pills.

### Layout per Category

```
ENTERTAINMENT
[Atoning Rituals] [Crude Humor] [Dredger Combats] [Musical Performance] ...
```

#### Chip Design

| State       | Style                                                        |
|-------------|--------------------------------------------------------------|
| Default     | Dark translucent card (#1a1025 at 80% opacity), light text,  |
|             | thin border (#3d2a50).                                       |
| Hovered     | Border brightens to gold, slight scale-up (1.03x).          |
| Selected    | Filled with deep Venthyr red (#6b1030), gold border,        |
|             | small check icon prepended to label.                         |
| Negative    | If the option would hurt a selected guest, a small red       |
|             | down-arrow icon appears on the chip before selection.        |
| Positive    | If the option would help a selected guest, a small green     |
|             | up-arrow icon appears.                                       |

#### Selection Rules

- Most categories allow exactly ONE selection (radio-button behaviour).
  Clicking a new chip in the same row deselects the previous one.
- The Staff category may allow selecting multiple staff members if the
  game data supports it; in that case, chips act as checkboxes with a
  max count noted in the heading ("Staff -- pick up to 3").
- When no guests are selected yet, the option strips still appear but
  the impact arrows are hidden. A muted note reads: "Select guests above
  to see happiness impact."

#### Real-Time Impact Indicators

As soon as at least one guest is invited:

- Each option chip shows a small aggregate indicator:
  - `+3` in green if the net effect across all invited guests is positive.
  - `-1` in red if net negative.
  - No indicator if neutral.
- This is calculated on every change (guest added/removed, option changed)
  and rendered inline on the chip so users can scan quickly.

#### "Auto-Optimise" Button

Centred below the four option strips, a prominent gold-bordered button:

```
[ Calculate Best Options ]
```

Clicking it runs the optimiser algorithm and auto-selects the chips that
yield the highest total happiness. The user can then override any pick
manually, and the results update in real time.

---

## 4. Results Display

### Component: Results Dashboard

Sits below the options section. Updates live as guests/options change.

#### 4a. Summary Bar

A wide horizontal bar showing the overall happiness total.

```
+-----------------------------------------------------------+
|  TOTAL HAPPINESS:   32 / 40      [=========>     ] 80%    |
|  Reputation Tier:   Best Friends  (gold)                  |
+-----------------------------------------------------------+
```

- The progress bar is styled as a Venthyr-themed anima bar (gradient from
  deep purple to bright red to gold at 100%).
- Reputation tier label is colour-coded:
  - Hostile / Uncomfortable: red
  - Neutral: grey
  - Comfortable: yellow
  - Excited / Best Friends: gold with glow

#### 4b. Per-Guest Breakdown Cards

Below the summary, one card per invited guest, laid out in a horizontal
row (desktop) or vertical stack (mobile).

```
+-----------------------------+
|  [Portrait]                 |
|  Baroness Vashj             |
|  Happiness: 9 / 10         |
|  [=====>    ]               |
|                             |
|  + Atoning Rituals    (+3)  |
|  + Sinstone Decor     (+2)  |
|  - Crude Humor        (-1)  |
|  ~ Dredger Staff      ( 0)  |
+-----------------------------+
```

| Element               | Detail                                               |
|-----------------------|------------------------------------------------------|
| Portrait + Name       | Same as guest card, smaller (60x60).                 |
| Happiness Score       | Numeric + progress bar.                              |
| Line Items            | Each selected option listed with its individual      |
|                       | happiness impact for this guest. Green plus for      |
|                       | positive, red minus for negative, grey tilde for     |
|                       | neutral. Sorted by impact descending.                |
| Warning Icon          | If any selected option causes a negative reaction,   |
|                       | a caution triangle appears on the card header.       |

#### 4c. Recommendation Notes (Optional)

If the user has manually picked sub-optimal options, a small note appears:

> "Swapping Crude Humor for Musical Performance would increase total
> happiness by +4. [Apply suggestion]"

The "[Apply suggestion]" link is a clickable action that makes the swap
and updates the dashboard instantly.

---

## 5. Visual Theme -- Venthyr / Gothic Aesthetic

### Colour Palette

| Token               | Hex       | Usage                                      |
|----------------------|-----------|--------------------------------------------|
| `--bg-primary`       | `#0e0a14` | Page background                            |
| `--bg-card`          | `#1a1025` | Card / panel backgrounds                   |
| `--bg-card-hover`    | `#241635` | Card hover state                           |
| `--border-subtle`    | `#3d2a50` | Default borders, dividers                  |
| `--accent-red`       | `#8b1a3a` | Primary action colour, selected states     |
| `--accent-red-light` | `#c62d5b` | Hover on primary actions                   |
| `--accent-gold`      | `#d4a843` | Headings, highlights, premium indicators   |
| `--accent-gold-glow` | `#f5d26b` | Glow effects, active borders               |
| `--text-primary`     | `#e8dfd0` | Body text                                  |
| `--text-secondary`   | `#9a8eb0` | Muted / helper text                        |
| `--text-heading`     | `#f0e6d2` | Section headings                           |
| `--positive`         | `#4caf50` | Happiness gains                            |
| `--negative`         | `#e53935` | Happiness losses                           |
| `--neutral`          | `#78748c` | Neutral impacts                            |

### Typography

| Role        | Font                          | Weight    | Size (desktop) |
|-------------|-------------------------------|-----------|----------------|
| Logo/Title  | "Cinzel Decorative" (Google)  | 700       | 2.5rem         |
| Headings    | "Cinzel" (Google)             | 600       | 1.5rem         |
| Body        | "Raleway" (Google)            | 400       | 1rem           |
| Mono/Data   | "Fira Code" or system mono    | 400       | 0.875rem       |

Fallback stack: `serif` for decorative, `sans-serif` for body.

### Decorative Elements

- **Background**: Subtle tiling texture of dark stone or velvet fabric at
  very low opacity (5-8%) behind the main bg colour so it feels rich
  without distracting.
- **Section Dividers**: Thin gold `<hr>` elements with a central diamond
  ornament (CSS pseudo-element or inline SVG).
- **Card Borders**: 1px solid `--border-subtle`, with a 2px `--accent-gold`
  border on hover/selected, paired with a faint `box-shadow` glow.
- **Scrollbar**: Custom-styled (WebKit) to match the dark theme -- thin,
  purple track, red thumb.
- **Tooltips**: Dark card background with gold top-border accent, small
  drop shadow.
- **Animations**: Keep minimal to avoid performance issues.
  - Card select: 200ms border-colour transition + subtle scale pulse.
  - Progress bars: 400ms width transition with ease-out.
  - Results update: 150ms fade-in when values change.

---

## 6. Responsive Design

### Breakpoints

| Name    | Width          | Behaviour                                       |
|---------|----------------|-------------------------------------------------|
| Desktop | >= 1024px      | Full layout as described. 3-col guest grid.     |
| Tablet  | 600px - 1023px | 2-col guest grid. Option chips wrap to 2 rows.  |
|         |                | Results cards stack in 2x2 grid.                |
| Mobile  | < 600px        | 1-col everything. Accordion panels. Sticky bar. |

### Mobile-Specific Adaptations

1. **Sticky Bottom Bar**
   Persistent bar (48px tall) at the bottom of the viewport displaying:
   ```
   Guests: 3/4  |  Happiness: 27  |  [ Optimise ]
   ```
   Tapping "Optimise" scrolls to results and runs the calculator.

2. **Accordion Sections**
   Each section (Guest Selection, Entertainment, Refreshments, etc.) is a
   collapsible accordion panel. Tapping the heading toggles it open/closed.
   Guest Selection and Results default to open; the four option categories
   default to closed to save vertical space.

3. **Guest Cards -- Compact Mode**
   On mobile, guest cards become horizontal list items instead of tall cards:
   ```
   [Portrait] Baroness Vashj          [ Invite ]
   ```
   This reduces vertical scroll significantly with 15+ guests.

4. **Option Chips -- Horizontal Scroll**
   On mobile, each category's chips sit in a horizontal scroll container
   (overflow-x: auto) instead of wrapping, so the user swipes through them.
   A subtle gradient fade on the right edge signals more content.

5. **Touch Targets**
   All interactive elements have a minimum tap target of 44x44px per
   WCAG guidelines.

---

## 7. Interaction Flow

### Primary Flow: Guided but Non-Linear

The app is **not** a strict wizard. All sections are visible (or accessible)
at once so experienced users can jump around. However, the visual hierarchy
and numbering guide new users top-to-bottom.

```
Step 1: Select Guests
         |
         v
Step 2: Review option chips (impact arrows now visible)
         |
         v
Step 3: Either manually pick options  --OR--  click "Calculate Best Options"
         |
         v
Step 4: Review Results Dashboard
         |
         v
Step 5: (Optional) Tweak options, read suggestions, re-optimise
```

### Detailed Interaction Scenarios

#### Scenario A -- Quick Optimise (most common)

1. User checks 3 guest cards.
2. User clicks "Calculate Best Options".
3. All four option categories auto-fill with optimal picks.
4. Results dashboard populates. User reads the breakdown and is done.

#### Scenario B -- Manual Tinkering

1. User checks 2 guest cards.
2. User manually selects an entertainment option (sees the +/- indicators).
3. User selects refreshments, decorations, and staff one by one.
4. Results dashboard updates after each pick (real-time, no submit button).
5. User notices a suggestion note and clicks "Apply suggestion" to swap one
   option for a better one.

#### Scenario C -- Changing Guests Mid-Flow

1. User has fully configured a party and sees results.
2. User un-invites one guest and invites a different one.
3. All impact indicators on option chips update instantly.
4. Results dashboard recalculates. If the user had used auto-optimise, the
   previously auto-selected options remain (they are not re-optimised
   automatically to avoid surprising the user). A note appears:
   "Guest list changed. [Re-optimise?]"

### State Persistence

- All selections (guests + options) are stored in `localStorage` so that
  refreshing the page does not lose progress.
- A "Reset All" button in the header (with a confirmation dialog) clears
  everything.

### Empty / Zero States

| State                     | Display                                          |
|---------------------------|--------------------------------------------------|
| No guests selected        | Option strips visible but muted. Results panel   |
|                           | shows: "Invite at least one guest to begin."     |
| Guests selected, no opts  | Results panel shows base happiness (0) and       |
|                           | prompts: "Pick options or click Optimise."       |
| All options chosen        | Full results. No additional prompts.             |

---

## 8. Accessibility Considerations

- All interactive elements are keyboard-navigable (`tabindex`, `:focus-visible`
  styles with gold outline).
- ARIA roles: guest cards use `role="checkbox"`, option chips use
  `role="radio"` (or `role="checkbox"` for multi-select categories).
- Colour is never the sole indicator of state; icons (check, arrow, triangle)
  accompany colour changes.
- Contrast ratios meet WCAG AA: `--text-primary` on `--bg-primary` is
  approximately 11:1; `--accent-gold` on `--bg-card` is approximately 7:1.
- `prefers-reduced-motion` media query disables all transitions/animations.

---

## 9. Component Inventory

A summary of the distinct UI components to implement:

| Component             | Type        | Notes                                   |
|-----------------------|-------------|-----------------------------------------|
| `Header`              | Static      | Logo, title, reset button               |
| `GuestCard`           | Interactive | Toggle-able, shows happiness badge      |
| `GuestGrid`           | Layout      | Responsive grid of GuestCards           |
| `CategoryStrip`       | Layout      | Label + row of OptionChips              |
| `OptionChip`          | Interactive | Selectable, shows impact indicator      |
| `OptimiseButton`      | Interactive | Triggers calculation, gold CTA          |
| `ResultsSummaryBar`   | Data        | Total happiness, progress bar, tier     |
| `GuestBreakdownCard`  | Data        | Per-guest score + line-item impacts     |
| `SuggestionNote`      | Data        | Actionable improvement hint             |
| `StickyMobileBar`     | Layout      | Mobile-only persistent summary          |
| `Tooltip`             | Overlay     | Guest preferences on hover/long-press   |
| `Toast`               | Overlay     | Brief notifications ("Party full" etc.) |
| `Footer`              | Static      | Credits, links                          |

---

## 10. Technical Notes

- **No framework required.** The app is small enough for vanilla HTML, CSS,
  and JavaScript. The existing `css/` and `js/` directories suggest this
  approach.
- **Data Layer:** Guest preference data should live in a JSON file
  (`js/data.json` or `js/guests.js`) so it can be updated independently
  of UI logic.
- **Optimiser Logic:** A brute-force search over all option combinations is
  feasible because the number of options per category is small (typically
  4-8 per category, 4 categories = at most ~4096 combinations). No need
  for complex algorithms.
- **No backend needed.** Everything runs client-side.
- **Testing:** Manual cross-browser testing on Chrome, Firefox, Safari, and
  mobile Safari / Chrome. No build step required.

---

## Appendix: Wireframe Sketches (ASCII)

### Desktop (>= 1024px)

```
+================================================================+
|  [logo]   EMBER COURT CALCULATOR              [ Reset All ]    |
|----------------------------------------------------------------|
|                                                                |
|  GUESTS (2/4)                                                  |
|  +------------+  +------------+  +------------+                |
|  | [portrait] |  | [portrait] |  | [portrait] |  ...          |
|  |  Vashj     |  |  Theotar   |  |  Droman    |               |
|  | [INVITED]  |  | [ Invite ] |  | [ Invite ] |               |
|  +------------+  +------------+  +------------+                |
|                                                                |
|  -----<>-----  ENTERTAINMENT  -----<>-----                    |
|  [Atoning +2] [Crude -1] [Dredger +1] [Musical +3]            |
|                                                                |
|  -----<>-----  REFRESHMENTS  -----<>-----                     |
|  [Maldraxxus Feast +1] [Sinfall Vintage +2] [Tea Party 0]     |
|                                                                |
|  -----<>-----  DECORATIONS  -----<>-----                      |
|  [Sinstone +3] [Floral -1] [Dark Gothic +2] [Minimal 0]       |
|                                                                |
|  -----<>-----  STAFF  -----<>-----                            |
|  [Dredger +1] [Venthyr Noble +2] [Stoneborn 0]                |
|                                                                |
|             [ *  Calculate Best Options  * ]                   |
|                                                                |
|  ==============  RESULTS  ==============                       |
|  | TOTAL HAPPINESS:  27 / 40   [========>      ] 68%   |       |
|  | Reputation Tier:  Comfortable                       |       |
|                                                                |
|  +-------------+  +-------------+  +-------------+             |
|  | Vashj       |  | Theotar     |  |             |             |
|  | 9/10        |  | 7/10        |  |  (empty)    |             |
|  | +Atoning +3 |  | +Music  +2  |  |             |             |
|  | +Sinst. +2  |  | -Crude  -1  |  |             |             |
|  | -Crude  -1  |  | +Sinst. +2  |  |             |             |
|  +-------------+  +-------------+  +-------------+             |
|                                                                |
|  Suggestion: Swap "Crude Humor" for "Musical Performance"      |
|  for +4 total happiness. [Apply]                               |
|                                                                |
+================================================================+
|  Data sourced from Wowpedia. Not affiliated with Blizzard.     |
+================================================================+
```

### Mobile (< 600px)

```
+==============================+
|  EMBER COURT CALCULATOR      |
|------------------------------|
|  v GUESTS (2/4)              |
|  [pic] Vashj      [INVITED] |
|  [pic] Theotar    [ Invite ] |
|  [pic] Droman     [ Invite ] |
|  ...                         |
|------------------------------|
|  > ENTERTAINMENT             |
|  > REFRESHMENTS              |
|  > DECORATIONS               |
|  > STAFF                     |
|------------------------------|
|  v RESULTS                   |
|  Total: 27/40  Comfortable   |
|  [========>           ]      |
|  +------------------------+  |
|  | Vashj   9/10          |  |
|  | +Atoning +3           |  |
|  | +Sinstone +2          |  |
|  +------------------------+  |
|  +------------------------+  |
|  | Theotar  7/10         |  |
|  | +Music +2             |  |
|  +------------------------+  |
+==============================+
| Guests: 2/4 | Hap: 27 | [Go]|
+==============================+
  ^-- sticky bottom bar
```

---

*End of UI plan.*
