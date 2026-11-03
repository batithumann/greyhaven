import { useCallback, useState } from 'react';
import PhaserGame from '../game/PhaserGame';

export type GameSnapshot = { inventory: string[]; message: string };

export default function App() {
  const [snapshot, setSnapshot] = useState<GameSnapshot>({
    inventory: [],
    message: 'Welcome to Greyhaven. Explore the town.',
  });

  const handleSnapshot = useCallback((next: GameSnapshot) => setSnapshot(next), []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div><span className="eyebrow">FIELD OFFICE · NORTH DISTRICT</span><h1>GREYHAVEN</h1></div>
        <div className="status"><span className="status-dot" /> FIELD REPORT ACTIVE</div>
      </header>
      <section className="game-layout">
        <div className="game-frame"><PhaserGame onSnapshot={handleSnapshot} /></div>
        <aside className="panel">
          <span className="eyebrow">CURRENT LEAD</span>
          <h2>The quiet town</h2>
          <p className="report">{snapshot.message}</p>
          <div className="rule" />
          <span className="eyebrow">FIELD INVENTORY</span>
          {snapshot.inventory.length === 0
            ? <p className="muted">Nothing collected yet.</p>
            : <ul>{snapshot.inventory.map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}</ul>}
          <div className="rule" />
          <span className="eyebrow">CONTROLS</span>
          <p><kbd>W A S D</kbd> or <kbd>↑ ↓ ← →</kbd><br/>Move around town</p>
          <p><kbd>E</kbd><br/>Talk / inspect / collect</p>
          <p className="muted small">A small prototype. Placeholder art is intentional.</p>
        </aside>
      </section>
      <footer>GREYHAVEN COUNTY · EST. 1994 <span>AN UNUSUALLY QUIET PLACE</span></footer>
    </main>
  );
}
