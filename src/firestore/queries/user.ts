import { User } from "@/types/User";
import { collection, doc, setDoc } from "@firebase/firestore";
import { firestoreDb } from "@/firestore/firestore";
import { createSearchIndex } from "@/firestore/queries/utils";

export async function saveUser(user: Pick<User, "name">): Promise<User> {
  const gameRef = doc(collection(firestoreDb, "users"));
  const newDoc = { ...user, id: gameRef.id } as const;
  await setDoc(gameRef, createSearchIndex(newDoc, ["name"]));
  return newDoc;
}
