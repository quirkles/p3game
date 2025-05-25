import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { firestoreDb } from "@/firestore/firestore";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";

interface HookReturn {
  players: User[];
  setQuery: (query: string) => void;
}

export function usePlayersFirestore(): HookReturn {
  const [queryStr, setQueryStr] = useState("");
  const [players, setPlayers] = useState<User[]>([]);

  useEffect(() => {
    if (!queryStr || queryStr.length < 3) {
      return setPlayers([]);
    }
    const unSub = onSnapshot(
      query(
        collection(firestoreDb, "users"),
        where("_searchIdx", "array-contains", queryStr),
        orderBy("name"),
        limit(15),
      ),
      (snapshot) => {
        setPlayers(
          snapshot.docs.map((doc) => {
            const { _searchIdx, ...rest } = doc.data();
            return rest as User;
          }),
        );
      },
    );
    return () => unSub();
  }, [queryStr]);
  return { players, setQuery: setQueryStr };
}
