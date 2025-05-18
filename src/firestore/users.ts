import { User } from "@/types/User";
import { batchArray } from "@/utils/array";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { firestoreDb } from "@/firestore/firestore";

export const fetchManyUsers = async (userIds: string[]): Promise<User[]> => {
  const docs = await Promise.all(
    batchArray(userIds, 30).map((ids) =>
      getDocs(query(collection(firestoreDb, "users"), where("id", "in", ids))),
    ),
  );
  return docs.flatMap((snapshot) =>
    snapshot.docs.map((doc) => doc.data() as User),
  );
};
