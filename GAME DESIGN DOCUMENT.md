# GAME DESIGN DOCUMENT
## Project: [Working title TBD]
**Version:** 0.1 — Initial Concept  
**Genre:** 2D top-down adventure / exploration / strategy  
**Platform:** Web browser (desktop-first)  
**Engine:** Phaser + TypeScript  
**Visual direction:** Modern pixel art inspired by the 1990s

---

# 1. Game vision

### High concept

A mysterious phenomenon is spreading throughout a fictional country, transforming its inhabitants and disrupting everyday life.

You play as an independent field agent tasked with investigating the phenomenon, discovering its origin and finding a way to stop it before the entire country is affected.

Travel is primarily done through an extensive railway network connecting towns, cities and remote locations. Along the way, you explore unfamiliar places, meet inhabitants, collect resources, investigate strange occurrences and uncover fragments of a much larger mystery.

The world continues to evolve while you play. Cities can become contaminated, railway connections can become dangerous, and events may unfold while you're somewhere else.

Every journey should feel like an adventure, and every new location should offer the possibility of discovering something unexpected.

### Design philosophy

The game should preserve the sense of curiosity, exploration and mystery that made Agent USA memorable, while introducing a deeper world simulation and more modern gameplay systems.

We want players to feel that:

- The world exists independently of them.
- They don't know everything about what's happening.
- Exploring is rewarding, even when it doesn't directly advance the main objective.
- Time and transportation matter.
- Their decisions have consequences.
- Every new playthrough offers opportunities for different discoveries.

# 2. Setting and atmosphere

### Time period

The game takes place in an alternate version of the 1990s.

This is an intentional aesthetic and technological choice.

The world should feel familiar but slightly disconnected from ours. Technology exists, but information doesn't travel instantly. Communication depends on landlines, radio broadcasts, newspapers, public terminals and physical documents.

This reinforces the mystery and makes exploration important.

### The country

The game takes place in a fictional country with its own geography, cities, history and culture.

The country should contain several distinct regions:

- Large metropolitan areas.
- Small industrial towns.
- Rural communities.
- Coastal settlements.
- Mountain regions.
- Forests and remote wilderness.
- Abandoned industrial and research facilities.

Each region should have its own architectural style, environmental characteristics, inhabitants and potential discoveries.

### Atmosphere

The overall tone should combine:

- Nostalgia.
- Curiosity.
- Mystery.
- Occasional tension.
- A sense of isolation.
- Moments of warmth and humor.

The world shouldn't feel constantly dark or threatening. Normal life should still exist, even as the phenomenon spreads.

# 3. Core gameplay pillars

### Exploration

Players explore towns, buildings and surrounding environments from a top-down perspective.

Locations contain characters, objects, clues, resources and secrets. Not every discovery needs to be directly related to the main story.

### Railway transportation

Trains are the primary means of transportation between cities.

The railway network is a fundamental part of the gameplay, not simply a fast-travel system.

Players must understand the network, plan journeys, consider travel time and react to changing conditions.

### Investigation

The central mystery is revealed gradually.

Players gather information from inhabitants, documents, research facilities, radio broadcasts and environmental clues.

Information should sometimes be incomplete, contradictory or misleading.

### Living world

The phenomenon evolves over time.

Cities have their own state, populations react to events, and the world can change even when the player is elsewhere.

### Resource management

Players collect and manage resources that help them investigate, survive and influence the world.

Resources should create meaningful decisions without turning the game into a complicated survival simulator.

# 4. Core gameplay loop

The intended gameplay loop is:

1. Discover a clue, event or objective.
2. Identify a location that might provide more information.
3. Consult the railway network and plan a journey.
4. Travel to the destination.
5. Explore the location and interact with its inhabitants.
6. Discover clues, resources or unexpected events.
7. Make decisions that influence the world.
8. Return to the investigation with new information.
9. Repeat, as the phenomenon continues to evolve.

The loop should encourage curiosity rather than simply sending players from one predefined mission to another.

# 5. Main gameplay systems

### 5.1 Player and exploration

The player moves freely through environments using directional controls.

Initial requirements:
- Eight-direction movement.
- Collision with environmental objects.
- Interactions with NPCs and objects.
- Collectible items.
- Entering and exiting buildings.
- Contextual interaction prompts.

The player should be able to explore locations without following a predetermined path.

### 5.2 Railway network

The railway system connects the country's settlements.

Each city is a node in a network, and each railway connection represents a possible route.

Initial requirements:
- A world map displaying discovered cities and connections.
- Train stations as interaction points.
- Travel between connected cities.
- Travel time.
- Dynamic availability of routes.
- Visual indicators of dangerous or disrupted routes.

The railway network should eventually support multiple train lines, transfer stations and special routes.

Trains should feel like physical transportation within the world, even if the initial implementation uses a simplified travel interface.

### 5.3 Time and world simulation

The world operates in real time.

Time advances while the player explores, travels and interacts with the environment.

The simulation tracks:
- Current game time.
- City conditions.
- Phenomenon progression.
- Scheduled events.
- NPC and environmental changes.

The simulation should be based on discrete updates rather than calculating every world event on every rendered frame.

The game should also support saving and restoring world state.

### 5.4 The phenomenon

The central threat is an unexplained phenomenon that spreads throughout the country.

Its exact nature, origin and purpose are initially unknown.

Each city has a contamination level that influences its condition.

Potential consequences:
- Changes in NPC behavior.
- Environmental visual effects.
- Disrupted infrastructure.
- Restricted locations.
- New types of encounters.
- Changes in railway availability.

The phenomenon should have discoverable rules, but players shouldn't understand those rules immediately.

### 5.5 Resources and inventory

Players collect resources throughout their journey.

Possible categories:
- Research materials.
- Protective equipment.
- Information and documents.
- Special objects related to the phenomenon.
- Consumable supplies.

Resources should unlock new investigative possibilities and help players manage dangerous situations.

The original game's collectible crystal concept can inspire an original resource mechanic, without necessarily reproducing it directly.

### 5.6 Investigation and discovery

The player maintains a journal containing:
- Discovered locations.
- Important characters.
- Collected clues.
- Research findings.
- Unanswered questions.
- Known information about the phenomenon.

The journal should help players connect discoveries without automatically revealing every answer.

# 6. Procedural generation and roguelike direction

Procedural generation is a planned long-term feature, not a requirement for the first playable prototype.

The intention is to make each new game generate a different country.

Potential procedural elements:

- Randomly positioned towns and cities.
- Different railway layouts.
- Variable terrain and regional characteristics.
- Randomized points of interest.
- Different NPCs and discoveries.
- Different starting conditions.
- Variations in the phenomenon's initial location and behavior.

### Important design principle

Procedural generation should create interesting situations, not just random geography.

For example, a new game might generate:
- A large city surrounded by several small towns.
- A remote research facility accessible through a single railway connection.
- An isolated coastal settlement with important information.
- A heavily contaminated industrial region.
- A railway junction connecting otherwise distant regions.

The generated world should always be geographically and logically coherent.

### Future architecture

The world generator should produce structured game data:

- World configuration.
- Regions.
- Settlements.
- Railway connections.
- Points of interest.
- Initial contamination.
- Important characters and discoveries.

The game engine should consume that data independently of how the world was generated.

This will allow handcrafted maps and procedurally generated maps to coexist.

# 7. Visual and audio direction

### Visuals

Modern pixel art with a 1990s-inspired identity.

Characteristics:
- Top-down perspective.
- Detailed environments.
- Expressive character sprites.
- Smooth movement and animations.
- Rich but controlled color palettes.
- Atmospheric lighting.
- Different visual identities for each region.

The goal is a recognizable retro aesthetic with the polish and readability of a modern indie game.

### Audio

Audio should reinforce the atmosphere.

Potential elements:
- Ambient environmental sounds.
- Train engines and railway sounds.
- Town-specific background ambience.
- Radio broadcasts.
- Mysterious electronic sound effects.
- Original retro-inspired soundtrack.

The soundtrack should balance exploration, nostalgia and occasional tension.

# 8. Initial playable prototype (MVP)

The first playable version should be intentionally small.

### World

- One handcrafted region.
- Four connected towns.
- One larger central settlement.
- A small railway network.
- A handful of buildings and points of interest.

### Player

- Basic movement.
- Collision detection.
- Interactions.
- Resource collection.

### Railway

- Station interactions.
- Travel between connected towns.
- Basic travel-time simulation.
- Simple world map.

### Simulation

- A functioning game clock.
- Contamination levels for each town.
- Basic contamination progression.
- One or two events triggered by time.

### Investigation

- A small mystery.
- A few NPCs.
- Collectible clues.
- One research location.
- A basic journal.

### Completion criteria

The prototype is successful when a player can:

1. Start a new game.
2. Explore a town.
3. Discover information about the phenomenon.
4. Travel to another town by train.
5. Collect resources and interact with characters.
6. Observe changes in the world over time.
7. Complete a small investigative objective.

The prototype doesn't need a complete story or a fully developed country.

# 9. Technical direction

### Technology stack

- **Phaser:** 2D rendering, game loop, input, animation, camera and scene management.
- **React:** Menus, HUD, inventory, journal and other application-level interfaces.
- **TypeScript:** Game systems and domain logic.
- **Vite:** Development and build tooling.
- **Jest:** Unit testing.
- **Tiled:** Map creation and editing.

### Architectural principles

1. Separate game rules from rendering.
2. Keep world state independent from Phaser scenes.
3. Model the railway network as a graph.
4. Model the world as structured, serializable data.
5. Make simulation updates deterministic where possible.
6. Support saving and restoring game state.
7. Keep procedural generation separate from world simulation.

### Initial high-level architecture

- Domain: Cities, characters, resources, player state and game rules.
- World: Geography, maps, railway network and locations.
- Simulation: Time, contamination and events.
- Gameplay: Player movement, interactions and exploration.
- Presentation: Phaser scenes, sprites, animation and sound.
- Application: React interface and persistence.

# 10. Development roadmap

**Milestone 1 — Technical foundation**
- Set up Phaser and React.
- Implement the game container.
- Establish the game loop.
- Create a basic testable domain model.

**Milestone 2 — Exploration**
- Create the first town.
- Implement player movement and collision.
- Add buildings, NPCs and interactions.

**Milestone 3 — Transportation**
- Create the railway graph.
- Implement stations and train travel.
- Introduce the world map.

**Milestone 4 — Simulation**
- Introduce game time.
- Implement city states.
- Introduce the phenomenon and its progression.

**Milestone 5 — Investigation**
- Implement clues and journal.
- Add an investigative objective.
- Connect exploration, transportation and simulation.

**Milestone 6 — Prototype polish**
- Add original art and animations.
- Introduce sound.
- Improve UI and feedback.
- Playtest the complete gameplay loop.

**Future milestone — Procedural worlds**
- Develop world generation.
- Generate settlements and railway networks.
- Introduce randomized starting conditions.
- Ensure generated worlds are playable and interesting.

---

# 11. Design principles to protect throughout development

1. **Mystery over exposition:** Let players discover the world rather than explaining everything immediately.
2. **Meaningful exploration:** Every location should have the potential to reward curiosity.
3. **A living world:** The player should never feel like the only thing happening in the country.
4. **Transportation matters:** Railway travel should be an important strategic decision.
5. **Readable complexity:** Deep systems should remain understandable through good feedback and interfaces.
6. **Replayability:** Future procedural generation should create meaningful variations, not arbitrary randomness.
7. **Small but complete increments:** Each development milestone should produce something playable.

**End of document — Version 0.1**