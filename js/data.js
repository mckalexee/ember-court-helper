"use strict";

const EmberCourtData = Object.freeze({
  // The 5 atmosphere dimensions
  dimensions: ["cleanliness", "danger", "decadence", "excitement", "formality"],

  // Human-readable labels for each pole
  dimensionLabels: {
    cleanliness: { negative: "Messy", positive: "Clean" },
    danger: { negative: "Safe", positive: "Dangerous" },
    decadence: { negative: "Humble", positive: "Decadent" },
    excitement: { negative: "Relaxing", positive: "Exciting" },
    formality: { negative: "Casual", positive: "Formal" }
  },

  // RSVP slots - which guests go in which slot
  slots: [
    { id: 1, name: "Slot 1", guestIds: ["kassir", "marileth", "choofa", "sika"] },
    { id: 2, name: "Slot 2", guestIds: ["stonehead", "aliothe", "vole", "kleia"] },
    { id: 3, name: "Slot 3", guestIds: ["rendle", "mograine", "korayn", "adrestes"] },
    { id: 4, name: "Slot 4", guestIds: ["countess", "vashj", "moonberry", "mikanikos"] }
  ],

  guests: [
    // --- Slot 1 (Tier 1): 1 preference each ---
    { id: "kassir", name: "Cryptkeeper Kassir", faction: "Venthyr", slot: 1,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 0, formality: 1 } },
    { id: "marileth", name: "Plague Deviser Marileth", faction: "Necrolord", slot: 1,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: 0, formality: 0 } },
    { id: "choofa", name: "Choofa", faction: "Night Fae", slot: 1,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 1, formality: 0 } },
    { id: "sika", name: "Sika", faction: "Kyrian", slot: 1,
      preferences: { cleanliness: 1, danger: 0, decadence: 0, excitement: 0, formality: 0 } },

    // --- Slot 2 (Tier 2): 1 preference each ---
    { id: "stonehead", name: "Stonehead", faction: "Venthyr", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 0, formality: -1 } },
    { id: "aliothe", name: "Droman Aliothe", faction: "Night Fae", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: 0 } },
    { id: "vole", name: "Grandmaster Vole", faction: "Necrolord", slot: 2,
      preferences: { cleanliness: 0, danger: 1, decadence: 0, excitement: 0, formality: 0 } },
    { id: "kleia", name: "Kleia & Pelagos", faction: "Kyrian", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: -1, excitement: 0, formality: 0 } },

    // --- Slot 3 (Tier 3): 2 preferences each ---
    { id: "rendle", name: "Rendle & Cudgelface", faction: "Venthyr", slot: 3,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: -1, formality: 0 } },
    { id: "mograine", name: "Alexandros Mograine", faction: "Necrolord", slot: 3,
      preferences: { cleanliness: 0, danger: -1, decadence: -1, excitement: 0, formality: 0 } },
    { id: "korayn", name: "Hunt-Captain Korayn", faction: "Night Fae", slot: 3,
      preferences: { cleanliness: 0, danger: 1, decadence: 0, excitement: 0, formality: -1 } },
    { id: "adrestes", name: "Polemarch Adrestes", faction: "Kyrian", slot: 3,
      preferences: { cleanliness: 1, danger: 0, decadence: 0, excitement: 0, formality: 1 } },

    // --- Slot 4 (Tier 4): 3 preferences each ---
    { id: "countess", name: "The Countess", faction: "Venthyr", slot: 4,
      preferences: { cleanliness: 0, danger: 0, decadence: 1, excitement: -1, formality: 1 } },
    { id: "vashj", name: "Baroness Vashj", faction: "Necrolord", slot: 4,
      preferences: { cleanliness: 0, danger: 1, decadence: 1, excitement: 1, formality: 0 } },
    { id: "moonberry", name: "Lady Moonberry", faction: "Night Fae", slot: 4,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: 1, formality: -1 } },
    { id: "mikanikos", name: "Mikanikos", faction: "Kyrian", slot: 4,
      preferences: { cleanliness: 1, danger: -1, decadence: -1, excitement: 0, formality: 0 } }
  ],

  amenities: [
    // --- Entertainment (managed by Hips) ---
    { id: "atoning", name: "Atoning Rituals", category: "entertainment",
      effects: { cleanliness: 0, danger: 0, decadence: -1, excitement: 0, formality: 1 } },
    { id: "wilds", name: "Glimpse of the Wilds", category: "entertainment",
      effects: { cleanliness: 1, danger: -1, decadence: 0, excitement: 0, formality: 0 } },
    { id: "band", name: "Lost Chalice Band", category: "entertainment",
      effects: { cleanliness: 0, danger: 0, decadence: 1, excitement: 1, formality: 0 } },

    // --- Refreshments (managed by Picky Stefan) ---
    { id: "tea", name: "Tubbin's Tea Party", category: "refreshment",
      effects: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: 1 } },
    { id: "desserts", name: "Divine Desserts", category: "refreshment",
      effects: { cleanliness: -1, danger: 0, decadence: 1, excitement: 0, formality: 0 } },
    { id: "mushroom", name: "Mushroom Surprise", category: "refreshment",
      effects: { cleanliness: 0, danger: 1, decadence: -1, excitement: 0, formality: 0 } },

    // --- Decorations (managed by Boot the Beaut) ---
    { id: "traditional", name: "Traditional", category: "decoration",
      effects: { cleanliness: 1, danger: 1, decadence: 0, excitement: 0, formality: 0 } },
    { id: "mortal", name: "Mortal Reminders", category: "decoration",
      effects: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: -1 } },
    { id: "mirrors", name: "Mystery Mirrors", category: "decoration",
      effects: { cleanliness: 0, danger: -1, decadence: 0, excitement: 1, formality: 0 } },

    // --- Security (managed by Watchmaster Boromod) ---
    { id: "venthyr", name: "Venthyr Volunteers", category: "security",
      effects: { cleanliness: 0, danger: 1, decadence: 0, excitement: 1, formality: 0 } },
    { id: "stoneborn", name: "Stoneborn Reserves", category: "security",
      effects: { cleanliness: 0, danger: -1, decadence: 1, excitement: 0, formality: 0 } },
    { id: "maldraxxian", name: "Maldraxxian Army", category: "security",
      effects: { cleanliness: -1, danger: 0, decadence: 0, excitement: 0, formality: -1 } }
  ],

  happinessLevels: ["Miserable", "Unhappy", "Uncomfortable", "Comfortable", "Happy", "Elated"],

  meta: {
    maxGuestsPerSlot: 1,
    totalSlots: 4
  }
});
