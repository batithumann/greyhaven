# Greyhaven — Game Design Document

**Version:** 0.2  
**Status:** Living design document  
**Genre:** Top-down adventure, mystery and survival  
**Primary inspiration:** Agent USA (Atari 8-bit)

---

## 1. Game vision

Greyhaven is a top-down adventure game inspired by *Agent USA*, combining railway travel, mysterious towns, information gathering and an evolving sense of danger.

The player explores a fictional country connected by railways, travelling between towns, meeting inhabitants and uncovering clues about an unsettling mystery.

The game emphasizes freedom of movement, meaningful destinations and the experience of navigating a connected world.

### Gameplay priorities

1. **Adventure and progression** — The primary motivation is travelling, discovering information and making progress through the world.
2. **Tension and survival** — Danger and uncertainty will eventually make travel decisions more consequential.
3. **Exploration and discovery** — An important supporting activity, without requiring extensive exploration of large maps.

### Core design pillars

- **The railway is the heart of the game.** Trains are an essential part of the experience, not merely fast travel.
- **Every town matters.** Each destination should offer distinctive information, characters or experiences.
- **Mystery encourages progression.** The player begins with a reason to investigate but does not know the full story.
- **Freedom within a connected world.** Players can choose among reachable destinations rather than following a strictly linear route.
- **Simple mechanics with room to grow.** Early systems should be understandable and extensible.

---

## 2. Setting and atmosphere

Greyhaven takes place in a fictional country with interconnected towns, railway stations and distinctive regions.

The world has a broadly 1990s-inspired identity, although the exact historical and technological setting remains open.

The atmosphere should feel mysterious and occasionally unsettling, without making every location overtly dangerous.

### Narrative approach

The player begins with an initial objective or lead that provides direction.

The larger mystery unfolds gradually through:

- Conversations with inhabitants.
- Notices, documents and environmental clues.
- Information discovered in different towns.
- Connections between seemingly unrelated events.

The initial version will not require a complete narrative campaign. A small, coherent mystery spanning several towns is sufficient.

---

## 3. Visual direction

### Art style

**Confirmed:** A modern interpretation of original Game Boy pixel art.

The game will use compact sprites, readable environments, restrained palettes and pixel-art presentation, while allowing more artistic freedom than the original hardware.

The visual style should preserve the nostalgic feel of early handheld and Atari-era games without strictly reproducing their technical limitations.

### Movement

**Confirmed:** Continuous, free movement inspired by Agent USA.

Although environments may be built from tiles, characters will not be restricted to moving one tile at a time.

The player can move and stop freely, with collision detection preventing movement through solid obstacles.

### Initial visual implementation

Proposed starting conventions:

- 16×16 pixel world tiles.
- A compact player sprite, approximately 16×16 pixels.
- Pixel-perfect scaling without texture smoothing.
- A camera following the player.
- Simple directional character animations.
- Dialogue boxes inspired by classic handheld RPGs.

These dimensions are implementation starting points, not permanent restrictions.

---

## 4. Towns and exploration

Towns should be compact, handcrafted environments.

The player should be able to reach important locations without excessive walking.

A town may contain:

- A railway station and ticket office.
- A small number of buildings and landmarks.
- Stationary NPCs.
- Noticeboards, documents or other interactive objects.
- Clues that connect to other destinations.

### Town design principle

Every town should contribute something meaningful to the player's journey.

Different towns should have recognizable identities and reasons to visit, even if their maps are relatively small.

For the initial version, handcrafted layouts take priority over procedural generation.

---

## 5. Player interactions

Interactions will use a classic top-down adventure approach.

The player moves freely, faces an NPC or object, and presses an interaction button.

### Initial behavior

- Interactions are directional rather than automatically selecting the nearest object.
- NPC dialogue appears in a traditional dialogue box.
- Conversations are short and primarily provide clues, hints or atmosphere.
- NPCs remain in fixed positions.
- Objects such as notices, ticket counters and documents can be inspected.

Complex dialogue trees, branching relationships and NPC schedules are deferred.

---

## 6. Railway system

The railway is the primary transportation system and a defining feature of Greyhaven.

### 6.1 Railway network

**Confirmed:** An open network connecting nearby towns.

Players can choose among destinations reachable from their current location.

Not every town needs a direct connection to every other town. Some journeys may require transfers.

Gradual route unlocking remains a possible future design choice, but the first version should prioritize open travel.

### 6.2 Tickets

**Confirmed:** Tickets are initially free.

The player visits a ticket office and selects an available destination, similar to Agent USA.

The system should support future ticket prices or other requirements without implementing them now.

### 6.3 Timetables

**Confirmed:** Trains follow fixed schedules.

Trains arrive and depart at specific times according to the game-world clock.

Players must plan around departures and may need to wait at stations.

Missing a train means waiting for another suitable departure.

This waiting period is an intentional gameplay mechanic. Later, dangerous towns may turn waiting into a survival challenge.

### 6.4 Boarding

The player must obtain a ticket and board the appropriate train while it is at the station.

The precise boarding interaction, train dwell time and handling of missed departures remain to be designed.

### 6.5 Train journeys

**Confirmed:** Visible, animated journeys.

After boarding, the player sees a short pixel-art sequence showing the train travelling through the world.

The journey ends with arrival at the destination station.

For the first version, journeys do not require player interaction.

Future versions may allow movement inside trains, conversations with passengers and events during travel.

### 6.6 Time simulation

The railway requires a shared game-world clock.

Schedules and train states should be represented independently of their visual appearance.

This separation will allow future systems, such as town events and infection progression, to depend on the same simulation.

The exact duration of a game day and the relationship between real time and game time are undecided.

---

## 7. Initial gameplay loop

1. Arrive in a town.
2. Explore a small number of relevant locations.
3. Speak to NPCs and inspect clues.
4. Identify a destination worth visiting.
5. Obtain a free ticket at the ticket office.
6. Consult the timetable and wait for the train.
7. Board the train.
8. Watch the journey and arrive in another town.
9. Continue investigating the mystery.

This loop should be enjoyable even before danger or survival mechanics are introduced.

---

## 8. First playable version — Railway Journey

### Objective

Create a small but functional interconnected world where the player can travel by train, explore different towns and gather information.

### Initial scope

**First implementation milestone:**

- Two handcrafted towns.
- Continuous player movement and collision.
- Basic Game Boy-inspired pixel-art presentation.
- Directional interactions and dialogue boxes.
- Ticket offices with free destination selection.
- A shared game clock.
- Fixed train schedules.
- Train arrival, boarding and departure.
- A short animated train journey.
- Arrival in the destination town.

**Expansion of the first playable version:**

- Three or four meaningful towns.
- A small railway network with multiple destination choices.
- Distinctive NPCs and clues in each town.
- A simple mystery connecting the locations.
- Basic tracking of discovered information.

### Success criteria

The first version is successful when a player can:

- Start in one town.
- Discover information suggesting another destination.
- Obtain a ticket.
- Wait for and board a scheduled train.
- Watch the train travel.
- Arrive in a different town.
- Discover new information.
- Continue travelling through the railway network.

The player should experience the beginning of a genuine adventure rather than a collection of disconnected technical demonstrations.

---

## 9. Technical architecture

### Technology

- **Phaser:** World rendering, movement, collisions, camera, animation and scene management.
- **React:** Application interface, menus and supporting UI.
- **TypeScript:** Game and application logic.
- **Jest:** Automated tests for independent game-domain logic.
- **Tiled:** Potential map editor for handcrafted environments.

### Architectural principles

- Keep game rules separate from rendering.
- Represent towns, railway connections and schedules as structured data.
- Maintain a consistent world state across scene transitions.
- Avoid coupling railway simulation to a particular Phaser scene.
- Design systems so they can eventually support saving and loading.
- Prefer incremental implementation over premature abstraction.

### Important domain concepts

Likely concepts include:

- World
- Town
- Railway connection
- Train
- Timetable
- Ticket
- Player state
- Dialogue
- Clue or discovery

These are conceptual responsibilities, not a commitment to create a separate class for each one.

---

## 10. Future possibilities

The following ideas remain part of Greyhaven's longer-term vision but are **not requirements for the first playable version**.

### Infection and survival

- Infection spreading between towns.
- Increasing danger in affected locations.
- Enemies reacting to the player.
- Surviving while waiting for trains.
- Escaping dangerous towns under time pressure.

### Advanced railway gameplay

- Interactive train interiors.
- Conversations and encounters during journeys.
- Boarding without tickets.
- Ticket inspections and consequences.
- Alternative travel conditions.

### World generation

- Procedurally generated town locations.
- Railway networks with varying layouts.
- Different regional characteristics.
- Replayable world configurations.

Procedural generation should eventually create meaningful journeys and situations, not simply random geography.

---

## 11. Open design questions

The following decisions can be made as development progresses:

- What motivates the player to begin investigating?
- What is the central mystery?
- What is the game's time scale?
- How long should players typically wait for a train?
- How frequently should trains run?
- How does the player recognize the correct train?
- How should the railway network be displayed?
- How should discovered information be recorded?
- What happens when the player completes the initial mystery?
- When should survival mechanics enter the experience?

These questions should not block development of the railway prototype.

---

## 12. Development philosophy

Greyhaven should evolve through small, playable milestones.

Each milestone should add a meaningful part of the intended experience rather than introducing complexity for its own sake.

The game should remain faithful to the qualities that make Agent USA memorable while developing its own identity through atmosphere, narrative, visual presentation and world design.

**The guiding principle: make travelling through Greyhaven interesting before making it dangerous.**