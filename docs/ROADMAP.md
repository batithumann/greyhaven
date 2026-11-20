# Greyhaven — Development Roadmap

**Status:** Living document  
**Design reference:** [GDD.md](GDD.md)  
**Decision history:** [DECISIONS.md](DECISIONS.md)

## Goal

Build a small, playable railway adventure: explore compact towns, gather clues, obtain free tickets, wait for scheduled trains, watch a journey, and arrive in another town. Prioritize a coherent experience over adding many systems.

## Working principles

- Deliver small, playable, reviewable increments.
- Preserve continuous, non-grid-locked player movement.
- Keep simulation and game rules independent of Phaser rendering.
- Prefer handcrafted, meaningful towns over large or repetitive maps.
- Verify each milestone with gameplay checks and appropriate Jest tests.
- Treat this roadmap as intended scope, **not** proof that a feature exists in the repository.

## Current baseline — verify in the repository

The last code shared in conversation had:

- React + Phaser + TypeScript application and Jest-based inventory tests.
- A single `TownScene` with player movement (WASD/arrows), camera following, Arcade Physics collision, buildings and trees.
- Mara, a noticeboard, a timetable, and two collectible items.
- Inventory state reported to React through `GameSnapshot`.
- Pixel-art rendering flags (`pixelArt`, `roundPixels`) in Phaser configuration.

**Changes discussed but not verified in the repository:** reducing internal resolution to 320×200; replacing the original large placeholder town with a 640×416 compact scene and a 16×16 generated character; removing the floating interaction prompt; shrinking buildings toward early *Final Fantasy* proportions. Codex should inspect the files before marking these complete. The compact scene still uses nearest-object proximity interaction unless updated.

## Milestone 1 — Visual foundation and interaction

**Outcome:** A small town that feels readable at Game Boy-inspired scale, without changing the free-movement controls.

- [ ] Confirm actual Phaser configuration, canvas sizing, scaling, and crisp pixel rendering.
- [ ] Confirm compact town and character proportions; reduce building sizes if not already applied.
- [ ] Keep movement smooth and diagonal speed normalized.
- [ ] Establish player facing direction (up/down/left/right), independent of movement.
- [ ] Implement directional interaction checks in front of the player; remove nearest-object targeting and floating prompts.
- [ ] Show conversations and object text in a classic bottom-of-screen dialogue box.
- [ ] Make dialogue input, movement pause, and dismissal predictable.
- [ ] Preserve collectibles and inventory behavior.

**Done when:** The player can move freely, face Mara or an object, press E, read dialogue, dismiss it, and collect an item. No floating interaction prompt appears.

## Milestone 2 — World data and shared clock

**Outcome:** Game time and town definitions are reusable across scenes.

- [ ] Extract town data from hard-coded scene setup where useful; support different town sizes.
- [ ] Introduce a game-world clock separate from Phaser scene rendering.
- [ ] Use **30 real-world minutes per 24-hour game day** (1 game hour = 75 real seconds).
- [ ] Display game time unobtrusively.
- [ ] Make clock progression testable, including day rollover and explicit time advancement.
- [ ] Define an initial railway graph and routes as data.

**Done when:** Time advances consistently while exploring, can be advanced programmatically, and survives town scene transitions without resetting.

## Milestone 3 — Tickets and timetables

**Outcome:** The player can plan a train trip from a station.

- [ ] Add a ticket-office interaction and destination selection for directly connected towns.
- [ ] Issue tickets free of charge; do not implement money.
- [ ] Define fixed, recurring departures at **one-game-hour intervals** for the initial prototype.
- [ ] Show the next departure and destination clearly.
- [ ] Model train arrival, boarding window, departure, and missed trains.
- [ ] Decide a simple, testable boarding rule during implementation.
- [ ] Test timetable calculations, including hour/day boundaries.

**Done when:** The player can choose a reachable destination, receive a ticket, see when the relevant train leaves, and board only while boarding is available.

## Milestone 4 — First railway journey

**Outcome:** Travel from Town A to Town B and back through scheduled train service.

- [ ] Build a second compact, handcrafted town with its own identity.
- [ ] Connect both towns through the railway graph.
- [ ] Add a short visible pixel-art train journey (initial target: approximately 5–8 real seconds).
- [ ] Advance world time by route duration on travel; start with **one game hour between neighboring towns** as a provisional value.
- [ ] Arrive at the destination station with consistent world, inventory, and ticket state.
- [ ] Support the return journey.
- [ ] Test travel time, destination transitions, and persistent state.

**Done when:** A player can get a ticket, wait, board, see the train travel, arrive at another town, explore, and return.

## Milestone 5 — Small connected mystery

**Outcome:** The railway journey has a narrative purpose.

- [ ] Expand to **three or four** distinctive, meaningful towns.
- [ ] Offer multiple reachable neighboring destinations, without requiring a linear order.
- [ ] Add short NPC exchanges, notices, and clues unique to each town.
- [ ] Give the player a clear initial lead but preserve the larger mystery.
- [ ] Track important discoveries (simple journal or clue list).
- [ ] Create a short playable arc that encourages visiting several towns.
- [ ] Playtest whether walking distances, departure frequency, and journey length feel good.

**Done when:** A new player can understand how to begin, choose routes, collect information in several towns, and reach a meaningful small conclusion.

## Later — not part of the first playable version

- Infection propagation, enemies, combat, stealth, and survival pressure while waiting for trains.
- Paid tickets, earning money, fare rules, and ticket inspections.
- Interactive train interiors, passengers, and onboard events.
- Procedural towns, rail networks, and roguelike world generation.
- Complex NPC routines, branching dialogue, and advanced quest systems.

These are possibilities, not committed requirements. Revisit only after the core railway adventure is fun.

## Next action for Codex

1. Read `AGENTS.md`, `docs/GDD.md`, and `docs/DECISIONS.md` if present.
2. Inspect the repository and mark which baseline items and Milestone 1 tasks are genuinely implemented.
3. Identify any mismatch between code and documented design.
4. Propose the **smallest next change** before editing code.

Update this document after each completed milestone, noting verification performed and any scope changes.
