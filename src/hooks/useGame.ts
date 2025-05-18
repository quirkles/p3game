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

interface UseGameHookReturns {
  state: "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR";
  gameSubscription: GameSubscription | null;
}

export function useGame(gameId: string): UseGameHookReturns {
  const hookTicks = useRef(0);
  const sessionUser = useAppSelector(selectSessionUser);

  const appDispatch = useAppDispatch();

  const playersToFetch = useSelector(selectPlayersToFetch);

  const [connectionState, setConnectionState] = useState<
    "ESTABLISHING_CONNECTION" | "CONNECTED" | "DISCONNECTED" | "ERROR"
  >("ESTABLISHING_CONNECTION");

  const gameSubscription = useRef<GameSubscription>(null);

  useEffect(() => {
    hookTicks.current++;
    if (hookTicks.current > 5) {
      return;
    }
    if (playersToFetch.length > 0) {
      appDispatch(fetchMany(playersToFetch));
    }
  }, [appDispatch, playersToFetch, playersToFetch.length]);

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
          appDispatch(setActiveGameConnection(gameId));
        });
        sub.on("disconnected", () => {
          unsetActiveGameConnection(gameId);
          setConnectionState("DISCONNECTED");
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
  }, [sessionUser.id, gameId, appDispatch]);

  return {
    state: connectionState,
    gameSubscription: gameSubscription.current,
  };
}
