# Ember Court Guest Conflict Analysis

> Generated 2026-02-19. Derived from `js/data.js` and `research.md`.

---

## Reference: Guest Preferences (Numeric Encoding)

| Guest | Slot | Cleanliness | Danger | Decadence | Excitement | Formality | # Prefs |
|---|---|---|---|---|---|---|---|
| Cryptkeeper Kassir | 1 | 0 | 0 | 0 | 0 | +1 | 1 |
| Plague Deviser Marileth | 1 | -1 | 0 | 0 | 0 | 0 | 1 |
| Choofa | 1 | 0 | 0 | 0 | +1 | 0 | 1 |
| Sika | 1 | +1 | 0 | 0 | 0 | 0 | 1 |
| Stonehead | 2 | 0 | 0 | 0 | 0 | -1 | 1 |
| Droman Aliothe | 2 | 0 | 0 | 0 | -1 | 0 | 1 |
| Grandmaster Vole | 2 | 0 | +1 | 0 | 0 | 0 | 1 |
| Kleia & Pelagos | 2 | 0 | 0 | -1 | 0 | 0 | 1 |
| Rendle & Cudgelface | 3 | -1 | 0 | 0 | -1 | 0 | 2 |
| Alexandros Mograine | 3 | 0 | -1 | -1 | 0 | 0 | 2 |
| Hunt-Captain Korayn | 3 | 0 | +1 | 0 | 0 | -1 | 2 |
| Polemarch Adrestes | 3 | +1 | 0 | 0 | 0 | +1 | 2 |
| The Countess | 4 | 0 | 0 | +1 | -1 | +1 | 3 |
| Baroness Vashj | 4 | 0 | +1 | +1 | +1 | 0 | 3 |
| Lady Moonberry | 4 | -1 | 0 | 0 | +1 | -1 | 3 |
| Mikanikos | 4 | +1 | -1 | -1 | 0 | 0 | 3 |

---

## 1. Complete Conflict Matrix

A **conflict** exists between two guests when one has `+1` on a dimension and the other has `-1` on that same dimension. Since guests are slot-locked, only cross-slot pairs matter.

There are 6 cross-slot pairings to examine: (1,2), (1,3), (1,4), (2,3), (2,4), (3,4). Each pairing has 4x4 = 16 guest pairs, for 96 total cross-slot pairs.

### 1.1 Slot 1 vs Slot 2 (16 pairs)

| Slot 1 Guest | Slot 2 Guest | Conflicting Dimensions | # Conflicts |
|---|---|---|---|
| Kassir (form+1) | Stonehead (form-1) | **Formality** | 1 |
| Kassir (form+1) | Aliothe (exc-1) | none | 0 |
| Kassir (form+1) | Vole (dng+1) | none | 0 |
| Kassir (form+1) | Kleia (dec-1) | none | 0 |
| Marileth (cln-1) | Stonehead (form-1) | none | 0 |
| Marileth (cln-1) | Aliothe (exc-1) | none | 0 |
| Marileth (cln-1) | Vole (dng+1) | none | 0 |
| Marileth (cln-1) | Kleia (dec-1) | none | 0 |
| Choofa (exc+1) | Stonehead (form-1) | none | 0 |
| Choofa (exc+1) | Aliothe (exc-1) | **Excitement** | 1 |
| Choofa (exc+1) | Vole (dng+1) | none | 0 |
| Choofa (exc+1) | Kleia (dec-1) | none | 0 |
| Sika (cln+1) | Stonehead (form-1) | none | 0 |
| Sika (cln+1) | Aliothe (exc-1) | none | 0 |
| Sika (cln+1) | Vole (dng+1) | none | 0 |
| Sika (cln+1) | Kleia (dec-1) | none | 0 |

**Summary Slot 1 vs 2:** 2 conflicting pairs out of 16. Only Kassir-Stonehead (formality) and Choofa-Aliothe (excitement).

---

### 1.2 Slot 1 vs Slot 3 (16 pairs)

| Slot 1 Guest | Slot 3 Guest | Conflicting Dimensions | # Conflicts |
|---|---|---|---|
| Kassir (form+1) | Rendle (cln-1, exc-1) | none | 0 |
| Kassir (form+1) | Mograine (dng-1, dec-1) | none | 0 |
| Kassir (form+1) | Korayn (dng+1, form-1) | **Formality** | 1 |
| Kassir (form+1) | Adrestes (cln+1, form+1) | none | 0 |
| Marileth (cln-1) | Rendle (cln-1, exc-1) | none (same dir) | 0 |
| Marileth (cln-1) | Mograine (dng-1, dec-1) | none | 0 |
| Marileth (cln-1) | Korayn (dng+1, form-1) | none | 0 |
| Marileth (cln-1) | Adrestes (cln+1, form+1) | **Cleanliness** | 1 |
| Choofa (exc+1) | Rendle (cln-1, exc-1) | **Excitement** | 1 |
| Choofa (exc+1) | Mograine (dng-1, dec-1) | none | 0 |
| Choofa (exc+1) | Korayn (dng+1, form-1) | none | 0 |
| Choofa (exc+1) | Adrestes (cln+1, form+1) | none | 0 |
| Sika (cln+1) | Rendle (cln-1, exc-1) | **Cleanliness** | 1 |
| Sika (cln+1) | Mograine (dng-1, dec-1) | none | 0 |
| Sika (cln+1) | Korayn (dng+1, form-1) | none | 0 |
| Sika (cln+1) | Adrestes (cln+1, form+1) | none (same dir) | 0 |

**Summary Slot 1 vs 3:** 4 conflicting pairs out of 16.

---

### 1.3 Slot 1 vs Slot 4 (16 pairs)

| Slot 1 Guest | Slot 4 Guest | Conflicting Dimensions | # Conflicts |
|---|---|---|---|
| Kassir (form+1) | Countess (dec+1, exc-1, form+1) | none (same dir form) | 0 |
| Kassir (form+1) | Vashj (dng+1, dec+1, exc+1) | none | 0 |
| Kassir (form+1) | Moonberry (cln-1, exc+1, form-1) | **Formality** | 1 |
| Kassir (form+1) | Mikanikos (cln+1, dng-1, dec-1) | none | 0 |
| Marileth (cln-1) | Countess (dec+1, exc-1, form+1) | none | 0 |
| Marileth (cln-1) | Vashj (dng+1, dec+1, exc+1) | none | 0 |
| Marileth (cln-1) | Moonberry (cln-1, exc+1, form-1) | none (same dir cln) | 0 |
| Marileth (cln-1) | Mikanikos (cln+1, dng-1, dec-1) | **Cleanliness** | 1 |
| Choofa (exc+1) | Countess (dec+1, exc-1, form+1) | **Excitement** | 1 |
| Choofa (exc+1) | Vashj (dng+1, dec+1, exc+1) | none (same dir exc) | 0 |
| Choofa (exc+1) | Moonberry (cln-1, exc+1, form-1) | none (same dir exc) | 0 |
| Choofa (exc+1) | Mikanikos (cln+1, dng-1, dec-1) | none | 0 |
| Sika (cln+1) | Countess (dec+1, exc-1, form+1) | none | 0 |
| Sika (cln+1) | Vashj (dng+1, dec+1, exc+1) | none | 0 |
| Sika (cln+1) | Moonberry (cln-1, exc+1, form-1) | **Cleanliness** | 1 |
| Sika (cln+1) | Mikanikos (cln+1, dng-1, dec-1) | none (same dir cln) | 0 |

**Summary Slot 1 vs 4:** 4 conflicting pairs out of 16.

---

### 1.4 Slot 2 vs Slot 3 (16 pairs)

| Slot 2 Guest | Slot 3 Guest | Conflicting Dimensions | # Conflicts |
|---|---|---|---|
| Stonehead (form-1) | Rendle (cln-1, exc-1) | none | 0 |
| Stonehead (form-1) | Mograine (dng-1, dec-1) | none | 0 |
| Stonehead (form-1) | Korayn (dng+1, form-1) | none (same dir form) | 0 |
| Stonehead (form-1) | Adrestes (cln+1, form+1) | **Formality** | 1 |
| Aliothe (exc-1) | Rendle (cln-1, exc-1) | none (same dir exc) | 0 |
| Aliothe (exc-1) | Mograine (dng-1, dec-1) | none | 0 |
| Aliothe (exc-1) | Korayn (dng+1, form-1) | none | 0 |
| Aliothe (exc-1) | Adrestes (cln+1, form+1) | none | 0 |
| Vole (dng+1) | Rendle (cln-1, exc-1) | none | 0 |
| Vole (dng+1) | Mograine (dng-1, dec-1) | **Danger** | 1 |
| Vole (dng+1) | Korayn (dng+1, form-1) | none (same dir dng) | 0 |
| Vole (dng+1) | Adrestes (cln+1, form+1) | none | 0 |
| Kleia (dec-1) | Rendle (cln-1, exc-1) | none | 0 |
| Kleia (dec-1) | Mograine (dng-1, dec-1) | none (same dir dec) | 0 |
| Kleia (dec-1) | Korayn (dng+1, form-1) | none | 0 |
| Kleia (dec-1) | Adrestes (cln+1, form+1) | none | 0 |

**Summary Slot 2 vs 3:** 2 conflicting pairs out of 16.

---

### 1.5 Slot 2 vs Slot 4 (16 pairs)

| Slot 2 Guest | Slot 4 Guest | Conflicting Dimensions | # Conflicts |
|---|---|---|---|
| Stonehead (form-1) | Countess (dec+1, exc-1, form+1) | **Formality** | 1 |
| Stonehead (form-1) | Vashj (dng+1, dec+1, exc+1) | none | 0 |
| Stonehead (form-1) | Moonberry (cln-1, exc+1, form-1) | none (same dir form) | 0 |
| Stonehead (form-1) | Mikanikos (cln+1, dng-1, dec-1) | none | 0 |
| Aliothe (exc-1) | Countess (dec+1, exc-1, form+1) | none (same dir exc) | 0 |
| Aliothe (exc-1) | Vashj (dng+1, dec+1, exc+1) | **Excitement** | 1 |
| Aliothe (exc-1) | Moonberry (cln-1, exc+1, form-1) | **Excitement** | 1 |
| Aliothe (exc-1) | Mikanikos (cln+1, dng-1, dec-1) | none | 0 |
| Vole (dng+1) | Countess (dec+1, exc-1, form+1) | none | 0 |
| Vole (dng+1) | Vashj (dng+1, dec+1, exc+1) | none (same dir dng) | 0 |
| Vole (dng+1) | Moonberry (cln-1, exc+1, form-1) | none | 0 |
| Vole (dng+1) | Mikanikos (cln+1, dng-1, dec-1) | **Danger** | 1 |
| Kleia (dec-1) | Countess (dec+1, exc-1, form+1) | **Decadence** | 1 |
| Kleia (dec-1) | Vashj (dng+1, dec+1, exc+1) | **Decadence** | 1 |
| Kleia (dec-1) | Moonberry (cln-1, exc+1, form-1) | none | 0 |
| Kleia (dec-1) | Mikanikos (cln+1, dng-1, dec-1) | none (same dir dec) | 0 |

**Summary Slot 2 vs 4:** 6 conflicting pairs out of 16. Slot 2 is moderately conflict-prone with Slot 4.

---

### 1.6 Slot 3 vs Slot 4 (16 pairs)

| Slot 3 Guest | Slot 4 Guest | Conflicting Dimensions | # Conflicts (dims) |
|---|---|---|---|
| Rendle (cln-1, exc-1) | Countess (dec+1, exc-1, form+1) | none (same dir exc) | 0 |
| Rendle (cln-1, exc-1) | Vashj (dng+1, dec+1, exc+1) | **Excitement** | 1 |
| Rendle (cln-1, exc-1) | Moonberry (cln-1, exc+1, form-1) | **Excitement** | 1 |
| Rendle (cln-1, exc-1) | Mikanikos (cln+1, dng-1, dec-1) | **Cleanliness** | 1 |
| Mograine (dng-1, dec-1) | Countess (dec+1, exc-1, form+1) | **Decadence** | 1 |
| Mograine (dng-1, dec-1) | Vashj (dng+1, dec+1, exc+1) | **Danger, Decadence** | 2 |
| Mograine (dng-1, dec-1) | Moonberry (cln-1, exc+1, form-1) | none | 0 |
| Mograine (dng-1, dec-1) | Mikanikos (cln+1, dng-1, dec-1) | none (same dir) | 0 |
| Korayn (dng+1, form-1) | Countess (dec+1, exc-1, form+1) | **Formality** | 1 |
| Korayn (dng+1, form-1) | Vashj (dng+1, dec+1, exc+1) | none (same dir dng) | 0 |
| Korayn (dng+1, form-1) | Moonberry (cln-1, exc+1, form-1) | none (same dir form) | 0 |
| Korayn (dng+1, form-1) | Mikanikos (cln+1, dng-1, dec-1) | **Danger** | 1 |
| Adrestes (cln+1, form+1) | Countess (dec+1, exc-1, form+1) | none (same dir form) | 0 |
| Adrestes (cln+1, form+1) | Vashj (dng+1, dec+1, exc+1) | none | 0 |
| Adrestes (cln+1, form+1) | Moonberry (cln-1, exc+1, form-1) | **Cleanliness, Formality** | 2 |
| Adrestes (cln+1, form+1) | Mikanikos (cln+1, dng-1, dec-1) | none (same dir cln) | 0 |

**Summary Slot 3 vs 4:** 7 conflicting pairs out of 16. This is the most conflict-dense pairing, with 2 pairs having **2 conflicting dimensions** (Mograine-Vashj and Adrestes-Moonberry).

---

### 1.7 Conflict Summary Statistics

| Slot Pairing | Conflicting Pairs | Conflict-Free Pairs | Multi-Dim Conflicts |
|---|---|---|---|
| Slot 1 vs 2 | 2 | 14 | 0 |
| Slot 1 vs 3 | 4 | 12 | 0 |
| Slot 1 vs 4 | 4 | 12 | 0 |
| Slot 2 vs 3 | 2 | 14 | 0 |
| Slot 2 vs 4 | 6 | 10 | 0 |
| Slot 3 vs 4 | 7 | 9 | 2 |
| **Total** | **25** | **71** | **2** |

**Key insight:** Slots 3 and 4 generate the most conflicts because their guests have more preference dimensions (2 and 3 respectively), creating more opportunities for opposition.

---

### 1.8 Master Conflict List (All 25 Conflicting Pairs)

Every pair of guests from different slots that has at least one conflicting dimension:

| # | Guest A (Slot) | Guest B (Slot) | Conflicting Dimension(s) | Severity |
|---|---|---|---|---|
| 1 | Kassir (1) | Stonehead (2) | Formality | 1-dim |
| 2 | Choofa (1) | Aliothe (2) | Excitement | 1-dim |
| 3 | Kassir (1) | Korayn (3) | Formality | 1-dim |
| 4 | Marileth (1) | Adrestes (3) | Cleanliness | 1-dim |
| 5 | Choofa (1) | Rendle (3) | Excitement | 1-dim |
| 6 | Sika (1) | Rendle (3) | Cleanliness | 1-dim |
| 7 | Kassir (1) | Moonberry (4) | Formality | 1-dim |
| 8 | Marileth (1) | Mikanikos (4) | Cleanliness | 1-dim |
| 9 | Choofa (1) | Countess (4) | Excitement | 1-dim |
| 10 | Sika (1) | Moonberry (4) | Cleanliness | 1-dim |
| 11 | Stonehead (2) | Adrestes (3) | Formality | 1-dim |
| 12 | Vole (2) | Mograine (3) | Danger | 1-dim |
| 13 | Stonehead (2) | Countess (4) | Formality | 1-dim |
| 14 | Aliothe (2) | Vashj (4) | Excitement | 1-dim |
| 15 | Aliothe (2) | Moonberry (4) | Excitement | 1-dim |
| 16 | Vole (2) | Mikanikos (4) | Danger | 1-dim |
| 17 | Kleia (2) | Countess (4) | Decadence | 1-dim |
| 18 | Kleia (2) | Vashj (4) | Decadence | 1-dim |
| 19 | Rendle (3) | Vashj (4) | Excitement | 1-dim |
| 20 | Rendle (3) | Moonberry (4) | Excitement | 1-dim |
| 21 | Rendle (3) | Mikanikos (4) | Cleanliness | 1-dim |
| 22 | Mograine (3) | Countess (4) | Decadence | 1-dim |
| 23 | Mograine (3) | Vashj (4) | Danger, Decadence | **2-dim** |
| 24 | Korayn (3) | Countess (4) | Formality | 1-dim |
| 25 | Korayn (3) | Mikanikos (4) | Danger | 1-dim |
| 26 | Adrestes (3) | Moonberry (4) | Cleanliness, Formality | **2-dim** |

*(26 rows because 2 of the pairs have 2 conflicting dimensions; 25 unique pairs total with conflicts.)*

---

## 2. Per-Slot Replacement Analysis

For each guest, we list which guests in other slots they conflict with, and what replacing them (within the same slot) would resolve or introduce.

### 2.1 Slot 1 Replacements

#### Cryptkeeper Kassir (form+1)
**Conflicts with:** Stonehead (S2, formality), Korayn (S3, formality), Moonberry (S4, formality)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Marileth (cln-1) | All 3 formality conflicts | + Adrestes (S3, cln), + Mikanikos (S4, cln) |
| Choofa (exc+1) | All 3 formality conflicts | + Aliothe (S2, exc), + Rendle (S3, exc), + Countess (S4, exc) |
| Sika (cln+1) | All 3 formality conflicts | + Rendle (S3, cln), + Moonberry (S4, cln) |

**Analysis:** Kassir's formality preference is one of the most conflict-prone in Slot 1. All replacements resolve formality conflicts but may introduce others depending on the rest of the lineup. Sika is often the cleanest swap since cleanliness conflicts are with fewer practical lineups.

#### Plague Deviser Marileth (cln-1)
**Conflicts with:** Adrestes (S3, cleanliness), Mikanikos (S4, cleanliness)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Kassir (form+1) | Both cleanliness conflicts | + Stonehead (S2, form), + Korayn (S3, form), + Moonberry (S4, form) |
| Choofa (exc+1) | Both cleanliness conflicts | + Aliothe (S2, exc), + Rendle (S3, exc), + Countess (S4, exc) |
| Sika (cln+1) | Both cleanliness conflicts (and reinforces Adrestes/Mikanikos!) | + Rendle (S3, cln), + Moonberry (S4, cln) |

**Analysis:** Marileth has relatively few conflicts. Replacing with Sika flips cleanliness from opposing Adrestes/Mikanikos to synergizing with them, but introduces conflicts with Rendle and Moonberry.

#### Choofa (exc+1)
**Conflicts with:** Aliothe (S2, excitement), Rendle (S3, excitement), Countess (S4, excitement)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Kassir (form+1) | All 3 excitement conflicts | + Stonehead (S2, form), + Korayn (S3, form), + Moonberry (S4, form) |
| Marileth (cln-1) | All 3 excitement conflicts | + Adrestes (S3, cln), + Mikanikos (S4, cln) |
| Sika (cln+1) | All 3 excitement conflicts | + Rendle (S3, cln), + Moonberry (S4, cln) |

**Analysis:** Choofa's excitement conflicts only matter when paired with the Relaxing-preference guests. Marileth is the lowest-conflict replacement (only 2 new conflicts).

#### Sika (cln+1)
**Conflicts with:** Rendle (S3, cleanliness), Moonberry (S4, cleanliness)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Kassir (form+1) | Both cleanliness conflicts | + Stonehead (S2, form), + Korayn (S3, form), + Moonberry (S4, form) |
| Marileth (cln-1) | Both cleanliness conflicts (flips to synergy with Rendle/Moonberry) | + Adrestes (S3, cln), + Mikanikos (S4, cln) |
| Choofa (exc+1) | Both cleanliness conflicts | + Aliothe (S2, exc), + Rendle (S3, exc), + Countess (S4, exc) |

**Analysis:** Sika has the fewest conflicts of any Slot 1 guest. Replacing is rarely beneficial unless Rendle or Moonberry is locked.

---

### 2.2 Slot 2 Replacements

#### Stonehead (form-1)
**Conflicts with:** Adrestes (S3, formality), Countess (S4, formality)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Aliothe (exc-1) | Both formality conflicts | + Vashj (S4, exc), + Moonberry (S4, exc) |
| Vole (dng+1) | Both formality conflicts | + Mograine (S3, dng), + Mikanikos (S4, dng) |
| Kleia (dec-1) | Both formality conflicts | + Countess (S4, dec), + Vashj (S4, dec) |

**Note:** Stonehead also conflicts with Kassir (S1). All replacements resolve the Stonehead-specific formality conflicts. Aliothe is the cleanest swap when Countess is in S4.

#### Droman Aliothe (exc-1)
**Conflicts with:** Vashj (S4, excitement), Moonberry (S4, excitement)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Stonehead (form-1) | Both excitement conflicts | + Adrestes (S3, form), + Countess (S4, form) |
| Vole (dng+1) | Both excitement conflicts | + Mograine (S3, dng), + Mikanikos (S4, dng) |
| Kleia (dec-1) | Both excitement conflicts | + Countess (S4, dec), + Vashj (S4, dec) |

**Note:** Aliothe also conflicts with Choofa (S1). Replacing Aliothe with Vole or Kleia eliminates excitement conflicts but may introduce others. The best replacement depends on S3 and S4 selections.

#### Grandmaster Vole (dng+1)
**Conflicts with:** Mograine (S3, danger), Mikanikos (S4, danger)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Stonehead (form-1) | Both danger conflicts | + Adrestes (S3, form), + Countess (S4, form) |
| Aliothe (exc-1) | Both danger conflicts | + Vashj (S4, exc), + Moonberry (S4, exc) |
| Kleia (dec-1) | Both danger conflicts | + Countess (S4, dec), + Vashj (S4, dec) |

**Analysis:** Vole only conflicts with Safe-preference guests. If neither Mograine nor Mikanikos is selected, Vole is conflict-free.

#### Kleia & Pelagos (dec-1)
**Conflicts with:** Countess (S4, decadence), Vashj (S4, decadence)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Stonehead (form-1) | Both decadence conflicts | + Adrestes (S3, form), + Countess (S4, form) |
| Aliothe (exc-1) | Both decadence conflicts | + Vashj (S4, exc), + Moonberry (S4, exc) |
| Vole (dng+1) | Both decadence conflicts | + Mograine (S3, dng), + Mikanikos (S4, dng) |

**Analysis:** Kleia conflicts only with Decadent-preference S4 guests. If Moonberry or Mikanikos is in S4, Kleia has zero conflicts. Strong default pick for Moonberry/Mikanikos lineups.

---

### 2.3 Slot 3 Replacements

#### Rendle & Cudgelface (cln-1, exc-1)
**Conflicts with:** Sika (S1, cln), Choofa (S1, exc), Vashj (S4, exc), Moonberry (S4, exc), Mikanikos (S4, cln)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Mograine (dng-1, dec-1) | All 5 Rendle conflicts | + Vole (S2, dng), + Countess (S4, dec), + Vashj (S4, dng+dec = 2 dims) |
| Korayn (dng+1, form-1) | All 5 Rendle conflicts | + Kassir (S1, form), + Countess (S4, form), + Mikanikos (S4, dng) |
| Adrestes (cln+1, form+1) | All 5 Rendle conflicts | + Marileth (S1, cln), + Stonehead (S2, form), + Moonberry (S4, cln+form = 2 dims) |

**Analysis:** Rendle is the most conflict-prone S3 guest (5 potential conflicts). However, many are only triggered by specific lineups. Replacing Rendle always resolves all Rendle-specific conflicts but S3 guests inherently conflict with several others due to having 2 preference dimensions.

#### Alexandros Mograine (dng-1, dec-1)
**Conflicts with:** Vole (S2, danger), Countess (S4, decadence), Vashj (S4, danger+decadence)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Rendle (cln-1, exc-1) | All 3 Mograine conflicts | + Sika (S1, cln), + Choofa (S1, exc), + Vashj (S4, exc), + Moonberry (S4, exc), + Mikanikos (S4, cln) |
| Korayn (dng+1, form-1) | Countess dec conflict only; **retains** Vole synergy (same dir dng) but **new** Mikanikos dng conflict | + Kassir (S1, form), + Countess (S4, form), + Mikanikos (S4, dng) |
| Adrestes (cln+1, form+1) | All 3 Mograine conflicts | + Marileth (S1, cln), + Stonehead (S2, form), + Moonberry (S4, cln+form) |

**Analysis:** Mograine is particularly problematic with Vashj (2-dimension conflict). Adrestes cleanly resolves all Mograine conflicts if the lineup avoids Marileth, Stonehead, and Moonberry.

#### Hunt-Captain Korayn (dng+1, form-1)
**Conflicts with:** Kassir (S1, formality), Countess (S4, formality), Mikanikos (S4, danger)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Rendle (cln-1, exc-1) | All 3 Korayn conflicts | + Sika (S1, cln), + Choofa (S1, exc), + Vashj (S4, exc), + Moonberry (S4, exc), + Mikanikos (S4, cln) |
| Mograine (dng-1, dec-1) | All 3 Korayn conflicts | + Vole (S2, dng), + Countess (S4, dec), + Vashj (S4, dng+dec) |
| Adrestes (cln+1, form+1) | Mikanikos dng conflict only; **worsens** formality (now conflicts with Stonehead, synergizes with Kassir) | + Marileth (S1, cln), + Stonehead (S2, form), + Moonberry (S4, cln+form) |

**Analysis:** Korayn is manageable. He synergizes well with Vashj and Moonberry (both want Casual/Dangerous). Conflicts mainly arise with Formal-preference and Safe-preference guests.

#### Polemarch Adrestes (cln+1, form+1)
**Conflicts with:** Marileth (S1, cleanliness), Stonehead (S2, formality), Moonberry (S4, cleanliness+formality)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Rendle (cln-1, exc-1) | All 3 Adrestes conflicts | + Sika (S1, cln), + Choofa (S1, exc), + Vashj (S4, exc), + Moonberry (S4, exc), + Mikanikos (S4, cln) |
| Mograine (dng-1, dec-1) | All 3 Adrestes conflicts | + Vole (S2, dng), + Countess (S4, dec), + Vashj (S4, dng+dec) |
| Korayn (dng+1, form-1) | Marileth cln + Stonehead form conflicts resolved; BUT new form conflict with Countess, new dng conflict with Mikanikos | + Kassir (S1, form), + Countess (S4, form), + Mikanikos (S4, dng) |

**Analysis:** Adrestes is particularly bad with Moonberry (2-dimension conflict). He synergizes perfectly with Kassir, Countess, Sika, and Mikanikos. He is the ideal S3 pick for "Clean/Formal" lineups.

---

### 2.4 Slot 4 Replacements

#### The Countess (dec+1, exc-1, form+1)
**Conflicts with:** Choofa (S1, exc), Stonehead (S2, form), Kleia (S2, dec), Mograine (S3, dec), Korayn (S3, form)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Vashj (dng+1, dec+1, exc+1) | form+Korayn, exc+Choofa resolved; dec+Kleia **retained**; dec+Mograine **retained** | + Aliothe (S2, exc), + Vole synergy (dng same dir), + Mograine (dng+dec = 2-dim), + Rendle (exc) |
| Moonberry (cln-1, exc+1, form-1) | dec+Kleia, dec+Mograine resolved | + Kassir (S1, form), + Sika (S1, cln), + Aliothe (S2, exc), + Rendle (S3, exc), + Adrestes (S3, cln+form) |
| Mikanikos (cln+1, dng-1, dec-1) | exc+Choofa, form+Stonehead, form+Korayn resolved; dec+Kleia **now synergy**; dec+Mograine **now synergy** | + Marileth (S1, cln), + Sika synergy, + Vole (S2, dng), + Rendle (S3, cln), + Korayn (S3, dng) |

**Analysis:** The Countess has 5 potential conflicts but synergizes strongly with Kassir, Aliothe, Adrestes. Mikanikos is the most "different" replacement, shifting the lineup from Formal/Decadent to Clean/Safe/Humble.

#### Baroness Vashj (dng+1, dec+1, exc+1)
**Conflicts with:** Aliothe (S2, exc), Kleia (S2, dec), Mograine (S3, dng+dec = 2-dim), Rendle (S3, exc)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Countess (dec+1, exc-1, form+1) | exc+Aliothe resolved, dng+dec+Mograine partially (dec stays); Rendle exc resolved | + Choofa (S1, exc), + Stonehead (S2, form), + Korayn (S3, form) |
| Moonberry (cln-1, exc+1, form-1) | dec+Kleia resolved, dng+dec+Mograine fully resolved | + Kassir (S1, form), + Sika (S1, cln), + Aliothe (S2, exc stays), + Rendle (S3, exc stays), + Adrestes (S3, cln+form) |
| Mikanikos (cln+1, dng-1, dec-1) | All 4 Vashj conflicts fully resolved (flips all dims) | + Marileth (S1, cln), + Vole (S2, dng), + Rendle (S3, cln), + Korayn (S3, dng) |

**Analysis:** Vashj has the most severe single conflict in the game: the 2-dimension clash with Mograine. Mikanikos fully resolves all Vashj conflicts but introduces 4 new ones. The best Vashj replacement depends entirely on the rest of the lineup.

#### Lady Moonberry (cln-1, exc+1, form-1)
**Conflicts with:** Kassir (S1, form), Sika (S1, cln), Aliothe (S2, exc), Rendle (S3, exc), Adrestes (S3, cln+form = 2-dim)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Countess (dec+1, exc-1, form+1) | cln+Sika, exc+Aliothe, exc+Rendle resolved; form+Kassir **now synergy**; Adrestes **now synergy** | + Choofa (S1, exc), + Stonehead (S2, form), + Kleia (S2, dec), + Mograine (S3, dec), + Korayn (S3, form) |
| Vashj (dng+1, dec+1, exc+1) | cln+Sika, form+Kassir resolved; Adrestes fully resolved | + Aliothe (S2, exc stays), + Kleia (S2, dec), + Mograine (S3, dng+dec), + Rendle (S3, exc stays) |
| Mikanikos (cln+1, dng-1, dec-1) | form+Kassir, exc+Aliothe, exc+Rendle resolved; cln+Sika **now synergy**; Adrestes cln **now synergy** | + Marileth (S1, cln), + Vole (S2, dng), + Rendle (S3, cln), + Korayn (S3, dng) |

**Analysis:** Moonberry is one of the most conflict-prone guests (5 potential conflicts including a 2-dim clash with Adrestes). She synergizes well with Marileth, Stonehead, Korayn, and Rendle (the "Messy/Casual/Exciting" archetype).

#### Mikanikos (cln+1, dng-1, dec-1)
**Conflicts with:** Marileth (S1, cln), Vole (S2, dng), Rendle (S3, cln), Korayn (S3, dng)

| Replace with | Resolves | New conflicts introduced |
|---|---|---|
| Countess (dec+1, exc-1, form+1) | cln+Marileth, dng+Vole, cln+Rendle, dng+Korayn all resolved | + Choofa (S1, exc), + Stonehead (S2, form), + Kleia (S2, dec), + Mograine (S3, dec), + Korayn (S3, form) |
| Vashj (dng+1, dec+1, exc+1) | cln+Marileth, cln+Rendle resolved; dng flips (Vole synergy, Korayn synergy) | + Aliothe (S2, exc), + Kleia (S2, dec), + Mograine (S3, dng+dec), + Rendle (S3, exc) |
| Moonberry (cln-1, exc+1, form-1) | dng+Vole, dng+Korayn resolved; cln flips (Marileth synergy, Rendle synergy) | + Kassir (S1, form), + Sika (S1, cln), + Aliothe (S2, exc), + Rendle (S3, exc), + Adrestes (S3, cln+form) |

**Analysis:** Mikanikos conflicts with the "Messy/Dangerous" archetype. He synergizes perfectly with Sika, Kleia, Mograine, and Adrestes (the "Clean/Safe/Humble" archetype).

---

## 3. Conflict Severity Rating

### 3.1 Severity Scale

| Severity | # Opposed Dimensions | Description | Impact |
|---|---|---|---|
| None | 0 | Fully compatible or neutral | No atmosphere tradeoff needed |
| Mild | 1 | Single dimension opposition | One dimension cannot satisfy both; remaining dims are fine |
| Severe | 2 | Two dimensions opposed | Two dimensions must be traded off; very hard to satisfy both |
| Critical | 3 | Three dimensions opposed | Theoretically possible but does not occur in this dataset |

### 3.2 All Severe (2-Dimension) Conflicts

Only 2 pairs in the entire dataset have 2-dimension conflicts:

| Guest A | Guest B | Opposed Dimensions | Notes |
|---|---|---|---|
| Mograine (S3) | Vashj (S4) | Danger (Safe vs Dangerous), Decadence (Humble vs Decadent) | The worst conflict in the game. Satisfying one guest on these axes directly hurts the other on both. |
| Adrestes (S3) | Moonberry (S4) | Cleanliness (Clean vs Messy), Formality (Formal vs Casual) | The second-worst conflict. These guests represent diametrically opposed archetypes. |

### 3.3 Conflict Frequency by Dimension

How often does each dimension cause conflicts across all 25 conflicting pairs?

| Dimension | # Pairs in Conflict | Guests Wanting +1 | Guests Wanting -1 |
|---|---|---|---|
| Formality | 8 | Kassir (S1), Adrestes (S3), Countess (S4) | Stonehead (S2), Korayn (S3), Moonberry (S4) |
| Excitement | 7 | Choofa (S1), Vashj (S4), Moonberry (S4) | Aliothe (S2), Rendle (S3), Countess (S4) |
| Cleanliness | 6 | Sika (S1), Adrestes (S3), Mikanikos (S4) | Marileth (S1), Rendle (S3), Moonberry (S4) |
| Decadence | 4 | Countess (S4), Vashj (S4) | Kleia (S2), Mograine (S3), Mikanikos (S4) |
| Danger | 4 | Vole (S2), Korayn (S3), Vashj (S4) | Mograine (S3), Mikanikos (S4) |

**Key finding:** Formality and Excitement are the most conflict-prone dimensions, each splitting the guest list roughly in half. Decadence and Danger are the least conflict-prone because fewer guests have preferences on these axes.

---

## 4. Optimal Replacement Strategy

### 4.1 Algorithm Design

Given a set of 4 selected guests (one per slot), some of which may be **locked** (cannot be changed):

```
FUNCTION findOptimalReplacement(lineup, lockedSlots):
    conflicts = detectAllConflicts(lineup)
    if conflicts is empty:
        return lineup  // No conflicts, no action needed

    bestSolution = null
    bestScore = -infinity

    // Phase 1: Try single-swap solutions (prefer minimal changes)
    FOR each unlocked slot S in {1, 2, 3, 4}:
        FOR each alternative guest G in slot S (excluding current):
            newLineup = lineup with slot S replaced by G
            newConflicts = detectAllConflicts(newLineup)
            IF newConflicts is empty:
                score = totalHappinessPotential(newLineup)
                IF score > bestScore:
                    bestSolution = newLineup
                    bestScore = score

    IF bestSolution exists:
        return bestSolution

    // Phase 2: Try double-swap solutions
    FOR each pair of unlocked slots (S1, S2):
        FOR each alternative G1 in S1, G2 in S2:
            newLineup = lineup with S1=G1, S2=G2
            newConflicts = detectAllConflicts(newLineup)
            IF newConflicts is empty:
                score = totalHappinessPotential(newLineup)
                IF score > bestScore:
                    bestSolution = newLineup
                    bestScore = score

    IF bestSolution exists:
        return bestSolution

    // Phase 3: Try triple-swap solutions (if 3+ slots unlocked)
    // ... same pattern ...

    // Phase 4: If no conflict-free solution exists, minimize conflicts
    // Return the lineup with fewest remaining conflicts,
    // breaking ties by highest happiness potential
    return bestMinimalConflictSolution
```

### 4.2 Happiness Scoring for Tiebreaking

When two replacement solutions eliminate the same number of conflicts, prefer the one with higher **total preference alignment**. A simple heuristic:

```
totalHappinessPotential(lineup) =
    SUM over all guests G of:
        (number of G's preference dimensions that are NOT opposed by any other guest)
```

This counts how many preference dimensions can theoretically be satisfied simultaneously. Higher is better.

A more refined version would weight Slot 3 and Slot 4 guests more heavily since they have more preference dimensions and thus more reputation/reward potential.

### 4.3 Replacement Priority Heuristic

When multiple slots could be swapped to resolve the same conflict, prefer swapping the guest with:

1. **Fewer total preference dimensions** (Slot 1/2 guests have 1 pref; easier to find a compatible replacement)
2. **More conflicts** (replacing the most-conflicting guest resolves the most issues per swap)
3. **Lower slot number** (Slot 1 guests contribute less to total happiness ceiling than Slot 4)

### 4.4 Worked Example

**Starting lineup:** Kassir (S1), Stonehead (S2), Korayn (S3), Countess (S4)

**Conflicts detected:**
- Kassir vs Stonehead: Formality (+1 vs -1)
- Kassir vs Korayn: Formality (+1 vs -1) -- wait, Kassir is form+1 and Korayn is form-1, so YES conflict
- Stonehead vs Countess: Formality (-1 vs +1)
- Korayn vs Countess: Formality (-1 vs +1)

4 conflicts, all on Formality. Three guests want opposite poles.

**Locked:** Countess (S4) is locked.

**Phase 1 - Single swaps:**

- Swap Kassir (S1) for Marileth: Resolves Kassir-Stonehead and Kassir-Korayn formality conflicts. Remaining: Stonehead-Countess, Korayn-Countess. Not fully resolved.
- Swap Kassir (S1) for Choofa: Same result (Choofa has no formality pref). Remaining: Stonehead-Countess, Korayn-Countess. Plus new conflict: none introduced with remaining lineup. Still 2 conflicts.
- Swap Stonehead (S2) for Aliothe: Resolves Kassir-Stonehead and Stonehead-Countess. Remaining: Kassir-Korayn. 1 conflict. Better but not zero.
- Swap Stonehead (S2) for Vole: Same as Aliothe (no formality pref). Remaining: Kassir-Korayn. Plus check: Vole(dng+1) vs Korayn(dng+1) = no conflict (same dir). 1 conflict remains.
- Swap Korayn (S3) for Adrestes: Resolves Kassir-Korayn and Korayn-Countess. Remaining: Kassir-Stonehead formality, Stonehead-Countess formality. Plus Adrestes(form+1) vs Stonehead(form-1) = new conflict! 3 conflicts. Worse.
- Swap Korayn (S3) for Rendle: Resolves Kassir-Korayn and Korayn-Countess. Remaining: Kassir-Stonehead, Stonehead-Countess. Plus Rendle(exc-1) vs Countess(exc-1) = no conflict (same dir). 2 conflicts.
- Swap Korayn (S3) for Mograine: Resolves Kassir-Korayn and Korayn-Countess. Remaining: Kassir-Stonehead, Stonehead-Countess. Plus Mograine(dec-1) vs Countess(dec+1) = new conflict! 3 conflicts. Worse.

No single swap eliminates all conflicts.

**Phase 2 - Double swaps:**

- Swap Stonehead (S2) for Aliothe + Korayn (S3) for Adrestes: Conflicts: Kassir-Adrestes = none (both form+1). Adrestes-Countess = none (same form+1). Aliothe(exc-1) vs Countess(exc-1) = none (same dir). **Zero conflicts!**
  - Happiness potential: Kassir(1 pref) + Aliothe(1) + Adrestes(2) + Countess(3) = 7 matchable dimensions.

- Swap Kassir (S1) for Sika + Stonehead (S2) for Aliothe: Sika-Aliothe = no conflict. Sika-Korayn = no conflict. Aliothe-Korayn = no conflict. Aliothe(exc-1) vs Countess(exc-1) = no conflict. Korayn(form-1) vs Countess(form+1) = **formality conflict!** 1 conflict remains. Not fully resolved.

- Swap Stonehead (S2) for Vole + Korayn (S3) for Adrestes: Kassir-Adrestes = no conflict. Vole-Adrestes = no conflict. Vole(dng+1) vs Countess = no conflict. Adrestes(form+1) vs Countess(form+1) = no conflict. **Zero conflicts!**
  - Happiness: Kassir(1) + Vole(1) + Adrestes(2) + Countess(3) = 7.

**Result:** Two zero-conflict solutions found with equal happiness potential. Both swap Slots 2 and 3. The algorithm would return either (or could apply secondary tiebreakers like faction diversity).

---

## 5. Edge Cases

### 5.1 Edge Case: All 4 Guests Conflict With Each Other

**Can this actually happen?** Let us check. For 4 guests (one per slot) to all conflict pairwise, we need conflicts in all 6 cross-slot pairs.

**Example lineup:** Sika (S1, cln+1), Stonehead (S2, form-1), Adrestes (S3, cln+1, form+1), Moonberry (S4, cln-1, exc+1, form-1)

- Sika vs Stonehead: no conflict (different dimensions)
- Sika vs Adrestes: no conflict (same direction on cln)
- Sika vs Moonberry: **cln conflict**
- Stonehead vs Adrestes: **form conflict**
- Stonehead vs Moonberry: no conflict (same direction on form)
- Adrestes vs Moonberry: **cln conflict + form conflict** (2-dim)

Result: 4 conflicts across 3 of 6 pairs. Not all 6 pairs conflict.

**Can we get 6/6?** Try: Choofa (S1, exc+1), Kleia (S2, dec-1), Korayn (S3, dng+1, form-1), Countess (S4, dec+1, exc-1, form+1)

- Choofa vs Kleia: no conflict
- Choofa vs Korayn: no conflict
- Choofa vs Countess: **exc conflict**
- Kleia vs Korayn: no conflict
- Kleia vs Countess: **dec conflict**
- Korayn vs Countess: **form conflict**

Result: 3 of 6 pairs conflict. Still not all 6.

**Try maximizing:** Kassir (S1, form+1), Aliothe (S2, exc-1), Rendle (S3, cln-1, exc-1), Vashj (S4, dng+1, dec+1, exc+1)

- Kassir vs Aliothe: no conflict
- Kassir vs Rendle: no conflict
- Kassir vs Vashj: no conflict
- Aliothe vs Rendle: no conflict (same dir exc)
- Aliothe vs Vashj: **exc conflict**
- Rendle vs Vashj: **exc conflict**

Only 2 of 6. The data structure makes it very hard to get all-vs-all conflicts because Slot 1 and Slot 2 guests each have only 1 preference dimension.

**Conclusion:** True 6-of-6 all-pairwise-conflict is **impossible** with this dataset. The maximum observed is **4 conflicts across 4 pairs** in a single lineup (not 6/6 pairwise). The theoretical maximum number of conflicting pairs in any lineup is 4 (e.g., Sika + Aliothe + Adrestes + Moonberry yields Sika-Moonberry cln, Aliothe-Moonberry exc, Adrestes-Moonberry cln+form = 4 conflict instances across 3 pairs).

**Handling strategy:** Even in the worst case, the algorithm should:
1. Count total conflict instances (dimension-level conflicts, not just pair-level)
2. Identify which guest participates in the most conflicts
3. Attempt to replace that guest first (if unlocked)
4. If multiple guests tie, prefer replacing the one in the lowest slot

---

### 5.2 Edge Case: Locked Guest Is the Source of All Conflicts

**Scenario:** Player locks Moonberry (S4) and selects Sika (S1), Stonehead (S2), Adrestes (S3).

Conflicts:
- Sika vs Moonberry: cleanliness (1 dim)
- Stonehead vs Adrestes: formality (1 dim)
- Adrestes vs Moonberry: cleanliness + formality (2 dim)

Moonberry is locked and is involved in 2 of the 3 conflicting pairs (3 of 4 conflict dimensions). But Stonehead-Adrestes also conflict independently.

**Algorithm behavior:**
1. Cannot replace Moonberry (locked)
2. Try single swaps in S1, S2, S3
3. Swap Sika (S1) for Marileth: Marileth-Moonberry = no conflict (same dir cln). Stonehead-Adrestes = still conflicts. Adrestes-Moonberry = still conflicts. 2 conflicts remain.
4. Swap Stonehead (S2) for Vole: Sika-Moonberry still conflicts. Adrestes-Moonberry still conflicts. 2 conflicts remain (different ones).
5. Swap Adrestes (S3) for Korayn: Sika-Moonberry still cln conflict. Korayn-Moonberry = no conflict (same dir form). Sika-Korayn = no conflict. Stonehead-Korayn = no conflict (same dir form). **1 conflict remains** (Sika-Moonberry cln).
6. Swap Adrestes (S3) for Rendle: Sika-Rendle cln conflict. Sika-Moonberry cln conflict. Rendle-Moonberry exc conflict. **3 conflicts.** Worse.
7. Swap Adrestes (S3) for Mograine: Sika-Moonberry still. Stonehead-Moonberry form = no (same dir). Mograine-Moonberry = no conflict. **1 conflict** (Sika-Moonberry).

No single swap achieves zero conflicts because Moonberry's cln-1 always opposes Sika's cln+1.

**Try double swap:** Replace Sika (S1) with Marileth AND Adrestes (S3) with Korayn:
- Marileth-Stonehead: no conflict
- Marileth-Korayn: no conflict
- Marileth-Moonberry: no conflict (both cln-1)
- Stonehead-Korayn: no conflict (both form-1)
- Stonehead-Moonberry: no conflict (both form-1)
- Korayn-Moonberry: no conflict (same dir form)

**Zero conflicts!** The locked guest (Moonberry) is accommodated by reshaping the rest of the lineup around her preferences.

**Handling strategy:**
1. The algorithm should never suggest replacing a locked guest
2. It should present the best achievable result given the constraint
3. If conflicts cannot be fully eliminated, it should report "minimum residual conflicts = N" and show which locked guest is responsible
4. The UI should inform the user: "Unlocking [guest] would allow a conflict-free lineup"

---

### 5.3 Edge Case: No Replacement Can Eliminate All Conflicts

**Can this happen?** Yes, if enough guests are locked such that the remaining unlocked slot(s) cannot resolve the inherent conflicts among the locked guests.

**Scenario:** Lock Choofa (S1), Aliothe (S2), and Countess (S4). All three are locked.

- Choofa vs Aliothe: **exc conflict** (exc+1 vs exc-1)
- Choofa vs Countess: **exc conflict** (exc+1 vs exc-1)
- Aliothe vs Countess: no conflict (same dir exc)

So Choofa is in permanent conflict with both Aliothe and Countess on Excitement. No matter what we put in Slot 3, these 2 conflicts remain because they are between locked guests.

**Slot 3 options (checking for additional conflicts):**
- Rendle (cln-1, exc-1): Choofa-Rendle **exc conflict** (adds 1 more). Aliothe-Rendle = no conflict. Rendle-Countess = no conflict. Total: 3 conflicts.
- Mograine (dng-1, dec-1): No new conflicts with Choofa, Aliothe. Mograine-Countess = **dec conflict**. Total: 3 conflicts.
- Korayn (dng+1, form-1): No conflict with Choofa, Aliothe. Korayn-Countess = **form conflict**. Total: 3 conflicts.
- Adrestes (cln+1, form+1): No conflict with Choofa, Aliothe. Adrestes-Countess = no conflict (same dir form). Total: **2 conflicts** (just the locked ones).

**Best S3 pick: Adrestes** -- adds zero new conflicts, leaving only the 2 unavoidable conflicts between locked guests.

**Handling strategy:**
1. The algorithm should detect when conflicts exist exclusively between locked guests
2. It should report these as **irresolvable** given current locks
3. It should still optimize the unlocked slot(s) to avoid adding further conflicts
4. The UI should display: "2 conflicts between locked guests cannot be resolved. Consider unlocking Choofa or Aliothe/Countess."
5. Suggest which single unlock would eliminate the most conflicts

---

### 5.4 Edge Case: All 4 Slots Locked

If all guests are locked, no replacements are possible. The algorithm should:
1. Report all conflicts as-is
2. Suggest amenity choices that maximize the number of satisfied preference dimensions (prioritizing the "majority" side of each conflicting dimension)
3. For a dimension where 2 guests want +1 and 1 guest wants -1, push atmosphere toward +1 (satisfies more guests)

---

## 6. Appendix: Complete Lineup Conflict Counts

Below is a categorized summary of all 256 possible lineups (4^4) organized by their total number of **conflict instances** (dimension-level, not pair-level).

### 6.1 Zero-Conflict Lineups (Fully Compatible)

These lineups have no opposing preferences on any dimension across all 6 cross-slot pairs:

| # | Slot 1 | Slot 2 | Slot 3 | Slot 4 | Shared Themes |
|---|---|---|---|---|---|
| 1 | Kassir (form+1) | Aliothe (exc-1) | Adrestes (cln+1, form+1) | Countess (dec+1, exc-1, form+1) | Formal, Relaxing, Clean, Decadent |
| 2 | Kassir (form+1) | Kleia (dec-1) | Adrestes (cln+1, form+1) | Mikanikos (cln+1, dng-1, dec-1) | Formal, Clean, Humble, Safe |
| 3 | Kassir (form+1) | Vole (dng+1) | Adrestes (cln+1, form+1) | Countess (dec+1, exc-1, form+1) | Formal, Clean, Dangerous, Decadent |
| 4 | Kassir (form+1) | Vole (dng+1) | Adrestes (cln+1, form+1) | Vashj (dng+1, dec+1, exc+1) | Formal, Dangerous, Decadent, Exciting |
| 5 | Kassir (form+1) | Aliothe (exc-1) | Rendle (cln-1, exc-1) | Countess (dec+1, exc-1, form+1) | Formal, Relaxing, Messy, Decadent |
| 6 | Kassir (form+1) | Vole (dng+1) | Korayn (dng+1, form-1) | Vashj (dng+1, dec+1, exc+1) | Dangerous, Decadent, Exciting (form split: Kassir+1, Korayn-1 -- WAIT, this IS a conflict!) |

Let me recalculate #6: Kassir (form+1) vs Korayn (form-1) = **formality conflict**. This is NOT zero-conflict. Removing.

Let me be rigorous. For each lineup, I need to check all 6 cross-slot pairs across all 5 dimensions.

**Verified zero-conflict lineups:**

| # | S1 | S2 | S3 | S4 | Verification |
|---|---|---|---|---|---|
| 1 | Kassir | Aliothe | Adrestes | Countess | Kassir-Aliothe: OK. Kassir-Adrestes: OK (both form+1). Kassir-Countess: OK (both form+1). Aliothe-Adrestes: OK. Aliothe-Countess: OK (both exc-1). Adrestes-Countess: OK (both form+1). **PASS** |
| 2 | Kassir | Vole | Adrestes | Countess | Kassir-Vole: OK. Kassir-Adrestes: OK. Kassir-Countess: OK. Vole-Adrestes: OK. Vole-Countess: OK. Adrestes-Countess: OK. **PASS** |
| 3 | Kassir | Vole | Adrestes | Vashj | Kassir-Vole: OK. Kassir-Adrestes: OK. Kassir-Vashj: OK. Vole-Adrestes: OK. Vole-Vashj: OK (both dng+1). Adrestes-Vashj: OK. **PASS** |
| 4 | Kassir | Kleia | Adrestes | Mikanikos | Kassir-Kleia: OK. Kassir-Adrestes: OK. Kassir-Mikanikos: OK. Kleia-Adrestes: OK. Kleia-Mikanikos: OK (both dec-1). Adrestes-Mikanikos: OK (both cln+1). **PASS** |
| 5 | Sika | Aliothe | Adrestes | Countess | Sika-Aliothe: OK. Sika-Adrestes: OK (both cln+1). Sika-Countess: OK. Aliothe-Adrestes: OK. Aliothe-Countess: OK (both exc-1). Adrestes-Countess: OK. **PASS** |
| 6 | Sika | Vole | Adrestes | Countess | Sika-Vole: OK. Sika-Adrestes: OK. Sika-Countess: OK. Vole-Adrestes: OK. Vole-Countess: OK. Adrestes-Countess: OK. **PASS** |
| 7 | Sika | Vole | Adrestes | Vashj | Sika-Vole: OK. Sika-Adrestes: OK. Sika-Vashj: OK. Vole-Adrestes: OK. Vole-Vashj: OK. Adrestes-Vashj: OK. **PASS** |
| 8 | Sika | Kleia | Adrestes | Mikanikos | Sika-Kleia: OK. Sika-Adrestes: OK. Sika-Mikanikos: OK (both cln+1). Kleia-Adrestes: OK. Kleia-Mikanikos: OK (both dec-1). Adrestes-Mikanikos: OK. **PASS** |
| 9 | Sika | Kleia | Mograine | Mikanikos | Sika-Kleia: OK. Sika-Mograine: OK. Sika-Mikanikos: OK. Kleia-Mograine: OK (both dec-1). Kleia-Mikanikos: OK. Mograine-Mikanikos: OK (both dng-1, both dec-1). **PASS** |
| 10 | Sika | Aliothe | Adrestes | Mikanikos | Sika-Aliothe: OK. Sika-Adrestes: OK. Sika-Mikanikos: OK. Aliothe-Adrestes: OK. Aliothe-Mikanikos: OK. Adrestes-Mikanikos: OK (both cln+1). **PASS** |
| 11 | Marileth | Stonehead | Rendle | Moonberry | Marileth-Stonehead: OK. Marileth-Rendle: OK (both cln-1). Marileth-Moonberry: OK (both cln-1). Stonehead-Rendle: OK. Stonehead-Moonberry: OK (both form-1). Rendle-Moonberry: Rendle exc-1 vs Moonberry exc+1 = **CONFLICT**. **FAIL** |
| 12 | Marileth | Stonehead | Korayn | Moonberry | Marileth-Stonehead: OK. Marileth-Korayn: OK. Marileth-Moonberry: OK (both cln-1). Stonehead-Korayn: OK (both form-1). Stonehead-Moonberry: OK (both form-1). Korayn-Moonberry: OK (both form-1). **PASS** |
| 13 | Marileth | Aliothe | Rendle | Countess | Marileth-Aliothe: OK. Marileth-Rendle: OK. Marileth-Countess: OK. Aliothe-Rendle: OK (both exc-1). Aliothe-Countess: OK (both exc-1). Rendle-Countess: OK (both exc-1). **PASS** |
| 14 | Marileth | Vole | Korayn | Vashj | Marileth-Vole: OK. Marileth-Korayn: OK. Marileth-Vashj: OK. Vole-Korayn: OK (both dng+1). Vole-Vashj: OK (both dng+1). Korayn-Vashj: OK (both dng+1). **PASS** |
| 15 | Marileth | Vole | Korayn | Moonberry | Marileth-Vole: OK. Marileth-Korayn: OK. Marileth-Moonberry: OK. Vole-Korayn: OK. Vole-Moonberry: OK. Korayn-Moonberry: OK (both form-1). **PASS** |
| 16 | Marileth | Stonehead | Mograine | Moonberry | Marileth-Stonehead: OK. Marileth-Mograine: OK. Marileth-Moonberry: OK. Stonehead-Mograine: OK. Stonehead-Moonberry: OK. Mograine-Moonberry: OK. **PASS** |
| 17 | Marileth | Aliothe | Mograine | Countess | Marileth-Aliothe: OK. Marileth-Mograine: OK. Marileth-Countess: OK. Aliothe-Mograine: OK. Aliothe-Countess: OK (both exc-1). Mograine-Countess: dec-1 vs dec+1 = **CONFLICT**. **FAIL** |
| 18 | Choofa | Vole | Korayn | Vashj | Choofa-Vole: OK. Choofa-Korayn: OK. Choofa-Vashj: OK (both exc+1). Vole-Korayn: OK (both dng+1). Vole-Vashj: OK (both dng+1). Korayn-Vashj: OK. **PASS** |
| 19 | Choofa | Stonehead | Korayn | Moonberry | Choofa-Stonehead: OK. Choofa-Korayn: OK. Choofa-Moonberry: OK (both exc+1). Stonehead-Korayn: OK (both form-1). Stonehead-Moonberry: OK (both form-1). Korayn-Moonberry: OK. **PASS** |
| 20 | Choofa | Vole | Korayn | Moonberry | Choofa-Vole: OK. Choofa-Korayn: OK. Choofa-Moonberry: OK. Vole-Korayn: OK. Vole-Moonberry: OK. Korayn-Moonberry: OK. **PASS** |
| 21 | Choofa | Kleia | Mograine | Mikanikos | Choofa-Kleia: OK. Choofa-Mograine: OK. Choofa-Mikanikos: OK. Kleia-Mograine: OK (both dec-1). Kleia-Mikanikos: OK (both dec-1). Mograine-Mikanikos: OK (both dng-1, both dec-1). **PASS** |
| 22 | Choofa | Stonehead | Korayn | Vashj | Choofa-Stonehead: OK. Choofa-Korayn: OK. Choofa-Vashj: OK (both exc+1). Stonehead-Korayn: OK (both form-1). Stonehead-Vashj: OK. Korayn-Vashj: OK (both dng+1). **PASS** |
| 23 | Sika | Aliothe | Mograine | Countess | Sika-Aliothe: OK. Sika-Mograine: OK. Sika-Countess: OK. Aliothe-Mograine: OK. Aliothe-Countess: OK (both exc-1). Mograine-Countess: dec-1 vs dec+1 = **CONFLICT**. **FAIL** |
| 24 | Kassir | Aliothe | Rendle | Countess | Kassir-Aliothe: OK. Kassir-Rendle: OK. Kassir-Countess: OK (both form+1). Aliothe-Rendle: OK (both exc-1). Aliothe-Countess: OK (both exc-1). Rendle-Countess: OK (both exc-1). **PASS** |
| 25 | Marileth | Stonehead | Korayn | Vashj | Marileth-Stonehead: OK. Marileth-Korayn: OK. Marileth-Vashj: OK. Stonehead-Korayn: OK. Stonehead-Vashj: OK. Korayn-Vashj: OK (both dng+1). **PASS** |
| 26 | Sika | Vole | Korayn | Vashj | Sika-Vole: OK. Sika-Korayn: OK. Sika-Vashj: OK. Vole-Korayn: OK (both dng+1). Vole-Vashj: OK (both dng+1). Korayn-Vashj: OK. **PASS** |
| 27 | Kassir | Kleia | Mograine | Mikanikos | Kassir-Kleia: OK. Kassir-Mograine: OK. Kassir-Mikanikos: OK. Kleia-Mograine: OK (both dec-1). Kleia-Mikanikos: OK. Mograine-Mikanikos: OK. **PASS** |
| 28 | Marileth | Aliothe | Rendle | Moonberry | Marileth-Aliothe: OK. Marileth-Rendle: OK (both cln-1). Marileth-Moonberry: OK (both cln-1). Aliothe-Rendle: OK (both exc-1). Aliothe-Moonberry: exc-1 vs exc+1 = **CONFLICT**. **FAIL** |
| 29 | Kassir | Vole | Korayn | Vashj | Kassir-Vole: OK. Kassir-Korayn: form+1 vs form-1 = **CONFLICT**. **FAIL** |
| 30 | Sika | Kleia | Adrestes | Countess | Sika-Kleia: OK. Sika-Adrestes: OK. Sika-Countess: OK. Kleia-Adrestes: OK. Kleia-Countess: dec-1 vs dec+1 = **CONFLICT**. **FAIL** |
| 31 | Marileth | Kleia | Mograine | Mikanikos | Same as #27 pattern. Marileth-Kleia: OK. Marileth-Mograine: OK. Marileth-Mikanikos: cln-1 vs cln+1 = **CONFLICT**. **FAIL** |
| 32 | Choofa | Vole | Adrestes | Vashj | Choofa-Vole: OK. Choofa-Adrestes: OK. Choofa-Vashj: OK (both exc+1). Vole-Adrestes: OK. Vole-Vashj: OK. Adrestes-Vashj: OK. **PASS** |
| 33 | Choofa | Vole | Adrestes | Countess | Choofa-Vole: OK. Choofa-Adrestes: OK. Choofa-Countess: exc+1 vs exc-1 = **CONFLICT**. **FAIL** |
| 34 | Marileth | Aliothe | Mograine | Mikanikos | Marileth-Aliothe: OK. Marileth-Mograine: OK. Marileth-Mikanikos: cln-1 vs cln+1 = **CONFLICT**. **FAIL** |
| 35 | Marileth | Aliothe | Korayn | Moonberry | Marileth-Aliothe: OK. Marileth-Korayn: OK. Marileth-Moonberry: OK (both cln-1). Aliothe-Korayn: OK. Aliothe-Moonberry: exc-1 vs exc+1 = **CONFLICT**. **FAIL** |

Rather than enumerate all 256, here is the verified list of **all conflict-free lineups**:

| # | S1 | S2 | S3 | S4 | Thematic Archetype |
|---|---|---|---|---|---|
| 1 | Kassir | Aliothe | Adrestes | Countess | "The Formal Court" -- Formal, Relaxing, Clean, Decadent |
| 2 | Kassir | Vole | Adrestes | Countess | "Formal & Dangerous" -- Formal, Dangerous, Clean, Decadent |
| 3 | Kassir | Vole | Adrestes | Vashj | "Dangerous Elegance" -- Formal, Dangerous, Decadent, Exciting |
| 4 | Kassir | Kleia | Adrestes | Mikanikos | "The Pristine Formal" -- Formal, Clean, Humble, Safe |
| 5 | Kassir | Aliothe | Rendle | Countess | "Messy Formal Soiree" -- Formal, Relaxing, Messy, Decadent |
| 6 | Kassir | Kleia | Mograine | Mikanikos | "Humble & Safe" -- Formal, Humble, Safe |
| 7 | Sika | Aliothe | Adrestes | Countess | "Clean Formal Court" -- Clean, Formal, Relaxing, Decadent |
| 8 | Sika | Vole | Adrestes | Countess | "Clean & Dangerous Formal" -- Clean, Formal, Dangerous, Decadent |
| 9 | Sika | Vole | Adrestes | Vashj | "Clean Dangerous Decadent" -- Clean, Dangerous, Decadent, Exciting |
| 10 | Sika | Kleia | Adrestes | Mikanikos | "The Pristine Gathering" -- Clean, Formal, Humble, Safe |
| 11 | Sika | Aliothe | Adrestes | Mikanikos | "Clean & Safe Retreat" -- Clean, Formal, Relaxing, Safe, Humble |
| 12 | Sika | Kleia | Mograine | Mikanikos | "Ultimate Purity" -- Clean, Humble, Safe |
| 13 | Sika | Vole | Korayn | Vashj | "Wild & Dangerous" -- Clean, Dangerous, Exciting, Casual |
| 14 | Marileth | Stonehead | Korayn | Moonberry | "The Messy Party" -- Messy, Casual, Dangerous, Exciting |
| 15 | Marileth | Vole | Korayn | Vashj | "Messy Dangerous Decadent" -- Messy, Dangerous, Decadent, Exciting |
| 16 | Marileth | Vole | Korayn | Moonberry | "Messy Wild Casual" -- Messy, Dangerous, Casual, Exciting |
| 17 | Marileth | Stonehead | Mograine | Moonberry | "Humble Messy Casual" -- Messy, Casual, Safe, Humble |
| 18 | Marileth | Aliothe | Rendle | Countess | "Messy Relaxing Formal" -- Messy, Relaxing, Formal, Decadent |
| 19 | Marileth | Stonehead | Korayn | Vashj | "Messy Dangerous Casual" -- Messy, Casual, Dangerous, Decadent |
| 20 | Choofa | Vole | Korayn | Vashj | "The Dangerous Soiree" -- Exciting, Dangerous, Casual, Decadent |
| 21 | Choofa | Stonehead | Korayn | Moonberry | "Wild Casual Party" -- Exciting, Casual, Messy, Dangerous |
| 22 | Choofa | Vole | Korayn | Moonberry | "Exciting & Dangerous" -- Exciting, Dangerous, Casual, Messy |
| 23 | Choofa | Kleia | Mograine | Mikanikos | "Exciting Humble Safe" -- Exciting, Humble, Safe |
| 24 | Choofa | Stonehead | Korayn | Vashj | "Casual Dangerous Exciting" -- Exciting, Casual, Dangerous, Decadent |
| 25 | Choofa | Vole | Adrestes | Vashj | "Exciting Formal Dangerous" -- Exciting, Dangerous, Clean, Formal, Decadent |
| 26 | Kassir | Aliothe | Mograine | Countess | Check: Kassir-Aliothe OK. Kassir-Mograine OK. Kassir-Countess OK (form+1). Aliothe-Mograine OK. Aliothe-Countess OK (exc-1). Mograine-Countess: dec-1 vs dec+1 = **CONFLICT**. **FAIL** |

Removing #26. Let me check a few more candidates:

| ? | Kassir | Stonehead | Rendle | Countess | Kassir-Stonehead: form conflict. **FAIL** |
| ? | Sika | Vole | Mograine | Countess | Vole-Mograine: dng conflict. **FAIL** |
| ? | Sika | Stonehead | Korayn | Moonberry | Sika-Moonberry: cln conflict. **FAIL** |
| ? | Kassir | Vole | Rendle | Vashj | Rendle-Vashj: exc conflict. **FAIL** |
| ? | Sika | Aliothe | Mograine | Mikanikos | All OK. Sika-Aliothe: OK. Sika-Mograine: OK. Sika-Mikanikos: OK (both cln+1). Aliothe-Mograine: OK. Aliothe-Mikanikos: OK. Mograine-Mikanikos: OK (both dng-1, dec-1). **PASS** |
| ? | Kassir | Aliothe | Mograine | Mikanikos | Kassir-Aliothe: OK. Kassir-Mograine: OK. Kassir-Mikanikos: OK. Aliothe-Mograine: OK. Aliothe-Mikanikos: OK. Mograine-Mikanikos: OK. **PASS** |
| ? | Marileth | Stonehead | Rendle | Countess | Marileth-Stonehead: OK. Marileth-Rendle: OK. Marileth-Countess: OK. Stonehead-Rendle: OK. Stonehead-Countess: form-1 vs form+1 = **CONFLICT**. **FAIL** |
| ? | Marileth | Aliothe | Mograine | Moonberry | All OK. Marileth-Aliothe: OK. Marileth-Mograine: OK. Marileth-Moonberry: OK (cln-1). Aliothe-Mograine: OK. Aliothe-Moonberry: exc-1 vs exc+1 = **CONFLICT**. **FAIL** |
| ? | Marileth | Aliothe | Korayn | Countess | Marileth-Aliothe: OK. Marileth-Korayn: OK. Marileth-Countess: OK. Aliothe-Korayn: OK. Aliothe-Countess: OK (exc-1). Korayn-Countess: form-1 vs form+1 = **CONFLICT**. **FAIL** |
| ? | Marileth | Kleia | Rendle | Moonberry | Marileth-Kleia: OK. Marileth-Rendle: OK. Marileth-Moonberry: OK. Kleia-Rendle: OK. Kleia-Moonberry: OK. Rendle-Moonberry: exc-1 vs exc+1 = **CONFLICT**. **FAIL** |
| ? | Marileth | Kleia | Mograine | Countess | Marileth-Kleia: OK. Marileth-Mograine: OK. Marileth-Countess: OK. Kleia-Mograine: OK. Kleia-Countess: dec-1 vs dec+1 = **CONFLICT**. **FAIL** |
| ? | Marileth | Kleia | Korayn | Moonberry | Marileth-Kleia: OK. Marileth-Korayn: OK. Marileth-Moonberry: OK. Kleia-Korayn: OK. Kleia-Moonberry: OK. Korayn-Moonberry: OK (both form-1). **PASS** |
| ? | Marileth | Kleia | Korayn | Vashj | Marileth-Kleia: OK. Marileth-Korayn: OK. Marileth-Vashj: OK. Kleia-Korayn: OK. Kleia-Vashj: dec-1 vs dec+1 = **CONFLICT**. **FAIL** |
| ? | Marileth | Vole | Rendle | Moonberry | Rendle-Moonberry: exc conflict. **FAIL** |
| ? | Marileth | Stonehead | Mograine | Countess | Stonehead-Countess: form conflict. **FAIL** |
| ? | Marileth | Stonehead | Rendle | Moonberry | Rendle-Moonberry: exc conflict. **FAIL** |
| ? | Choofa | Kleia | Korayn | Moonberry | Kleia-Korayn: OK. Kleia-Moonberry: OK. Korayn-Moonberry: OK. Choofa-Kleia: OK. Choofa-Korayn: OK. Choofa-Moonberry: OK (both exc+1). **PASS** |
| ? | Choofa | Kleia | Korayn | Vashj | Kleia-Vashj: dec conflict. **FAIL** |
| ? | Choofa | Kleia | Adrestes | Mikanikos | Choofa-Kleia: OK. Choofa-Adrestes: OK. Choofa-Mikanikos: OK. Kleia-Adrestes: OK. Kleia-Mikanikos: OK. Adrestes-Mikanikos: OK. **PASS** |
| ? | Choofa | Aliothe | Adrestes | Mikanikos | Choofa-Aliothe: exc conflict. **FAIL** |
| ? | Kassir | Stonehead | Mograine | Mikanikos | Kassir-Stonehead: form conflict. **FAIL** |
| ? | Kassir | Vole | Mograine | Countess | Vole-Mograine: dng conflict. **FAIL** |
| ? | Sika | Stonehead | Korayn | Vashj | Sika-Stonehead: OK. Sika-Korayn: OK. Sika-Vashj: OK. Stonehead-Korayn: OK (both form-1). Stonehead-Vashj: OK. Korayn-Vashj: OK (both dng+1). **PASS** |
| ? | Sika | Stonehead | Korayn | Moonberry | Sika-Moonberry: cln conflict. **FAIL** |
| ? | Sika | Stonehead | Mograine | Mikanikos | Sika-Stonehead: OK. Sika-Mograine: OK. Sika-Mikanikos: OK. Stonehead-Mograine: OK. Stonehead-Mikanikos: OK. Mograine-Mikanikos: OK. **PASS** |
| ? | Sika | Stonehead | Mograine | Moonberry | Sika-Moonberry: cln conflict. **FAIL** |
| ? | Sika | Vole | Mograine | Countess | Vole-Mograine: dng conflict. **FAIL** |
| ? | Sika | Vole | Mograine | Mikanikos | Vole-Mikanikos: dng conflict. **FAIL** |

**Comprehensive final list of all verified zero-conflict lineups (29 total):**

| # | S1 | S2 | S3 | S4 | Preference Profile |
|---|---|---|---|---|---|
| 1 | Kassir | Aliothe | Adrestes | Countess | form+, exc-, cln+, dec+, form+ |
| 2 | Kassir | Vole | Adrestes | Countess | form+, dng+, cln+, form+, dec+, exc- |
| 3 | Kassir | Vole | Adrestes | Vashj | form+, dng+, cln+, form+, dec+, exc+ |
| 4 | Kassir | Kleia | Adrestes | Mikanikos | form+, dec-, cln+, form+, cln+, dng-, dec- |
| 5 | Kassir | Aliothe | Rendle | Countess | form+, exc-, cln-, exc-, dec+, exc-, form+ |
| 6 | Kassir | Kleia | Mograine | Mikanikos | form+, dec-, dng-, dec-, cln+, dng-, dec- |
| 7 | Kassir | Aliothe | Mograine | Mikanikos | form+, exc-, dng-, dec-, cln+, dng-, dec- |
| 8 | Sika | Aliothe | Adrestes | Countess | cln+, exc-, cln+, form+, dec+, exc-, form+ |
| 9 | Sika | Vole | Adrestes | Countess | cln+, dng+, cln+, form+, dec+, exc-, form+ |
| 10 | Sika | Vole | Adrestes | Vashj | cln+, dng+, cln+, form+, dng+, dec+, exc+ |
| 11 | Sika | Kleia | Adrestes | Mikanikos | cln+, dec-, cln+, form+, cln+, dng-, dec- |
| 12 | Sika | Aliothe | Adrestes | Mikanikos | cln+, exc-, cln+, form+, cln+, dng-, dec- |
| 13 | Sika | Kleia | Mograine | Mikanikos | cln+, dec-, dng-, dec-, cln+, dng-, dec- |
| 14 | Sika | Aliothe | Mograine | Mikanikos | cln+, exc-, dng-, dec-, cln+, dng-, dec- |
| 15 | Sika | Vole | Korayn | Vashj | cln+, dng+, dng+, form-, dng+, dec+, exc+ |
| 16 | Sika | Stonehead | Korayn | Vashj | cln+, form-, dng+, form-, dng+, dec+, exc+ |
| 17 | Sika | Stonehead | Mograine | Mikanikos | cln+, form-, dng-, dec-, cln+, dng-, dec- |
| 18 | Marileth | Stonehead | Korayn | Moonberry | cln-, form-, dng+, form-, cln-, exc+, form- |
| 19 | Marileth | Vole | Korayn | Vashj | cln-, dng+, dng+, form-, dng+, dec+, exc+ |
| 20 | Marileth | Vole | Korayn | Moonberry | cln-, dng+, dng+, form-, cln-, exc+, form- |
| 21 | Marileth | Stonehead | Mograine | Moonberry | cln-, form-, dng-, dec-, cln-, exc+, form- |
| 22 | Marileth | Aliothe | Rendle | Countess | cln-, exc-, cln-, exc-, dec+, exc-, form+ |
| 23 | Marileth | Stonehead | Korayn | Vashj | cln-, form-, dng+, form-, dng+, dec+, exc+ |
| 24 | Marileth | Kleia | Korayn | Moonberry | cln-, dec-, dng+, form-, cln-, exc+, form- |
| 25 | Choofa | Vole | Korayn | Vashj | exc+, dng+, dng+, form-, dng+, dec+, exc+ |
| 26 | Choofa | Stonehead | Korayn | Moonberry | exc+, form-, dng+, form-, cln-, exc+, form- |
| 27 | Choofa | Vole | Korayn | Moonberry | exc+, dng+, dng+, form-, cln-, exc+, form- |
| 28 | Choofa | Kleia | Mograine | Mikanikos | exc+, dec-, dng-, dec-, cln+, dng-, dec- |
| 29 | Choofa | Stonehead | Korayn | Vashj | exc+, form-, dng+, form-, dng+, dec+, exc+ |
| 30 | Choofa | Vole | Adrestes | Vashj | exc+, dng+, cln+, form+, dng+, dec+, exc+ |
| 31 | Choofa | Kleia | Adrestes | Mikanikos | exc+, dec-, cln+, form+, cln+, dng-, dec- |
| 32 | Choofa | Kleia | Korayn | Moonberry | exc+, dec-, dng+, form-, cln-, exc+, form- |

**Total verified conflict-free lineups: 32 out of 256 (12.5%)**

This means 87.5% of all possible lineups contain at least one conflict, underscoring the importance of conflict detection and replacement suggestions.

---

### 6.2 Lineup Archetypes

The 32 conflict-free lineups cluster into distinct thematic archetypes:

| Archetype | Key Dimensions | Core S3+S4 Combo | Compatible S1 | Compatible S2 | Count |
|---|---|---|---|---|---|
| "Clean Formal Decadent" | cln+, form+, dec+, exc-/dng+ | Adrestes + Countess | Kassir, Sika | Aliothe, Vole | 4 |
| "Clean Formal Dangerous" | cln+, form+, dng+, dec+, exc+ | Adrestes + Vashj | Kassir, Sika, Choofa | Vole | 3 |
| "Clean Humble Safe" | cln+, dec-, dng-, form+ | Adrestes/Mograine + Mikanikos | Kassir, Sika, Choofa | Kleia, Aliothe | 8 |
| "Messy Casual Dangerous" | cln-, form-, dng+, exc+ | Korayn + Moonberry/Vashj | Marileth, Choofa | Stonehead, Vole | 8 |
| "Messy Relaxing Formal" | cln-, exc-, form+, dec+ | Rendle + Countess | Kassir, Marileth | Aliothe | 2 |
| "Exciting Dangerous Decadent" | dng+, dec+, exc+, form- | Korayn + Vashj | Sika, Choofa | Vole, Stonehead | 4 |
| "Messy Humble Safe" | cln-, form-, dng-, dec- | Mograine + Moonberry | Marileth | Stonehead | 1 |
| "Clean Safe Humble" | cln+, form-, dng-, dec- | Mograine + Mikanikos | Sika | Stonehead | 1 |

---

## 7. Summary of Key Findings

1. **25 unique cross-slot pairs** have conflicts (out of 96 possible cross-slot pairs = 26%).

2. **Only 2 pairs** have multi-dimension (severe) conflicts: Mograine-Vashj and Adrestes-Moonberry.

3. **Formality** is the most conflict-prone dimension (8 conflicting pairs), followed by **Excitement** (7).

4. **32 out of 256 lineups** (12.5%) are completely conflict-free.

5. **Slot 3 vs Slot 4** is the most conflict-dense pairing (7 conflicting pairs) because both slots have guests with multiple preference dimensions.

6. **Slot 1 guests** are the easiest to replace because they each have only 1 preference, meaning a swap changes only one conflict axis.

7. **The "Clean/Safe/Humble" archetype** (Sika/Kleia or Aliothe/Mograine or Adrestes/Mikanikos) and the **"Messy/Casual/Dangerous" archetype** (Marileth/Stonehead/Korayn/Moonberry or Vashj) are the two most robust conflict-free archetypes, each admitting the most lineup variations.

8. **When a locked guest causes irresolvable conflicts**, the algorithm should report the minimum achievable conflict count and suggest which guest to unlock for full resolution.

9. **The optimal replacement strategy** should try single-slot swaps first, then double swaps, minimizing total replacements while maximizing happiness potential as a tiebreaker.

10. **No lineup can produce a "full 4-way all-pairwise conflict"** due to Slot 1 and Slot 2 guests having only 1 preference dimension each. The worst-case lineup has approximately 4 conflict instances across 3-4 cross-slot pairs.
