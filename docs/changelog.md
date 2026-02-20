# Changelog

A running log of features built for the Ember Court Calculator.

---

## 006 -- Dimension Colors (2026-02-20)

Added per-dimension colors to all atmosphere dimension labels throughout the UI.
Each of the 5 dimensions (Cleanliness, Danger, Decadence, Excitement, Formality)
now has a distinct color -- teal, orange, violet, amber, and steel blue
respectively. Colors apply to guest preference tags, amenity effect tags, Net
Atmosphere values, and guest breakdown labels. Fixed the Net Atmosphere display
to show intensity rather than polarity: values like "-1 Messy" are now "+1 Messy"
since the sign indicates intensity of the displayed quality, not good/bad. Net
Atmosphere values use dimension colors instead of green/red, which previously
implied a judgment that only applies relative to individual guest preferences.
Match/conflict scoring (+1/-1 with checkmark/X) retains green/red coloring.

Docs: `features/006-dimension-colors/`

---

## 005 -- Slot-Based Locking (2026-02-20)

Changed guest locking from per-guest to per-slot. Locks now apply to the RSVP
slot position rather than a specific guest, matching the user mental model of
"don't change this slot." The lock icon moved from inside the guest card to the
slot header row next to the RSVP label. Locked slots show a gold left-border on
the selected card. Switching guests within a locked slot preserves the lock;
deselecting auto-unlocks. Includes migration from the old lockedGuests format.

Docs: `features/005-slot-locking/`

---

## 004 -- Guest Reward Tracking (2026-02-20)

Added reward data and collection tracking for all 16 guests (44 total rewards:
4 mounts, 8 pets, 1 toy, 31 transmog). Each guest card displays actual item
icon thumbnails (sourced from Wowhead, stored in img/rewards/) instead of
abstract colored dots. Clicking the icons opens a grid-aligned detail panel with
icon, type, name, and collection checkbox per row. A dedicated Reward Collection
section at the bottom of the page shows all rewards organized by type (Mounts,
Pets, Toys, Transmog) with per-category progress counters and an overall
progress bar. Collection state persists to localStorage and is not cleared by
Reset All. Fully responsive at 1023px, 640px, and 400px breakpoints.

v3 update: Replaced generic transmog categories (e.g., "Ardenweald Weapons")
with actual individual item names (e.g., "Nightwillow Barb", "Crypt Watcher's
Spire"). Added Wowhead URLs to all 44 rewards -- names are clickable links.
Added friendship level requirements (Any / Good Friend / Best Friend) displayed
as gold tags. Added 2 cosmetic cloaks (Kassir's Crypt Mantle, Bronze-Bound
Sinstone) and Adrestes' unique shoulder piece as separate reward entries.

Docs: `features/004-guest-rewards/`

---

## 003 -- Amenity Unlocks (2026-02-19)

Added amenity lock/unlock functionality. Players can mark amenities as locked
(not yet unlocked in-game), which excludes them from the optimizer and manual
selection. Locked amenities display their unlock requirement text and a link to
Wowhead. All 12 amenities now include unlock metadata (requirement, quest ID,
Wowhead URL). The optimizer and replacement suggestion engine respect locked
amenities.

Docs: `features/003-amenity-unlocks/`

---

## 002 -- Conflict Detection & Replacement Suggestions (2026-02-19)

Added guest conflict detection (warns when selected guests have opposing
preferences), guest locking (pin guests you want to keep), and replacement
suggestions (recommends swaps to reduce conflicts). Includes a full conflict
analysis of all 96 cross-slot guest pairs.

Docs: `features/002-conflict-detection/`

---

## 001 -- Initial Calculator (2026-02-19)

Built the core calculator application: guest selection across 4 RSVP slots,
amenity selection across 4 categories, real-time scoring, brute-force optimizer,
per-guest happiness breakdown, dark Venthyr theme, responsive design, and
localStorage persistence.

Docs: `features/001-initial-calculator/`
