import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import type { GameSnapshot } from '../app/App';
import { TownScene } from './scenes/TownScene';

type Props = { onSnapshot: (snapshot: GameSnapshot) => void };

export default function PhaserGame({ onSnapshot }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onSnapshot);
  callbackRef.current = onSnapshot;

  useEffect(() => {
    if (!hostRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: hostRef.current,
      width: 960,
      height: 600,
      backgroundColor: '#71836b',
      pixelArt: true,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      physics: { default: 'arcade', arcade: { debug: false } },
      scene: [new TownScene((snapshot) => callbackRef.current(snapshot))],
    });
    return () => game.destroy(true);
  }, []);

  return <div ref={hostRef} />;
}
