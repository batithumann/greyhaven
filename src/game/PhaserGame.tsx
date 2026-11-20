import Phaser from "phaser";
import { useEffect, useRef } from "react";
import type { GameSnapshot } from "../app/App";
import { TownScene } from "./scenes/TownScene";

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

      // Low-resolution game world
      width: 320,
      height: 200,

      backgroundColor: "#71836b",

      // Crisp pixel-art rendering
      pixelArt: true,
      roundPixels: true,

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 200,
      },

      physics: {
        default: "arcade",
        arcade: { debug: false },
      },

      scene: [new TownScene((snapshot) => callbackRef.current(snapshot))],
    });

    return () => game.destroy(true);
  }, []);

  return <div ref={hostRef} />;
}
