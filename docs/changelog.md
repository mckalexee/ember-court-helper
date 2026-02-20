# Changelog

A running log of features built for the Ember Court Calculator.

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
