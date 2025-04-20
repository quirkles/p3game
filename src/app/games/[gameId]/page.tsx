"use client";

import { use, useEffect } from "react";
import { useGame } from "@/hooks/useGame";

export default function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = use(params);
  const { state, gameSubscription } = useGame(gameId);
  useEffect(() => {
    if (gameSubscription) {
      const unsub = gameSubscription.on("connected", () => {
        console.log("Connected to game");
      });
      return () => {
        unsub();
      };
    }
  }, [gameSubscription]);
  return (
    <div className="game-page">
      <h1>Game Page for {gameId}</h1>
      <h2>State: {state}</h2>
      {/* Add game-specific content here */}
    </div>
  );
}
