import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { selectRoot } from "@/store/selectors/root";

export const selectGamesState = createSelector(
  selectRoot,
  (state: RootState) => state.games,
);

export const selectGames = createSelector(
  selectGamesState,
  (games) => games.games,
);

export const selectGame = (gameId: string) =>
  createSelector(selectGames, (games) => games[gameId]);

export const selectActiveGame = createSelector(selectGamesState, (games) =>
  games.activeGameConnection
    ? games.games[games.activeGameConnection] || null
    : null,
);
