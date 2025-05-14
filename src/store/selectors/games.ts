import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { GamesState } from "@/store/slices/games";
import { selectRoot } from "@/store/selectors/root";

export const selectGames = createSelector(
  selectRoot,
  (state: RootState) => state.games,
);

export const selectGame = (gameId: string) =>
  createSelector(selectGames, (games: GamesState) => games[gameId]);
