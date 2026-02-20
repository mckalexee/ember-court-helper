# CLAUDE.md - Ember Court Calculator

## 1. Project Overview

Fan-made calculator and optimizer for the Ember Court, a Venthyr Covenant feature in World of Warcraft: Shadowlands. Players select guests and amenities; the tool scores happiness and can brute-force the optimal amenity combination.

- Vanilla HTML/CSS/JS. No framework, no bundler, no build step, no dependencies.
- Client-side only. All files are static. No server-side logic.
- Licensed MIT.

## 2. Architecture

### File Structure

```
ember-calculator/
  index.html          Entry point. Loads Google Fonts (Cinzel), css/styles.css, js/data.js, js/app.js.
  package.json        Metadata only. Scripts: "dev" and "start" both run `npx serve . -l 3000`.
  .gitignore          Ignores node_modules/, .DS_Store, Thumbs.db, *.log.
  research.md         Detailed game data research (sources, mechanics, full tables).
  CLAUDE.md           This file.
  css/
    styles.css        All styles. CSS custom properties for theming. Responsive breakpoints at 1023px, 640px, 400px.
  js/
    data.js           Game data. Defines frozen global `EmberCourtData`. Must load before app.js.
    app.js            Application logic. IIFE pattern exposing `App` module with single public method `init()`.
```

### Load Order

1. `data.js` loads first via `<script>` tag, exposes `EmberCourtData` as a frozen global object.
2. `app.js` loads second, captures `EmberCourtData` into local `DATA` constant.
3. On `DOMContentLoaded`, `App.init()` is called. It grabs `#app-root`, calls `loadState()` from localStorage, then `render()`.

### Rendering Model

- All UI inside `#app-root` is rendered via `innerHTML` concatenation (string templates).
- `render()` does a full re-render on every state change: builds HTML from `renderGuestSection()`, `renderAmenitySection()`, `renderOptimizeButton()`, `renderResultsSection()`, joins them, sets `root.innerHTML`.
- After each render, `bindEvents()` attaches click and keydown listeners to all interactive elements.
- The header (title, reset button) and footer are static HTML in index.html, outside `#app-root`.

### State Management

- `selectedGuests`: array of 4 elements (one per RSVP slot), each is a guest ID string or null.
- `selectedAmenities`: object with keys `entertainment`, `refreshment`, `decoration`, `security`, each is an amenity ID string or null.
- State is persisted to `localStorage` under key `"ember-court-calc-state"` via `saveState()` after every change.
- `loadState()` restores on init. `resetAll()` clears both arrays and saves.

## 3. Key Data Structures

All data lives in `EmberCourtData` (defined in `js/data.js`, frozen with `Object.freeze`).

### `EmberCourtData.dimensions`
Array of 5 string keys: `["cleanliness", "danger", "decadence", "excitement", "formality"]`.

### `EmberCourtData.dimensionLabels`
Object mapping each dimension to `{ negative, positive }` labels. E.g., `cleanliness: { negative: "Messy", positive: "Clean" }`.

### `EmberCourtData.guests`
Array of 16 guest objects:
```js
{ id: string, name: string, faction: string, slot: number,
  preferences: { cleanliness: 0|1|-1, danger: 0|1|-1, ... } }
```
- `id`: short lowercase key (e.g., `"kassir"`, `"vashj"`).
- `faction`: one of `"Venthyr"`, `"Necrolord"`, `"Night Fae"`, `"Kyrian"`.
- `slot`: 1-4 (which RSVP slot the guest belongs to).
- `preferences`: +1 means likes the positive pole, -1 means likes the negative pole, 0 means no opinion.

### `EmberCourtData.amenities`
Array of 12 amenity objects:
```js
{ id: string, name: string, category: string,
  effects: { cleanliness: 0|1|-1, danger: 0|1|-1, ... } }
```
- `category`: one of `"entertainment"`, `"refreshment"`, `"decoration"`, `"security"`.
- `effects`: +1 pushes toward positive pole, -1 pushes toward negative pole, 0 no effect. Each amenity affects exactly 2 dimensions.

### `EmberCourtData.slots`
Array of 4 slot objects: `{ id: number, name: string, guestIds: string[] }`. Each slot has exactly 4 guest IDs.

### `EmberCourtData.happinessLevels`
Array of 6 strings from worst to best: `["Miserable", "Unhappy", "Uncomfortable", "Comfortable", "Happy", "Elated"]`. Not currently used in scoring logic but available for display.

### `EmberCourtData.meta`
`{ maxGuestsPerSlot: 1, totalSlots: 4 }`.

## 4. Scoring Algorithm

All scoring functions are in `js/app.js`.

### `computeNetAtmosphere(amenitySelections)`
- Takes the `selectedAmenities` object (or any object mapping category to amenity ID).
- Initializes all 5 dimensions to 0.
- For each selected amenity, adds its `effects[dim]` value to the corresponding dimension.
- Returns an object like `{ cleanliness: 1, danger: -1, decadence: 0, excitement: 0, formality: 2 }`.

### `scoreGuest(guest, netAtmosphere)`
- For each of the 5 dimensions:
  - If `guest.preferences[dim] === 0` (no opinion): result = 0.
  - If `netAtmosphere[dim] === 0` (neutral atmosphere): result = 0.
  - If `Math.sign(pref) === Math.sign(net)`: result = +1 (match).
  - Otherwise: result = -1 (conflict).
- Returns `{ total: number, details: [{dim, prefValue, netValue, result}] }`.

### `totalHappiness(guestIds, amenitySelections)`
- Computes net atmosphere, then sums `scoreGuest().total` across all non-null guest IDs.

### `amenityImpactForGuests(amenity)`
- Quick heuristic shown on amenity chips. For each selected guest and each dimension, checks if the amenity's effect on that dimension aligns with the guest's preference. Ignores other selected amenities (independent score).

### `optimize()`
- Brute-force over all 3^4 = 81 amenity combinations (3 options per 4 categories).
- Uses recursive enumeration (4 levels deep).
- Evaluates `totalHappiness()` for each combo against current `selectedGuests`.
- Picks the combo with the highest total score, applies it, saves state, and re-renders.

## 5. How to Run

**Option A: Direct file open**
Open `index.html` in any modern browser. No server required.

**Option B: Dev server**
```
npm run dev
```
Runs `npx serve . -l 3000`. Visit `http://localhost:3000`. No `npm install` needed (uses npx).

There is no build step, no compilation, no transpilation.

## 6. Development Conventions

### JavaScript
- Vanilla JS only. No frameworks, no libraries, no modules (classic script tags).
- Strict mode (`"use strict"`) in both files.
- `data.js` uses a frozen global constant. `app.js` uses an IIFE (revealing module pattern) exposing only `{ init }`.
- All DOM interaction is through `getElementById`, `querySelectorAll`, `innerHTML`.
- Event delegation is not used; listeners are re-attached after every render via `bindEvents()`.
- All interactive elements (guest cards, amenity chips) have `tabindex="0"` and keydown handlers for Enter/Space.

### CSS
- Design tokens via CSS custom properties in `:root` (see `css/styles.css` lines 7-54).
- Dark Venthyr theme colors:
  - Backgrounds: `#0e0a14` (primary), `#1a1025` (secondary/panels).
  - Accent red: `#8b1a3a`. Accent gold: `#d4a843`.
  - Text: `#e8dfd0` (primary), `#9a8eb0` (secondary).
- Faction colors: Venthyr `#c62d5b`, Necrolord `#6bbd5b`, Night Fae `#8c6bbf`, Kyrian `#5ba3d9`.
- Semantic colors: positive `#4caf50`, negative `#e53935`, neutral `#78748c`.
- Cinzel font (Google Fonts CDN) for headings and UI labels.
- System font stack for body text.
- Responsive breakpoints: 1023px (tablet), 640px (mobile), 400px (small mobile).
- `prefers-reduced-motion` support disables animations.

### State Persistence
- localStorage key: `"ember-court-calc-state"`.
- Stored as JSON: `{ selectedGuests: [...], selectedAmenities: {...} }`.
- Wrapped in try/catch for environments where localStorage is unavailable.

## 7. Game Data Reference

- **16 guests** across 4 RSVP slots (4 guests per slot, player picks 1 per slot).
  - Slot 1 (Tier 1): 1 preference each.
  - Slot 2 (Tier 2): 1 preference each.
  - Slot 3 (Tier 3): 2 preferences each.
  - Slot 4 (Tier 4): 3 preferences each.
- **12 amenities**: 3 per category (Entertainment, Refreshment, Decoration, Security).
- **5 atmosphere dimensions**: Cleanliness (Messy/Clean), Danger (Safe/Dangerous), Decadence (Humble/Decadent), Excitement (Relaxing/Exciting), Formality (Casual/Formal).
- Each amenity affects exactly 2 dimensions (+1 or -1 each).
- Each guest has 1-3 non-zero preferences (+1 or -1).
- Detailed research, synergy tables, and source links are in `research.md`.

## 8. Common Tasks

### Adding a new guest
1. Add an object to `EmberCourtData.guests` in `js/data.js` with `id`, `name`, `faction`, `slot`, and `preferences`.
2. Add the guest's `id` to the appropriate slot's `guestIds` array in `EmberCourtData.slots`.

### Adding a new amenity
1. Add an object to `EmberCourtData.amenities` in `js/data.js` with `id`, `name`, `category`, and `effects`.
2. If the category is new, also add it to the `CATEGORIES` array in `js/app.js`.

### Modifying theme colors
Update CSS custom properties in `:root` in `css/styles.css` (lines 7-54).

### Changing scoring logic
Modify `scoreGuest()` in `js/app.js` (around line 111). The current logic is: for each dimension, if both guest preference and net atmosphere are non-zero, +1 for sign match, -1 for sign mismatch.

### Changing the optimizer
Modify `optimize()` in `js/app.js` (around line 180). Currently brute-forces all 81 combinations. If amenity count grows, this may need a smarter algorithm.

### Adding a new amenity category
1. Add amenities with the new category key to `EmberCourtData.amenities` in `js/data.js`.
2. Add the category to the `CATEGORIES` array in `js/app.js` (around line 51).
3. Add the category key with `null` default to `selectedAmenities` initialization and `resetAll()` in `js/app.js`.
