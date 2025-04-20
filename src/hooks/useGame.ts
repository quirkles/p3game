import { GameSubscription, getGameSubscription } from "@/subscribers/game";
import { useEffect, useState } from "react";
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
  const [gameSubscription, setGameSubscription] =
    useState<GameSubscription | null>(null);

  useEffect(() => {
    if (!sessionUser.id) {
      return;
    }
    fetch(`http://localhost:8080/getToken?userId=${sessionUser.id}`)
      .then((resp) => resp.json())
      .then(({ token }) => {
        const gameSubscription = getGameSubscription(gameId, token);
        setGameSubscription(gameSubscription);
        gameSubscription.on("connected", () => {
          setConnectionState("CONNECTED");
        });
        gameSubscription.on("disconnected", () => {
          setConnectionState("DISCONNECTED");
        });
      })
      .catch((err) => {
        console.warn("GetTokenFail", err);
        setConnectionState("ERROR");
      });
  }, [sessionUser.id, gameId]);

  if (!sessionUser.id) {
    return {
      state: "ERROR",
      gameSubscription: null,
    };
  }

  return {
    state: connectionState,
    gameSubscription: gameSubscription,
  };
}
