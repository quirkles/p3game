import { Game } from "@/types/Game";

// Common shared
export type PendingEntity = {
  status: "PENDING" | "FETCHING";
  id: string;
};

// Store versions of entities
export type StoreGame = (Game | PendingEntity) & {
  players: string[];
};

// TypeGuards
export function isFetchedStoreGame(
  entity: StoreGame,
): entity is Game & { players: string[] } {
  return "name" in entity;
}
