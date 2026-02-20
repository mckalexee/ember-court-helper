# Dimension Colors -- Design

> Feature 006. Created 2026-02-20.

## Problem Statement

All five atmosphere dimensions currently share the same generic green/red coloring (positive `#4caf50`, negative `#e53935`). This causes two problems:

1. **Visual monotony** -- dimension tags on guest cards, amenity chips, and the results panel all look identical, making it hard to scan and cross-reference which dimensions are at play.
2. **Misleading semantics in Net Atmosphere** -- a value like "-1 Messy" is shown in red, which implies something is wrong. But "Messy" is simply the state of the court on that axis. It is only bad if a guest *dislikes* it. The red color conflates "what the atmosphere is" with "whether it is good or bad for someone."

## Design

### Color Palette

Five distinct dimension colors, chosen to:
- Be visually distinguishable from each other on dark backgrounds (`#0e0a14` / `#1a1025`).
- Avoid clashing with existing accent red (`#8b1a3a`), accent gold (`#d4a843`), and faction colors.
- Carry thematic associations with each dimension.
- Maintain a WCAG AA contrast ratio (~4.5:1+) against the dark panel background.

| Dimension     | Color Name  | Hex       | Rationale                                        |
|---------------|-------------|-----------|--------------------------------------------------|
| Cleanliness   | Teal        | `#4dd0c8` | Clean water / hygiene association                |
| Danger        | Orange      | `#e8913a` | Warning/hazard tone; distinct from accent red    |
| Decadence     | Violet      | `#c77dff` | Luxury, royalty, indulgence                      |
| Excitement    | Amber       | `#f5d26b` | Energy, electricity, sparks                      |
| Formality     | Steel Blue  | `#6ba3d9` | Structured, composed, orderly                   |

**Contrast check against `#1a1025`:**
- `#4dd0c8` (Teal): ~8.5:1
- `#e8913a` (Orange): ~6.3:1
- `#c77dff` (Violet): ~5.8:1
- `#f5d26b` (Amber): ~10.5:1
- `#6ba3d9` (Steel Blue): ~5.6:1

All pass WCAG AA (4.5:1).

**Collision avoidance:**
- Teal (`#4dd0c8`) is distinct from Necrolord green (`#6bbd5b`) -- cyan vs yellow-green.
- Orange (`#e8913a`) is distinct from accent red (`#8b1a3a`) -- warm orange vs deep crimson.
- Violet (`#c77dff`) is distinct from Night Fae purple (`#8c6bbf`) -- lighter and pinker.
- Amber (`#f5d26b`) matches the existing `--accent-gold-light` which is fine since it is not used for faction identity. Reuse strengthens visual consistency.
- Steel Blue (`#6ba3d9`) is close to Kyrian blue (`#5ba3d9`) -- acceptable since they never appear in the same context (faction badges vs dimension labels).

### CSS Variables

Add to `:root` in `css/styles.css`, after the existing semantic color block (after line 34):

```css
/* Dimension colours */
--dim-cleanliness: #4dd0c8;
--dim-danger:      #e8913a;
--dim-decadence:   #c77dff;
--dim-excitement:  #f5d26b;
--dim-formality:   #6ba3d9;
```

### Net Atmosphere Display Fix

**Current behavior (lines 1198-1221 of app.js):**
- A negative net value like `cleanliness: -1` renders as `"-1 Messy"` in red.
- A positive net value like `cleanliness: +1` renders as `"+1 Clean"` in green.
- Zero renders as `"Neutral"` in gray.

**Problem:** The sign and color suggest good/bad, but the net atmosphere is just a fact about the court state. "-1 Messy" in red looks like an error, but it is only bad *if a guest wants Clean*.

**New behavior:**
- Non-zero values always display with a `"+"` prefix, since they represent *intensity* of the displayed quality: `"+1 Messy"`, `"+2 Clean"`.
- The color is the dimension's own color (e.g., teal for Cleanliness) regardless of sign.
- Zero stays as `"Neutral"` in `var(--neutral)` gray.

**Examples:**

| Net Value | Old Display       | Old Color | New Display      | New Color           |
|-----------|-------------------|-----------|------------------|---------------------|
| -1        | -1 Messy          | Red       | +1 Messy         | `--dim-cleanliness` |
| +2        | +2 Clean          | Green     | +2 Clean         | `--dim-cleanliness` |
| 0         | Neutral           | Gray      | Neutral          | `--neutral`         |

### Where Dimension Colors Apply

#### 1. Net Atmosphere values (results summary)

**File:** `css/styles.css` ~line 946-948, `js/app.js` ~line 1198-1221

Replace the generic `positive`/`negative`/`zero` classes on `.atmo-dim-value` with dimension-specific styling.

**CSS changes:** Replace:
```css
.atmo-dim-value.positive { color: var(--positive); }
.atmo-dim-value.negative { color: var(--negative); }
.atmo-dim-value.zero     { color: var(--neutral); }
```
With:
```css
.atmo-dim-value.dim-cleanliness { color: var(--dim-cleanliness); }
.atmo-dim-value.dim-danger      { color: var(--dim-danger); }
.atmo-dim-value.dim-decadence   { color: var(--dim-decadence); }
.atmo-dim-value.dim-excitement  { color: var(--dim-excitement); }
.atmo-dim-value.dim-formality   { color: var(--dim-formality); }
.atmo-dim-value.dim-neutral     { color: var(--neutral); }
```

**JS changes (app.js ~line 1198-1221):**
- Change `valClass` from `"positive"` / `"negative"` to `"dim-" + dim` for non-zero values, and `"dim-neutral"` for zero.
- Change `prefix` to always be `"+"` when `val !== 0`, using `Math.abs(val)` for the number.

```js
// Replace:
// let valClass = "zero";
// if (val > 0) { valClass = "positive"; }
// else if (val < 0) { valClass = "negative"; }
// const prefix = val > 0 ? "+" : val < 0 ? "-" : "";

// With:
let valClass = "dim-neutral";
if (val !== 0) { valClass = "dim-" + dim; }
const absVal = Math.abs(val);
const prefix = val !== 0 ? "+" : "";
```

#### 2. Amenity effect tags (amenity chips)

**File:** `css/styles.css` ~line 689-702, `js/app.js` ~line 1106-1111

Currently all effect tags get class `"effect-tag positive"` with green styling. Change to dimension-specific classes.

**CSS changes:** Replace `.effect-tag.positive` and `.effect-tag.negative` with per-dimension rules:
```css
.effect-tag.dim-cleanliness { background: rgba(77, 208, 200, 0.15); color: var(--dim-cleanliness); }
.effect-tag.dim-danger      { background: rgba(232, 145, 58, 0.15); color: var(--dim-danger); }
.effect-tag.dim-decadence   { background: rgba(199, 125, 255, 0.15); color: var(--dim-decadence); }
.effect-tag.dim-excitement  { background: rgba(245, 210, 107, 0.15); color: var(--dim-excitement); }
.effect-tag.dim-formality   { background: rgba(107, 163, 217, 0.15); color: var(--dim-formality); }
```

**JS changes (app.js ~line 1106-1111):**
```js
// Replace:
// '<span class="effect-tag positive">' + t.label + "</span>"
// With:
'<span class="effect-tag dim-' + t.dim + '">' + t.label + "</span>"
```

The `t.dim` property already exists on the tag objects returned by `amenityEffectTags()` (see line 641).

#### 3. Guest preference tags (guest cards)

**File:** `css/styles.css` ~line 326-351, `js/app.js` ~line 735-742

Currently `.pref-tag` uses generic muted styling (or gold when selected). Add dimension-specific color to the text.

**CSS changes:** Add per-dimension rules for non-conflict, non-selected pref tags:
```css
.pref-tag.dim-cleanliness { color: var(--dim-cleanliness); background: rgba(77, 208, 200, 0.10); }
.pref-tag.dim-danger      { color: var(--dim-danger);      background: rgba(232, 145, 58, 0.10); }
.pref-tag.dim-decadence   { color: var(--dim-decadence);   background: rgba(199, 125, 255, 0.10); }
.pref-tag.dim-excitement  { color: var(--dim-excitement);   background: rgba(245, 210, 107, 0.10); }
.pref-tag.dim-formality   { color: var(--dim-formality);    background: rgba(107, 163, 217, 0.10); }
```

On selected cards, keep the dimension colors (remove the gold override for pref-tags since the dimension colors are more informative). The conflict styling (`.pref-tag.conflict`) continues to override with red since conflicts are an important signal.

**JS changes (app.js ~line 741):**
```js
// Replace:
// return `<span class="pref-tag ${hasConflict ? "conflict" : ""}">${label}</span>`;
// With:
return `<span class="pref-tag dim-${dim} ${hasConflict ? "conflict" : ""}">${label}</span>`;
```

#### 4. Guest preference labels in breakdown (result cards)

**File:** `js/app.js` ~line 1292-1297

The "Wants **Clean**" / "Court: Messy" text in the result breakdown. Add dimension color to the "Wants" label to help identify which dimension is being discussed.

**JS changes (app.js ~line 1295):**
```js
// Replace:
// <span class="result-dim-label">Wants <strong>${prefLbl}</strong> &mdash; Court: ${netLabel}</span>
// With:
// <span class="result-dim-label">Wants <strong class="dim-${dim}">${prefLbl}</strong> &mdash; Court: <span class="dim-${dim}">${netLabel}</span></span>
```

**CSS:** Add generic dimension color class rules (these can also be reused elsewhere):
```css
.dim-cleanliness { color: var(--dim-cleanliness); }
.dim-danger      { color: var(--dim-danger); }
.dim-decadence   { color: var(--dim-decadence); }
.dim-excitement  { color: var(--dim-excitement); }
.dim-formality   { color: var(--dim-formality); }
```

### Where Colors Do NOT Change

- **Match/conflict scoring icons and values** (checkmark/X, +1/-1) in the guest breakdown cards stay green/red. These indicate whether a preference was *satisfied* or *violated*, which is a binary good/bad outcome -- exactly what green/red should communicate.
  - `.result-dim-icon.match` / `.result-dim-icon.conflict` -- stays `var(--positive)` / `var(--negative)`.
  - `.result-dim-value.match` / `.result-dim-value.conflict` -- stays `var(--positive)` / `var(--negative)`.
- **Total happiness bars** on guest cards -- stays green/red/gold gradient.
- **Conflict badges and conflict pref-tag styling** -- stays red. Conflicts are warnings.
- **Amenity impact indicators** (`+2`, `-1` below amenity chips) -- stays green/red since these indicate net benefit/harm to selected guests.

### Data Model Changes

None. All color information is purely presentational via CSS classes. The `dim` property already exists on effect tag objects from `amenityEffectTags()`.

### Algorithm / Logic

No scoring changes. The only logic changes are in the rendering functions:
- `renderResultsSummary()`: Change class names and sign display for net atmosphere values.
- `renderGuestBreakdowns()`: Add `dim-{name}` class to "Wants" labels.
- `renderAmenitySection()`: Use `dim-{name}` class on effect tags instead of `positive`.
- `renderGuestSection()`: Add `dim-{name}` class to pref-tags.

## Implementation Notes

### `css/styles.css`

1. Add 5 `--dim-*` custom properties to `:root` (after line 34).
2. Add 5 `.dim-{name}` utility classes for inline color use.
3. Replace `.effect-tag.positive` / `.effect-tag.negative` with 5 `.effect-tag.dim-{name}` rules.
4. Replace `.atmo-dim-value.positive` / `.atmo-dim-value.negative` / `.atmo-dim-value.zero` with 5 `.atmo-dim-value.dim-{name}` + `.atmo-dim-value.dim-neutral`.
5. Add 5 `.pref-tag.dim-{name}` rules. Update `.guest-card.selected .pref-tag` to not override dimension colors (or remove the gold override entirely, letting dimension colors show through on selected cards too). Keep `.pref-tag.conflict` override intact.

### `js/app.js`

1. `renderGuestSection()` (~line 741): Add `dim-${dim}` class to pref-tag `<span>`.
2. `renderAmenitySection()` (~line 1109): Change `"effect-tag positive"` to `"effect-tag dim-" + t.dim`.
3. `renderResultsSummary()` (~lines 1202-1215): Change `valClass` logic to use `"dim-" + dim` for non-zero, `"dim-neutral"` for zero. Change prefix to always `"+"` for non-zero.
4. `renderGuestBreakdowns()` (~line 1295): Wrap `prefLbl` and `netLabel` in `<strong class="dim-${dim}">` / `<span class="dim-${dim}">`.

## Open Questions

None. The design is straightforward and all data needed for implementation already exists in the codebase.
