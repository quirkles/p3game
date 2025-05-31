import { GameSubscription, getGameSubscription } from "@/subscribers/game";
import { useEffect, useRef } from "react";

interface IHookReturnProps {
  gameConnection: GameSubscription | null;
}

export function useGameConnection(
  userId: string | null,
  gameId: string | null,
): IHookReturnProps {
  const conRef = useRef<GameSubscription | null>(null);
  useEffect(() => {
    if (!userId || !gameId) {
      console.error("useGameConnection error", "userId or gameId is null");
      return;
    }
    let sub: GameSubscription | null = null;
    fetch(`http://localhost:8080/getToken?userId=${userId}&isDevToken=true`)
      .then((r) => r.json())
      .then(({ token }) => {
        sub = getGameSubscription(gameId, token);
        if (conRef.current) {
          conRef.current.unsubscribe();
        }
        conRef.current = sub;
      })
      .catch((err) => {
        console.error("useGameConnection error", err);
      });
    return () => {
      conRef.current?.unsubscribe();
    };
  });
  return {
    gameConnection: conRef.current,
  };
}
