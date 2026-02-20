# Ember Court Calculator

A fan-made calculator and optimizer for the **Ember Court**, a Venthyr Covenant feature in *World of Warcraft: Shadowlands*. Select your invited guests, pick amenities, and let the tool find the combination that maximizes overall guest happiness. Track your reward collection progress across all 16 guests.

## Features

- **Guest selection** -- Choose one guest per RSVP slot across 4 slots (16 total guests, one from each Covenant per slot). Each guest displays their portrait, faction, and atmosphere preferences.
- **Amenity selection** -- Pick one amenity in each of 4 categories: Entertainment, Refreshments, Decorations, and Security.
- **Real-time impact indicators** -- Each amenity chip shows a numeric score reflecting how it would affect the currently selected guests.
- **Brute-force optimizer** -- Click "Optimize Amenities" to evaluate all 81 possible amenity combinations and automatically apply the best one.
- **Per-guest happiness breakdown** -- View each guest's score with a dimension-by-dimension detail list showing matches, conflicts, and neutral results.
- **Conflict detection** -- Warns when selected guests have opposing preferences on the same dimension, with a detailed conflict list.
- **Replacement suggestions** -- Recommends guest swaps to reduce conflicts, showing the happiness impact of each suggestion.
- **Guest locking** -- Pin guests you want to keep so they won't be suggested for replacement.
- **Amenity unlocks** -- Mark amenities as locked (not yet unlocked in-game) to exclude them from the optimizer and manual selection. Locked amenities show their unlock requirement and a Wowhead link.
- **Reward tracking** -- Track collection progress for 44 rewards across all 16 guests (4 mounts, 8 pets, 1 toy, 31 transmog items). Each reward shows its actual Wowhead item icon, links to Wowhead, and displays the friendship level required to earn it. A dedicated Reward Collection section at the bottom organizes all rewards by type with per-category progress counters and an overall progress bar.
- **Dark Venthyr-themed UI** -- Gothic aesthetic with deep purples, crimsons, and gold accents using the Cinzel serif font.
- **Responsive design** -- Adapts to desktop, tablet (1023px), mobile (640px), and small mobile (400px) screen sizes, with reduced-motion support.
- **State persistence** -- Selections, locked guests/amenities, and collected rewards are saved to `localStorage` and restored on reload. Reward collection is preserved across resets.

## How to Run

**Option 1 -- Open directly**

Open `index.html` in any modern web browser. No build step or server is required.

**Option 2 -- Local dev server**

```
npm run dev
```

This runs `npx serve` on port 3000. Then visit `http://localhost:3000` in your browser.

## How It Works

The Ember Court atmosphere is modeled across **5 dimensions**:

| Dimension   | Negative Pole | Positive Pole |
|-------------|---------------|---------------|
| Cleanliness | Messy         | Clean         |
| Danger      | Safe          | Dangerous     |
| Decadence   | Humble        | Decadent      |
| Excitement  | Relaxing      | Exciting      |
| Formality   | Casual        | Formal        |

Each **guest** has preferences on these dimensions expressed as +1 (likes the positive pole), -1 (likes the negative pole), or 0 (no opinion). Guests in later RSVP slots have more preferences and are therefore harder to satisfy.

Each **amenity** shifts the net atmosphere on exactly 2 dimensions (by +1 or -1 each).

**Scoring** works per dimension for each guest:

- If the guest has no preference on a dimension: 0 points.
- If the net atmosphere on that dimension is zero: 0 points.
- If the sign of the net atmosphere matches the guest's preference: +1 point.
- If the sign opposes the preference: -1 point.

The guest's total score is the sum across all 5 dimensions. The party's total score is the sum across all invited guests.

The **optimizer** exhaustively evaluates all 3 x 3 x 3 x 3 = 81 amenity combinations and applies whichever yields the highest total happiness.

## Project Structure

```
ember-calculator/
  index.html          Main HTML page
  package.json        Project metadata and dev server script
  css/
    styles.css        All styles (dark Venthyr theme, responsive breakpoints)
  js/
    data.js           Guest, amenity, and dimension data (EmberCourtData)
    app.js            Application logic: rendering, scoring, optimizer, persistence
  img/
    guests/           Guest portrait images (128x128 PNG from warcraft.wiki.gg)
    rewards/          Reward item icons (56x56 JPG from Wowhead CDN)
  docs/
    changelog.md      Feature history log
    features/         Design and research docs per feature
```

## Data Sources

Guest preferences, amenity effects, RSVP slot assignments, reward data, and friendship requirements were compiled from:

- [Wowhead](https://www.wowhead.com/) -- Ember Court guides, item database, and tribute loot tables
- [Warcraft Wiki](https://warcraft.wiki.gg/) -- Ember Court article and guest portraits
- Community guides and player-tested data

## Disclaimer

This is a **fan-made tool** and is not affiliated with or endorsed by Blizzard Entertainment. World of Warcraft and all related names and imagery are trademarks or registered trademarks of Blizzard Entertainment, Inc.

## License

MIT
