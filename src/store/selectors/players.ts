import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { filterMapReduceValues } from "@/utils/object";

export const selectPlayerState = (state: RootState) => state.players;

export const selectPlayers = createSelector(
  selectPlayerState,
  (players) => players.players,
);

export const selectPlayersToFetch = createSelector(selectPlayers, (players) =>
  filterMapReduceValues(players, {
    filter: (player) => "status" in player && player.status === "PENDING",
    map: (player) => player.id,
  }),
);
