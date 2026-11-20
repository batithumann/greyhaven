# Greyhaven — Design Decision Log

**Status:** Living document  
**Companion documents:** [GDD.md](GDD.md), [ROADMAP.md](ROADMAP.md)

This log captures **why** Greyhaven's direction was chosen. It is not a list of tasks. A decision can be revisited after playtesting; record the change and rationale rather than silently rewriting history.

**Status labels:** **Confirmed** = agreed direction; **Provisional** = useful starting assumption; **Deferred** = deliberately undecided or out of scope.

## D-001 — Railway adventure is the core experience

**Status:** Confirmed

**Decision:** Prioritize **adventure and progression**, followed by **tension and survival**. Exploration and discovery support those goals rather than dominate them.

**Why:** Travelling among towns and gradually uncovering a mystery should drive the player forward. Danger will eventually make travel more consequential, but the journey itself must work first.

**Implication:** The first playable milestone is a journey between towns, not a highly polished isolated town or a combat prototype.

## D-002 — Visual identity: modern Game Boy interpretation

**Status:** Confirmed

**Decision:** Use small, readable pixel art inspired by the original Game Boy, with freedom for modern palettes and presentation. Compact towns and building proportions may draw from the original *Final Fantasy I*.

**Why:** The nostalgic, readable visual language fits the atmosphere without imposing original hardware limitations.

**Not decided:** Exact final palette, tileset, spritesheet, and art pipeline.

## D-003 — Free movement, not tile-by-tile movement

**Status:** Confirmed

**Decision:** Player movement is smooth and continuous, like *Agent USA*, even if scenery uses a tilemap.

**Why:** The user likes the original Agent USA movement and specifically does not want Pokémon-style grid-locked steps.

**Implication:** Tile dimensions organize scenery; they do not constrain player coordinates. Preserve diagonal movement normalization and collision handling.

## D-004 — Directional interaction and classic dialogue

**Status:** Confirmed

**Decision:** Interact with an object or NPC the player faces, using a button (currently E). Present text in a classic dialogue box rather than a floating proximity prompt.

**Why:** This matches the intended visual language and makes player intention more important than automatic nearest-object selection.

**Implication:** Existing proximity-based interaction is transitional code, not the target behavior.

## D-005 — Compact, meaningful, handcrafted towns

**Status:** Confirmed

**Decision:** Towns may vary in size, but generally remain compact, with limited unnecessary walking. Each town should offer a distinctive character, clue, location, or other reason to visit.

**Why:** A few memorable places support progression better than many repetitive locations.

**Implication:** Handcraft the first three or four towns. Procedural generation is postponed.

## D-006 — Mystery with an initial lead

**Status:** Confirmed

**Decision:** Begin with an understandable direction or reason to investigate, while keeping the larger situation mysterious.

**Why:** The player should not be told everything, but also should not be left without a starting point.

**Implication:** Use short NPC conversations, notices, documents, and clues across towns. Avoid complex dialogue trees initially.

## D-007 — Simple stationary NPCs

**Status:** Confirmed for initial version

**Decision:** NPCs remain in fixed positions and offer short exchanges with clues, hints, and atmosphere.

**Why:** This supports the narrative goal without requiring schedules, pathfinding, or elaborate conversation systems.

**Future:** More complex NPC behavior can be evaluated later.

## D-008 — Free tickets at ticket offices

**Status:** Confirmed for initial version

**Decision:** The player obtains a ticket by visiting a ticket office and selecting a reachable destination, similar to *Agent USA*. Tickets are free.

**Why:** The first prototype should test railway travel, not money or economy balancing.

**Deferred:** Whether tickets ever cost money, are earned, or can be found.

## D-009 — Fixed train timetables

**Status:** Confirmed

**Decision:** Trains depart according to a shared game-world clock, not on demand. The player may need to wait or may miss a departure.

**Why:** Waiting for a train is part of the identity of *Agent USA* and can later create tension when towns become dangerous.

**Implication:** Schedule calculations must be independent of Phaser scenes and repeat predictably.

## D-010 — Open railway network

**Status:** Confirmed for initial version

**Decision:** Players can travel to nearby towns connected by the railway network and choose among available routes. A fully linear sequence is not the goal.

**Why:** The freedom to navigate a network is central to the Agent USA inspiration.

**Possible later refinement:** Some routes or destinations could be revealed or unlocked gradually. Do not require this in the first version.

## D-011 — Visible, initially non-interactive train journeys

**Status:** Confirmed

**Decision:** Boarding leads to a short pixel-art animation showing the train travelling through the countryside before arriving at the next town.

**Why:** Trains should feel like physical travel through a connected world rather than a teleportation menu.

**Deferred:** Moving inside trains, talking to passengers, and onboard events.

## D-012 — Game clock scale and departure frequency

**Status:** Confirmed

**Decision:** A full 24-hour game day lasts **30 real-world minutes**. Initial train services depart **every one game hour**.

**Consequences:**

- 1 game hour = 75 real seconds.
- 1 game minute = 1.25 real seconds.
- With evenly spaced hourly departures, the maximum wait until the next departure is just under 75 real seconds (excluding boarding constraints).

**Why:** Trains should have meaningful schedules without requiring excessive real-world waiting.

**Implementation note:** A particular route may eventually have its own offset or schedule. Hourly service is the initial baseline, not a promise that every route departs simultaneously.

## D-013 — Train journeys advance world time

**Status:** Confirmed principle; provisional duration

**Decision:** A train trip advances the shared clock by the journey's in-world duration, even though the visual animation is much shorter.

**Initial assumption:** Approximately **one game hour between neighboring towns**, represented by a **5–8 second** animation. These numbers are playtestable defaults, not fixed requirements.

**Why:** World geography and schedules should remain meaningful without making the player sit through lengthy travel animations.

## D-014 — First playable scope

**Status:** Confirmed

**Decision:** First implement travel between **two towns**; expand to **three or four meaningful towns** with a small connected mystery.

**Includes:** Movement, collisions, interactions, ticket office, clock, timetable, boarding, visible journey, arrival, and simple clues.

**Excludes:** Infection, enemies, combat, stealth, economy, procedural generation, and complex NPC behavior.

**Why:** A complete, small gameplay loop is more valuable than many unfinished systems.

## D-015 — Separation of rules and presentation

**Status:** Confirmed

**Decision:** Use Phaser for the game world, rendering, input, physics, and scenes; React for application UI; TypeScript for implementation; Jest for independent domain tests.

**Why:** Game rules such as inventory, clock advancement, tickets, routes, and timetables should be testable without launching a Phaser scene.

**Implication:** Keep domain state serializable and reusable across town transitions; avoid premature class hierarchies and unnecessary dependencies.

## D-016 — Pixel scale and placeholder graphics

**Status:** Provisional

**Decision:** Prototype with a **320×200** internal viewport, a **16×16** character, and approximately **16×16** environment tiles, using crisp scaling. Keep character speed at the currently comfortable value while testing proportions.

**Why:** Establish readable pixel proportions before investing in a full asset pipeline.

**Important:** The user likes the character size, visible area, town size, and movement speed in the compact prototype, but prefers **smaller buildings**. Proposed smaller dimensions were 48×40 for ordinary buildings and 64×40–44 for larger ones. Verify whether those changes have actually been applied.

**Not decided:** Final sprite art, tile dimensions, animation frames, and exact building visuals.

## D-017 — Preserve design knowledge in the repository

**Status:** Confirmed workflow

**Decision:** Keep `AGENTS.md` at the repository root and maintain `docs/GDD.md`, `docs/ROADMAP.md`, and this decision log.

**Why:** Codex and future contributors should be able to understand both the current direction and the reasoning behind it without reconstructing a long chat transcript.

**Implication:** Confirmed design changes should update the relevant documents; exploratory ideas should remain explicitly provisional or deferred.

---

## Open questions to resolve through implementation or playtesting

- What specific event or clue starts the mystery?
- What should the first two towns be called, and what makes each distinctive?
- How long does a train remain at the platform, and how exactly does boarding work?
- Does time pause during dialogue, menus, or train animations?
- How should train arrival and departure be shown in the world?
- How are tickets consumed, retained, or replaced?
- What is the best way to show a route map and discovered clues?
- How should clock state and world state persist across scenes and eventually saves?

Do not resolve these silently in implementation when they materially affect gameplay. Propose a simple default and confirm it when appropriate.
