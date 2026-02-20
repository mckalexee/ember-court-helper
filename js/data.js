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
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 0, formality: 1 },
      rewards: [
        { id: "kassir-tmog", type: "transmog", name: "Crypt Keeper's Mantle & Weapons" }
      ] },
    { id: "marileth", name: "Plague Deviser Marileth", faction: "Necrolord", slot: 1,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: 0, formality: 0 },
      rewards: [
        { id: "marileth-tmog", type: "transmog", name: "Plagueborne Weapons" }
      ] },
    { id: "choofa", name: "Choofa", faction: "Night Fae", slot: 1,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 1, formality: 0 },
      rewards: [
        { id: "choofa-tmog", type: "transmog", name: "Ardenweald Weapons" }
      ] },
    { id: "sika", name: "Sika", faction: "Kyrian", slot: 1,
      preferences: { cleanliness: 1, danger: 0, decadence: 0, excitement: 0, formality: 0 },
      rewards: [
        { id: "sika-pet", type: "pet", name: "Brightscale Hatchling" },
        { id: "sika-tmog", type: "transmog", name: "Kyrian Weapons" }
      ] },

    // --- Slot 2 (Tier 2): 1 preference each ---
    { id: "stonehead", name: "Stonehead", faction: "Venthyr", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 0, formality: -1 },
      rewards: [
        { id: "stonehead-pet", type: "pet", name: "Violet Dredwing Pup" },
        { id: "stonehead-tmog", type: "transmog", name: "Bronze-Bound Sinstone & Weapons" }
      ] },
    { id: "aliothe", name: "Droman Aliothe", faction: "Night Fae", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: 0 },
      rewards: [
        { id: "aliothe-pet", type: "pet", name: "Pearlwing Heron" },
        { id: "aliothe-tmog", type: "transmog", name: "Ardenweald Weapons" }
      ] },
    { id: "vole", name: "Grandmaster Vole", faction: "Necrolord", slot: 2,
      preferences: { cleanliness: 0, danger: 1, decadence: 0, excitement: 0, formality: 0 },
      rewards: [
        { id: "vole-pet", type: "pet", name: "Corpulent Bonetusk" },
        { id: "vole-tmog", type: "transmog", name: "Maldraxxian Weapons" }
      ] },
    { id: "kleia", name: "Kleia & Pelagos", faction: "Kyrian", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: -1, excitement: 0, formality: 0 },
      rewards: [
        { id: "kleia-pet", type: "pet", name: "Sable" },
        { id: "kleia-tmog", type: "transmog", name: "Kyrian Weapons" }
      ] },

    // --- Slot 3 (Tier 3): 2 preferences each ---
    { id: "rendle", name: "Rendle & Cudgelface", faction: "Venthyr", slot: 3,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: -1, formality: 0 },
      rewards: [
        { id: "rendle-pet", type: "pet", name: "Bloodfeaster Spiderling" },
        { id: "rendle-tmog", type: "transmog", name: "Revendreth Weapons" }
      ] },
    { id: "mograine", name: "Alexandros Mograine", faction: "Necrolord", slot: 3,
      preferences: { cleanliness: 0, danger: -1, decadence: -1, excitement: 0, formality: 0 },
      rewards: [
        { id: "mograine-mount", type: "mount", name: "Gruesome Flayedwing" },
        { id: "mograine-tmog", type: "transmog", name: "Maldraxxian Weapons" }
      ] },
    { id: "korayn", name: "Hunt-Captain Korayn", faction: "Night Fae", slot: 3,
      preferences: { cleanliness: 0, danger: 1, decadence: 0, excitement: 0, formality: -1 },
      rewards: [
        { id: "korayn-mount", type: "mount", name: "Pale Acidmaw" },
        { id: "korayn-tmog", type: "transmog", name: "Night Fae Weapons" }
      ] },
    { id: "adrestes", name: "Polemarch Adrestes", faction: "Kyrian", slot: 3,
      preferences: { cleanliness: 1, danger: 0, decadence: 0, excitement: 0, formality: 1 },
      rewards: [
        { id: "adrestes-tmog", type: "transmog", name: "Kyrian Weapons" }
      ] },

    // --- Slot 4 (Tier 4): 3 preferences each ---
    { id: "countess", name: "The Countess", faction: "Venthyr", slot: 4,
      preferences: { cleanliness: 0, danger: 0, decadence: 1, excitement: -1, formality: 1 },
      rewards: [
        { id: "countess-mount", type: "mount", name: "Desire's Battle Gargon" },
        { id: "countess-toy", type: "toy", name: "The Countess's Parasol" },
        { id: "countess-tmog", type: "transmog", name: "Venthyr Weapons" }
      ] },
    { id: "vashj", name: "Baroness Vashj", faction: "Necrolord", slot: 4,
      preferences: { cleanliness: 0, danger: 1, decadence: 1, excitement: 1, formality: 0 },
      rewards: [
        { id: "vashj-pet", type: "pet", name: "Plaguelouse Larva" },
        { id: "vashj-tmog", type: "transmog", name: "Maldraxxian Weapons" }
      ] },
    { id: "moonberry", name: "Lady Moonberry", faction: "Night Fae", slot: 4,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: 1, formality: -1 },
      rewards: [
        { id: "moonberry-pet", type: "pet", name: "Dusty Sporeflutterer" },
        { id: "moonberry-tmog", type: "transmog", name: "Ardenweald Weapons" }
      ] },
    { id: "mikanikos", name: "Mikanikos", faction: "Kyrian", slot: 4,
      preferences: { cleanliness: 1, danger: -1, decadence: -1, excitement: 0, formality: 0 },
      rewards: [
        { id: "mikanikos-mount", type: "mount", name: "Dauntless Duskrunner" },
        { id: "mikanikos-tmog", type: "transmog", name: "Kyrian Weapons" }
      ] }
  ],

  amenities: [
    // --- Entertainment (managed by Hips) ---
    { id: "atoning", name: "Atoning Rituals", category: "entertainment",
      effects: { cleanliness: 0, danger: 0, decadence: -1, excitement: 0, formality: 1 },
      unlock: { requirement: "Available from start", questId: 61407,
        wowheadUrl: "https://www.wowhead.com/quest=61407/ember-court-atoning-rituals" } },
    { id: "wilds", name: "Glimpse of the Wilds", category: "entertainment",
      effects: { cleanliness: 1, danger: -1, decadence: 0, excitement: 0, formality: 0 },
      unlock: { requirement: "Available from start", questId: 61408,
        wowheadUrl: "https://www.wowhead.com/quest=61408/ember-court-glimpse-of-the-wilds" } },
    { id: "band", name: "Lost Chalice Band", category: "entertainment",
      effects: { cleanliness: 0, danger: 0, decadence: 1, excitement: 1, formality: 0 },
      unlock: { requirement: "Staff: Stage Crew (Honored)", questId: 61738,
        wowheadUrl: "https://www.wowhead.com/quest=61738/ember-court-lost-chalice-band" } },

    // --- Refreshments (managed by Picky Stefan) ---
    { id: "tea", name: "Tubbin's Tea Party", category: "refreshment",
      effects: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: 1 },
      unlock: { requirement: "Available from start", questId: 61404,
        wowheadUrl: "https://www.wowhead.com/quest=61404/ember-court-tubbinss-tea-party" } },
    { id: "desserts", name: "Divine Desserts", category: "refreshment",
      effects: { cleanliness: -1, danger: 0, decadence: 1, excitement: 0, formality: 0 },
      unlock: { requirement: "Available from start", questId: 61405,
        wowheadUrl: "https://www.wowhead.com/quest=61405/ember-court-divine-desserts" } },
    { id: "mushroom", name: "Mushroom Surprise", category: "refreshment",
      effects: { cleanliness: 0, danger: 1, decadence: -1, excitement: 0, formality: 0 },
      unlock: { requirement: "Staff: Waiters (Honored)", questId: 61406,
        wowheadUrl: "https://www.wowhead.com/quest=61406/ember-court-mushroom-surprise" } },

    // --- Decorations (managed by Boot the Beaut) ---
    { id: "traditional", name: "Traditional", category: "decoration",
      effects: { cleanliness: 1, danger: 1, decadence: 0, excitement: 0, formality: 0 },
      unlock: { requirement: "Building: Dredger Pool (Friendly)", questId: 61398,
        wowheadUrl: "https://www.wowhead.com/quest=61398/ember-court-traditional" } },
    { id: "mortal", name: "Mortal Reminders", category: "decoration",
      effects: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: -1 },
      unlock: { requirement: "Building: Dredger Pool (Friendly)", questId: 61399,
        wowheadUrl: "https://www.wowhead.com/quest=61399/ember-court-mortal-reminders" } },
    { id: "mirrors", name: "Mystery Mirrors", category: "decoration",
      effects: { cleanliness: 0, danger: -1, decadence: 0, excitement: 1, formality: 0 },
      unlock: { requirement: "Staff: Dredger Decorators (Revered)", questId: 61400,
        wowheadUrl: "https://www.wowhead.com/quest=61400/ember-court-mystery-mirrors" } },

    // --- Security (managed by Watchmaster Boromod) ---
    { id: "venthyr", name: "Venthyr Volunteers", category: "security",
      effects: { cleanliness: 0, danger: 1, decadence: 0, excitement: 1, formality: 0 },
      unlock: { requirement: "Building: Guardhouse (Honored)", questId: 61401,
        wowheadUrl: "https://www.wowhead.com/quest=61401/ember-court-venthyr-volunteers" } },
    { id: "stoneborn", name: "Stoneborn Reserves", category: "security",
      effects: { cleanliness: 0, danger: -1, decadence: 1, excitement: 0, formality: 0 },
      unlock: { requirement: "Building: Guardhouse (Honored)", questId: 61402,
        wowheadUrl: "https://www.wowhead.com/quest=61402/ember-court-stoneborn-reserves" } },
    { id: "maldraxxian", name: "Maldraxxian Army", category: "security",
      effects: { cleanliness: -1, danger: 0, decadence: 0, excitement: 0, formality: -1 },
      unlock: { requirement: "Staff: Bouncers (Revered)", questId: 61403,
        wowheadUrl: "https://www.wowhead.com/quest=61403/ember-court-maldraxxus-army" } }
  ],

  happinessLevels: ["Miserable", "Unhappy", "Uncomfortable", "Comfortable", "Happy", "Elated"],

  meta: {
    maxGuestsPerSlot: 1,
    totalSlots: 4
  }
});
