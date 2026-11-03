# Greyhaven — first playable town

A small browser-game prototype using React, TypeScript, Vite, Phaser 4 and Jest.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use WASD or arrow keys to move, and E to interact with Mara, the noticeboard, and the two collectibles.

## Tests and production build

```bash
npm test
npm run build
```

## Included

- Handcrafted placeholder town map with a market road, buildings, trees and depot
- Player movement, camera follow, world bounds and Arcade Physics collisions
- Nearby interactions with an NPC, noticeboard and collectible items
- React HUD with field report and inventory
- Inventory rules isolated from Phaser and covered by Jest tests

## Structure

- `src/app`: React shell and HUD
- `src/game`: Phaser integration and town scene
- `src/domain`: framework-independent inventory logic and tests

Art is deliberately primitive placeholder geometry. This milestone is about a playable loop, not final visuals.
