"use client";

import { GameSubscription, getGameSubscription } from "@/subscribers/game";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectSessionUser } from "@/store/slices/sessionUser";

interface UseGameHookReturns {
  state: "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR";
  gameSubscription: GameSubscription | null;
}

export function useGame(gameId: string): UseGameHookReturns {
  const sessionUser = useAppSelector(selectSessionUser);
  const [connectionState, setConnectionState] = useState<
    "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR"
  >("ESTABLISHING_CONNECTION");
  const gameSubscription = useRef<GameSubscription>(null);

  useEffect(() => {
    if (!sessionUser.id || !gameId) {
      return;
    }
    let sub: GameSubscription | null = null;
    fetch(`http://localhost:8080/getToken?userId=${sessionUser.id}`)
      .then((resp) => resp.json())
      .then(({ token }) => {
        sub = getGameSubscription(gameId, token);
        if (gameSubscription.current) {
          gameSubscription.current.unsubscribe();
        }
        gameSubscription.current = sub;
        sub.on("connected", () => {
          setConnectionState("CONNECTED");
        });
        sub.on("disconnected", () => {
          setConnectionState("DISCONNECTED");
        });
      })
      .catch((err) => {
        console.warn("GetTokenFail", err);
        setConnectionState("ERROR");
      });
    return () => {
      sub?.unsubscribe();
    };
  }, [sessionUser.id, gameId]);

  return {
    state: connectionState,
    gameSubscription: gameSubscription.current,
  };
}
