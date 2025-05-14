import { Game } from "@/types/Game";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { firestoreDb } from "@/firestore/firestore";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setGameState } from "@/store/slices/games";
import {selectSessionUser} from "@/store/selectors/sessionuser";

interface HookReturns {
  createdGames: Game[];
  createGame: (game: Pick<Game, "name" | "description">) => Promise<Game>;
}

export function useGames(): HookReturns {
  const [games, setGames] = useState<Record<string, Game>>({});
  const sessionUser = useAppSelector(selectSessionUser);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(setGameState(games));
  }, [appDispatch, games]);

  useEffect(() => {
    const q = query(
      collection(firestoreDb, "games"),
      where("status", "==", "CREATED"),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const newGameData = snapshot.docs.reduce(
        (gameMap: Record<string, Game>, doc) => {
          if (doc.exists()) {
            gameMap[doc.id] = {
              id: doc.id,
              ...((doc.data() || {}) as Omit<Game, "id">),
            } as Game;
          }
          return gameMap;
        },
        {},
      );
      setGames((state) => ({
        ...state,
        ...newGameData,
      }));
    });

    return () => unsub();
  }, []);

  return {
    createdGames: Object.values(games),
    createGame: async (game: Pick<Game, "name" | "description">) => {
      if (!sessionUser.id) {
        throw new Error(
          "Cannot create games hook without a session user. Please log in first.",
        );
      }
      const gameRef = doc(collection(firestoreDb, "games"));
      const newDoc = {
        ...game,
        status: "CREATED",
        id: gameRef.id,
        createdBy: sessionUser.id,
      } as const;
      await setDoc(gameRef, newDoc);
      return newDoc;
    },
  };
}
