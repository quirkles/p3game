import { GameSubscription, getGameSubscription } from "@/subscribers/game";
import { error } from "console";
import { useEffect, useRef } from "react";

interface IHookReturnProps {
  gameConnection: GameSubscription | null;
}

export function useGameConnection(
  userId: string,
  gameId: string,
): IHookReturnProps {
  const conRef = useRef<GameSubscription | null>(null);
  useEffect(() => {
    let sub: GameSubscription | null = null;
    fetch(`http:localhost:8080/getToken?userId=${userId}&devToken=true`)
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
