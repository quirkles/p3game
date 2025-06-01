"use client";

import { GameSubscription, getGameSubscription } from "@/subscribers/game";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSessionUser } from "@/store/selectors/sessionuser";
import {
  addPlayersToGame,
  removePlayersFromGame,
  setActiveGameConnection,
  setGame,
  unsetActiveGameConnection,
} from "@/store/slices/games";
import { useSelector } from "react-redux";
import { selectPlayersToFetch } from "@/store/selectors/players";
import { fetchMany } from "@/store/thunks/players";
import { getConfig } from "@/config";

interface UseGameHookReturns {
  state: "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR";
  gameSubscription: GameSubscription | null;
  reconnect: () => void;
}

export function useGame(
  gameId: string,
  userIdOverride?: string,
): UseGameHookReturns {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [connectionState, setConnectionState] = useState<
    "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR"
  >("ESTABLISHING_CONNECTION");

  const hookTicks = useRef(0);
  const sessionUser = useAppSelector(selectSessionUser);

  const appDispatch = useAppDispatch();

  const playersToFetch = useSelector(selectPlayersToFetch);

  const gameSubscription = useRef<GameSubscription>(null);

  const userId =
    (getConfig().ENV === "local" && userIdOverride) || sessionUser.id;

  useEffect(() => {
    if (!userId || !gameId) {
      return;
    }
    if (gameSubscription.current && !isReconnecting) {
      return;
    }
    setConnectionState("ESTABLISHING_CONNECTION");
    let sub: GameSubscription | null = null;
    fetch(`http://localhost:8080/getToken?userId=${userId}`)
      .then((resp) => resp.json())
      .then(({ token }) => {
        setIsReconnecting(false);
        sub = getGameSubscription(gameId, token);
        if (gameSubscription.current) {
          gameSubscription.current.unsubscribe();
        }
        gameSubscription.current = sub;
        sub.on("connected", () => {
          setConnectionState("CONNECTED");
          appDispatch(setActiveGameConnection(gameId));
        });
        sub.on("disconnected", () => {
          setConnectionState("DISCONNECTED");
          appDispatch(unsetActiveGameConnection(gameId));
        });
        sub.on("initGameData", (game) => {
          appDispatch(setGame(game));
        });
        sub.on("playerJoined", (playerId: string) => {
          appDispatch(
            addPlayersToGame({
              gameId,
              playerIds: [playerId],
            }),
          );
        });
        sub.on("playerLeft", (playerId: string) => {
          appDispatch(
            removePlayersFromGame({
              gameId,
              playerIds: [playerId],
            }),
          );
        });
      })
      .catch((err) => {
        console.warn("GetTokenFail", err);
        setConnectionState("ERROR");
      });
    return () => {
      sub?.unsubscribe();
    };
  }, [userId, gameId, isReconnecting, appDispatch]);

  return {
    state: connectionState,
    gameSubscription: gameSubscription.current,
    reconnect: () => {
      setIsReconnecting(true);
    },
  };
}
