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
        { id: "kassir-cloak", type: "transmog", name: "Kassir's Crypt Mantle",
          wowheadUrl: "https://www.wowhead.com/item=183713", requirement: "Good Friend" },
        { id: "kassir-staff", type: "transmog", name: "Crypt Watcher's Spire",
          wowheadUrl: "https://www.wowhead.com/item=180954", requirement: "Any" }
      ] },
    { id: "marileth", name: "Plague Deviser Marileth", faction: "Necrolord", slot: 1,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: 0, formality: 0 },
      rewards: [
        { id: "marileth-wand", type: "transmog", name: "Gem-Crowned Wand",
          wowheadUrl: "https://www.wowhead.com/item=181321", requirement: "Any" },
        { id: "marileth-staff", type: "transmog", name: "Blightclutched Greatstaff",
          wowheadUrl: "https://www.wowhead.com/item=181323", requirement: "Any" }
      ] },
    { id: "choofa", name: "Choofa", faction: "Night Fae", slot: 1,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 1, formality: 0 },
      rewards: [
        { id: "choofa-dagger", type: "transmog", name: "Nightwillow Barb",
          wowheadUrl: "https://www.wowhead.com/item=179499", requirement: "Any" },
        { id: "choofa-offhand", type: "transmog", name: "Heartwood Stem",
          wowheadUrl: "https://www.wowhead.com/item=179563", requirement: "Any" }
      ] },
    { id: "sika", name: "Sika", faction: "Kyrian", slot: 1,
      preferences: { cleanliness: 1, danger: 0, decadence: 0, excitement: 0, formality: 0 },
      rewards: [
        { id: "sika-pet", type: "pet", name: "Brightscale Hatchling",
          wowheadUrl: "https://www.wowhead.com/item=180815", requirement: "Good Friend" },
        { id: "sika-offhand", type: "transmog", name: "Tranquil's Censer",
          wowheadUrl: "https://www.wowhead.com/item=181229", requirement: "Any" }
      ] },

    // --- Slot 2 (Tier 2): 1 preference each ---
    { id: "stonehead", name: "Stonehead", faction: "Venthyr", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: 0, formality: -1 },
      rewards: [
        { id: "stonehead-pet", type: "pet", name: "Violet Dredwing Pup",
          wowheadUrl: "https://www.wowhead.com/item=180603", requirement: "Best Friend" },
        { id: "stonehead-cloak", type: "transmog", name: "Bronze-Bound Sinstone",
          wowheadUrl: "https://www.wowhead.com/item=183709", requirement: "Good Friend" },
        { id: "stonehead-polearm", type: "transmog", name: "Stonewing Halberd",
          wowheadUrl: "https://www.wowhead.com/item=180955", requirement: "Any" }
      ] },
    { id: "aliothe", name: "Droman Aliothe", faction: "Night Fae", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: 0 },
      rewards: [
        { id: "aliothe-pet", type: "pet", name: "Pearlwing Heron",
          wowheadUrl: "https://www.wowhead.com/item=180628", requirement: "Best Friend" },
        { id: "aliothe-sword", type: "transmog", name: "Ripvine Saber",
          wowheadUrl: "https://www.wowhead.com/item=179514", requirement: "Any" },
        { id: "aliothe-maul", type: "transmog", name: "Grove Warden's Maul",
          wowheadUrl: "https://www.wowhead.com/item=179538", requirement: "Any" }
      ] },
    { id: "vole", name: "Grandmaster Vole", faction: "Necrolord", slot: 2,
      preferences: { cleanliness: 0, danger: 1, decadence: 0, excitement: 0, formality: 0 },
      rewards: [
        { id: "vole-pet", type: "pet", name: "Corpulent Bonetusk",
          wowheadUrl: "https://www.wowhead.com/item=181168", requirement: "Good Friend" },
        { id: "vole-sword", type: "transmog", name: "Marrowfused Sword",
          wowheadUrl: "https://www.wowhead.com/item=181328", requirement: "Any" },
        { id: "vole-claymore", type: "transmog", name: "Marrowfused Claymore",
          wowheadUrl: "https://www.wowhead.com/item=181329", requirement: "Any" }
      ] },
    { id: "kleia", name: "Kleia & Pelagos", faction: "Kyrian", slot: 2,
      preferences: { cleanliness: 0, danger: 0, decadence: -1, excitement: 0, formality: 0 },
      rewards: [
        { id: "kleia-pet", type: "pet", name: "Sable",
          wowheadUrl: "https://www.wowhead.com/item=180814", requirement: "Best Friend" },
        { id: "kleia-crossbow", type: "transmog", name: "Crossbow of Contemplative Calm",
          wowheadUrl: "https://www.wowhead.com/item=181225", requirement: "Any" },
        { id: "kleia-glaive", type: "transmog", name: "Bronze Dual-Bladed Glaive",
          wowheadUrl: "https://www.wowhead.com/item=181226", requirement: "Any" }
      ] },

    // --- Slot 3 (Tier 3): 2 preferences each ---
    { id: "rendle", name: "Rendle & Cudgelface", faction: "Venthyr", slot: 3,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: -1, formality: 0 },
      rewards: [
        { id: "rendle-pet", type: "pet", name: "Bloodfeaster Spiderling",
          wowheadUrl: "https://www.wowhead.com/item=181315", requirement: "Any" },
        { id: "rendle-dagger", type: "transmog", name: "Dredger Anklebiter",
          wowheadUrl: "https://www.wowhead.com/item=180959", requirement: "Any" },
        { id: "rendle-mace", type: "transmog", name: "Sterling-Silver Cudgel",
          wowheadUrl: "https://www.wowhead.com/item=180962", requirement: "Any" }
      ] },
    { id: "mograine", name: "Alexandros Mograine", faction: "Necrolord", slot: 3,
      preferences: { cleanliness: 0, danger: -1, decadence: -1, excitement: 0, formality: 0 },
      rewards: [
        { id: "mograine-mount", type: "mount", name: "Gruesome Flayedwing",
          wowheadUrl: "https://www.wowhead.com/item=181300", requirement: "Any" },
        { id: "mograine-dagger", type: "transmog", name: "Marrowfused Dagger",
          wowheadUrl: "https://www.wowhead.com/item=181325", requirement: "Any" },
        { id: "mograine-shield", type: "transmog", name: "Marrowfused Shield",
          wowheadUrl: "https://www.wowhead.com/item=181331", requirement: "Any" }
      ] },
    { id: "korayn", name: "Hunt-Captain Korayn", faction: "Night Fae", slot: 3,
      preferences: { cleanliness: 0, danger: 1, decadence: 0, excitement: 0, formality: -1 },
      rewards: [
        { id: "korayn-mount", type: "mount", name: "Pale Acidmaw",
          wowheadUrl: "https://www.wowhead.com/item=180726", requirement: "Best Friend" },
        { id: "korayn-glaive", type: "transmog", name: "Grove Warden's Edge",
          wowheadUrl: "https://www.wowhead.com/item=179509", requirement: "Any" },
        { id: "korayn-bow", type: "transmog", name: "Nightwillow Shortbow",
          wowheadUrl: "https://www.wowhead.com/item=179585", requirement: "Any" }
      ] },
    { id: "adrestes", name: "Polemarch Adrestes", faction: "Kyrian", slot: 3,
      preferences: { cleanliness: 1, danger: 0, decadence: 0, excitement: 0, formality: 1 },
      rewards: [
        { id: "adrestes-shoulders", type: "transmog", name: "Stalwart Pauldron of Resolve",
          wowheadUrl: "https://www.wowhead.com/item=178897", requirement: "Any" },
        { id: "adrestes-axe", type: "transmog", name: "Broadbladed Severer",
          wowheadUrl: "https://www.wowhead.com/item=181231", requirement: "Any" },
        { id: "adrestes-polearm", type: "transmog", name: "Temple Guard's Partisan",
          wowheadUrl: "https://www.wowhead.com/item=181228", requirement: "Any" }
      ] },

    // --- Slot 4 (Tier 4): 3 preferences each ---
    { id: "countess", name: "The Countess", faction: "Venthyr", slot: 4,
      preferences: { cleanliness: 0, danger: 0, decadence: 1, excitement: -1, formality: 1 },
      rewards: [
        { id: "countess-mount", type: "mount", name: "Desire's Battle Gargon",
          wowheadUrl: "https://www.wowhead.com/item=182209", requirement: "Best Friend" },
        { id: "countess-toy", type: "toy", name: "The Countess's Parasol",
          wowheadUrl: "https://www.wowhead.com/item=182696", requirement: "Any" },
        { id: "countess-sword", type: "transmog", name: "Redelev House Foil",
          wowheadUrl: "https://www.wowhead.com/item=180958", requirement: "Any" },
        { id: "countess-dagger", type: "transmog", name: "Silver-Bladed Ritual Dagger",
          wowheadUrl: "https://www.wowhead.com/item=180961", requirement: "Any" }
      ] },
    { id: "vashj", name: "Baroness Vashj", faction: "Necrolord", slot: 4,
      preferences: { cleanliness: 0, danger: 1, decadence: 1, excitement: 1, formality: 0 },
      rewards: [
        { id: "vashj-pet", type: "pet", name: "Plaguelouse Larva",
          wowheadUrl: "https://www.wowhead.com/item=181264", requirement: "Best Friend" },
        { id: "vashj-crossbow", type: "transmog", name: "Bonejowl Ballista",
          wowheadUrl: "https://www.wowhead.com/item=181320", requirement: "Any" },
        { id: "vashj-tome", type: "transmog", name: "Bonebound Tome",
          wowheadUrl: "https://www.wowhead.com/item=181322", requirement: "Any" }
      ] },
    { id: "moonberry", name: "Lady Moonberry", faction: "Night Fae", slot: 4,
      preferences: { cleanliness: -1, danger: 0, decadence: 0, excitement: 1, formality: -1 },
      rewards: [
        { id: "moonberry-pet", type: "pet", name: "Dusty Sporeflutterer",
          wowheadUrl: "https://www.wowhead.com/item=180639", requirement: "Good Friend" },
        { id: "moonberry-staff", type: "transmog", name: "Songwood Staff",
          wowheadUrl: "https://www.wowhead.com/item=179516", requirement: "Any" }
      ] },
    { id: "mikanikos", name: "Mikanikos", faction: "Kyrian", slot: 4,
      preferences: { cleanliness: 1, danger: -1, decadence: -1, excitement: 0, formality: 0 },
      rewards: [
        { id: "mikanikos-mount", type: "mount", name: "Dauntless Duskrunner",
          wowheadUrl: "https://www.wowhead.com/item=181317", requirement: "Best Friend" },
        { id: "mikanikos-shield", type: "transmog", name: "Bronze Ceremonial Targe",
          wowheadUrl: "https://www.wowhead.com/item=181227", requirement: "Any" },
        { id: "mikanikos-gavel", type: "transmog", name: "Final Arbiter's Gavel",
          wowheadUrl: "https://www.wowhead.com/item=181235", requirement: "Any" }
      ] }
  ],

  amenities: [
    // --- Entertainment (managed by Hips) ---
    { id: "atoning", name: "Atoning Rituals", category: "entertainment",
      effects: { cleanliness: 0, danger: 0, decadence: -1, excitement: 0, formality: 1 },
      activities: [
        { name: "Ritual of Accusation", dim: "formality", direction: 1,
          tip: "Judge 8 souls at the Main Stage \u2014 match confessions to faults",
          dualNature: "Misjudge intentionally for +Casual instead",
          prepPhase: false },
        { name: "Ritual of Absolution", dim: "decadence", direction: -1,
          tip: "Kill 20 Manifestations near the altar",
          dualNature: null,
          prepPhase: false }
      ],
      unlock: { requirement: "Available from start", questId: 61407,
        wowheadUrl: "https://www.wowhead.com/quest=61407/ember-court-atoning-rituals" } },
    { id: "wilds", name: "Glimpse of the Wilds", category: "entertainment",
      effects: { cleanliness: 1, danger: -1, decadence: 0, excitement: 0, formality: 0 },
      activities: [
        { name: "Animal Rescue", dim: "cleanliness", direction: 1,
          tip: "Control Niya to collect 10 escaped animals \u2014 Groupers to water bubble, Gormlings to crates",
          dualNature: null,
          prepPhase: false },
        { name: "Ride on the Wild Side", dim: "danger", direction: -1,
          tip: "Control a Hungry Gorm vehicle \u2014 consume objects, avoid hazards, break nets",
          dualNature: null,
          prepPhase: false }
      ],
      unlock: { requirement: "Available from start", questId: 61408,
        wowheadUrl: "https://www.wowhead.com/quest=61408/ember-court-glimpse-of-the-wilds" } },
    { id: "band", name: "Lost Chalice Band", category: "entertainment",
      effects: { cleanliness: 0, danger: 0, decadence: 1, excitement: 1, formality: 0 },
      activities: [
        { name: "Concert Kick-Off", dim: "excitement", direction: 1,
          tip: "Light 4 stage lights and retrieve 3 instruments from around the court",
          dualNature: null,
          prepPhase: true },
        { name: "Dance for Love", dim: "decadence", direction: 1,
          tip: "Guide Iven through a dance \u2014 respond to his statements within a few seconds",
          dualNature: null,
          prepPhase: false }
      ],
      unlock: { requirement: "Staff: Stage Crew (Honored)", questId: 61738,
        wowheadUrl: "https://www.wowhead.com/quest=61738/ember-court-lost-chalice-band" } },

    // --- Refreshments (managed by Picky Stefan) ---
    { id: "tea", name: "Tubbin's Tea Party", category: "refreshment",
      effects: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: 1 },
      activities: [
        { name: "Tea Time", dim: "formality", direction: 1,
          tip: "Grab teapots from the Food Stall and serve tea to NPCs before it grows cold",
          dualNature: null,
          prepPhase: false },
        { name: "A Quiet Moment", dim: "excitement", direction: -1,
          tip: "Sit in a glowing chair near the Food Stall and channel 3 abilities (8s each)",
          dualNature: null,
          prepPhase: true }
      ],
      unlock: { requirement: "Available from start", questId: 61404,
        wowheadUrl: "https://www.wowhead.com/quest=61404/ember-court-tubbinss-tea-party" } },
    { id: "desserts", name: "Divine Desserts", category: "refreshment",
      effects: { cleanliness: -1, danger: 0, decadence: 1, excitement: 0, formality: 0 },
      activities: [
        { name: "Food Fight", dim: "cleanliness", direction: -1,
          tip: "Flip 3 tables near the Food Stall, then throw food at 15 guests",
          dualNature: null,
          prepPhase: false },
        { name: "Made to Order", dim: "decadence", direction: 1,
          tip: "Control Wicklick \u2014 Serve Cake to hungry guests, Drinks to thirsty ones",
          dualNature: null,
          prepPhase: false }
      ],
      unlock: { requirement: "Available from start", questId: 61405,
        wowheadUrl: "https://www.wowhead.com/quest=61405/ember-court-divine-desserts" } },
    { id: "mushroom", name: "Mushroom Surprise", category: "refreshment",
      effects: { cleanliness: 0, danger: 1, decadence: -1, excitement: 0, formality: 0 },
      activities: [
        { name: "Fungi Experiments", dim: "danger", direction: 1,
          tip: "Sample 10 flat mushrooms near the Muck Pool \u2014 they may explode or spawn enemies",
          dualNature: null,
          prepPhase: true },
        { name: "Lower Your Standards", dim: "decadence", direction: -1,
          tip: "Collect 10 Wild Fungus from ground clusters, turn in 5 at a time to Picky Stefan",
          dualNature: null,
          prepPhase: true }
      ],
      unlock: { requirement: "Staff: Waiters (Honored)", questId: 61406,
        wowheadUrl: "https://www.wowhead.com/quest=61406/ember-court-mushroom-surprise" } },

    // --- Decorations (managed by Boot the Beaut) ---
    { id: "traditional", name: "Traditional", category: "decoration",
      effects: { cleanliness: 1, danger: 1, decadence: 0, excitement: 0, formality: 0 },
      activities: [
        { name: "Traditional Candles", dim: "cleanliness", direction: 1,
          tip: "Click 10 glowing dripping candles around the court to clean wax",
          dualNature: null,
          prepPhase: false },
        { name: "Roaring Fires", dim: "danger", direction: 1,
          tip: "Leave 10 fires burning for +Dangerous (auto-completes at party end)",
          dualNature: "Use Anima-Infused Water buckets to extinguish fires for +Safe instead",
          prepPhase: false }
      ],
      unlock: { requirement: "Building: Dredger Pool (Friendly)", questId: 61398,
        wowheadUrl: "https://www.wowhead.com/quest=61398/ember-court-traditional" } },
    { id: "mortal", name: "Mortal Reminders", category: "decoration",
      effects: { cleanliness: 0, danger: 0, decadence: 0, excitement: -1, formality: -1 },
      activities: [
        { name: "Cartel Ta Justice", dim: "formality", direction: -1,
          tip: "Trap Suspicious Waiters and throw 10 of them off cliff edges",
          dualNature: null,
          prepPhase: false },
        { name: "Stolen Mementos", dim: "excitement", direction: -1,
          tip: "Collect 10 Stolen Mementos from trapped waiters, return to Keeper Ta\u2019saran",
          dualNature: null,
          prepPhase: false }
      ],
      unlock: { requirement: "Building: Dredger Pool (Friendly)", questId: 61399,
        wowheadUrl: "https://www.wowhead.com/quest=61399/ember-court-mortal-reminders" } },
    { id: "mirrors", name: "Mystery Mirrors", category: "decoration",
      effects: { cleanliness: 0, danger: -1, decadence: 0, excitement: 1, formality: 0 },
      activities: [
        { name: "Mystery Mirrors", dim: "excitement", direction: 1,
          tip: "Find 10 chained mirrors, click each to spawn and defeat an enemy",
          dualNature: null,
          prepPhase: true },
        { name: "Prison Break", dim: "danger", direction: -1,
          tip: "Kill 10 Escaped Prisoners that spawn during the party",
          dualNature: "Ignore prisoners to allow passive +Dangerous buildup instead",
          prepPhase: false }
      ],
      unlock: { requirement: "Staff: Dredger Decorators (Revered)", questId: 61400,
        wowheadUrl: "https://www.wowhead.com/quest=61400/ember-court-mystery-mirrors" } },

    // --- Security (managed by Watchmaster Boromod) ---
    // Security amenities provide base effects only -- no in-event activities
    { id: "venthyr", name: "Venthyr Volunteers", category: "security",
      effects: { cleanliness: 0, danger: 1, decadence: 0, excitement: 1, formality: 0 },
      activities: [],
      unlock: { requirement: "Building: Guardhouse (Honored)", questId: 61401,
        wowheadUrl: "https://www.wowhead.com/quest=61401/ember-court-venthyr-volunteers" } },
    { id: "stoneborn", name: "Stoneborn Reserves", category: "security",
      effects: { cleanliness: 0, danger: -1, decadence: 1, excitement: 0, formality: 0 },
      activities: [],
      unlock: { requirement: "Building: Guardhouse (Honored)", questId: 61402,
        wowheadUrl: "https://www.wowhead.com/quest=61402/ember-court-stoneborn-reserves" } },
    { id: "maldraxxian", name: "Maldraxxian Army", category: "security",
      effects: { cleanliness: -1, danger: 0, decadence: 0, excitement: 0, formality: -1 },
      activities: [],
      unlock: { requirement: "Staff: Bouncers (Revered)", questId: 61403,
        wowheadUrl: "https://www.wowhead.com/quest=61403/ember-court-maldraxxus-army" } }
  ],

  // Random dual-choice events that may spawn during the party.
  // Each event only appears if at least one invited guest has a preference on its dimension.
  randomEvents: [
    // Formality
    { name: "A Little More Comfortable", dim: "formality",
      positive: "Choose Fancy Outfit", negative: "Choose Unassuming Outfit" },
    { name: "Court Crusher", dim: "formality",
      positive: "Present Sinstones to Prince Renathal", negative: "Crush Sinstones" },
    // Cleanliness
    { name: "Clumpdump", dim: "cleanliness",
      positive: "Pick up trash following Clumpdump", negative: "Ignore the mess" },
    { name: "Blustery Boil", dim: "cleanliness",
      positive: "Turn slime blob in to Prince Renathal", negative: "Release the slime blob" },
    { name: "Party Pests", dim: "cleanliness",
      positive: "Catch bugs with net", negative: "Detonate bugs with wand" },
    // Danger
    { name: "Knockerbock", dim: "danger",
      positive: "Detonate Faulty Fireworks", negative: "Turn in Faulty Fireworks" },
    { name: "Colonel Mort Murder", dim: "danger",
      positive: "Close investigation, let killer go free", negative: "Hunt down Furtive Assassin" },
    // Decadence
    { name: "Ember Skyterror", dim: "decadence",
      positive: "Plant Cluster of Seeds in soil", negative: "Deliver Cluster of Seeds to Prince Renathal" },
    { name: "Legacy of Stone", dim: "decadence",
      positive: "Sculpture honors self", negative: "Sculpture honors others" },
    // Excitement
    { name: "Crime of Fashion", dim: "excitement",
      positive: "Let Fredrik and Harlowe fight", negative: "Reconcile Fredrik and Harlowe" },
    { name: "Venthyr Provocateur", dim: "excitement",
      positive: "Spread Court Gossip around the party", negative: "Deliver Court Gossip to Prince Renathal" }
  ],

  // Party crasher boss encounters. Each only spawns if its atmosphere bonus
  // would benefit at least one invited guest. Defeating the boss gives a large
  // single-dimension atmosphere boost.
  partyCrashers: [
    { name: "Master's Forces", boss: "High Inquisitor Vetar", dim: "excitement", direction: -1 },
    { name: "Stone Legion", boss: "Drezgruda", dim: "decadence", direction: 1 },
    { name: "Rampaging Dredgers", boss: "Sloppy", dim: "cleanliness", direction: 1 },
    { name: "Lost Souls", boss: "Sineater", dim: "formality", direction: 1 },
    { name: "Devourers", boss: "Kedu", dim: "danger", direction: -1 }
  ],

  happinessLevels: ["Miserable", "Unhappy", "Uncomfortable", "Comfortable", "Happy", "Elated"],

  meta: {
    maxGuestsPerSlot: 1,
    totalSlots: 4
  }
});
