# Greyhaven — Agent Instructions

## Project overview

Greyhaven is a browser-based, top-down railway adventure inspired by Atari's Agent USA.

The primary focus is adventure and progression, followed by tension and survival. The game uses a modern interpretation of original Game Boy pixel art, with compact towns inspired by early Final Fantasy games.

Read `docs/GDD.md` when working on gameplay, visual design or game systems. Consult `docs/ROADMAP.md` for current priorities and `docs/DECISIONS.md` when revisiting established design choices.

## Technology

- TypeScript
- Phaser for gameplay, rendering, physics and input
- React for application UI
- Vite for development
- Jest for automated tests; do not introduce Jasmine

Follow existing repository conventions unless there is a good reason to change them.

## Architecture

- Separate game rules and simulation from Phaser scenes and rendering.
- Keep domain logic independently testable.
- Prefer data-driven definitions for towns, railway connections and schedules.
- Preserve consistent world state across scene transitions.
- Avoid unnecessary dependencies, abstractions and premature generalization.
- Keep the architecture understandable for a developer learning game development.

## Gameplay invariants

- Player movement is continuous, never grid-locked.
- Pixel-art rendering must remain crisp.
- Interactions should be directional, without floating proximity prompts.
- Train departures follow the shared world clock.
- One in-game day lasts 30 real-world minutes.
- Trains depart hourly in the initial design.
- Train travel advances world time.
- Tickets are initially free.
- The railway network is open, connecting reachable neighboring towns.

Do not introduce infection, enemies, combat or procedural generation unless explicitly requested.

## Collaboration

- Work incrementally, with small, playable milestones.
- Explain important implementation choices and Phaser-specific concepts.
- Preserve working functionality unless a change is explicitly agreed upon.
- Discuss significant architectural or gameplay decisions before implementing them.
- When several approaches are reasonable, explain the tradeoffs and recommend one.
- Prefer simple, maintainable solutions over speculative future-proofing.

## Testing and verification

- Add or update Jest tests for meaningful domain logic.
- Run relevant tests and the production build after changes when possible.
- Report what was verified and what could not be verified.
- Never claim tests passed without running them.
- Do not commit or push changes unless requested.

## Documentation

- Keep `docs/GDD.md` focused on the intended game.
- Keep `docs/ROADMAP.md` focused on milestones and progress.
- Record significant decisions and their rationale in `docs/DECISIONS.md`.
- Clearly distinguish confirmed requirements from proposals and future ideas.
- Update relevant documentation when an approved change materially affects it.