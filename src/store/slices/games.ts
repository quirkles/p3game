import { createSlice } from "@reduxjs/toolkit";
import { Game } from "@/types/Game";

export interface GamesState {
  [gameId: string]: Game;
}

const initialState: GamesState = {};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGame: (state, action: { payload: Game }) => {
      state[action.payload.id] = action.payload;
      return state;
    },
    setManyGames: (state, action: { payload: Game[] }) => {
      state = action.payload.reduce((acc, game) => {
        acc[game.id] = game;
        return acc;
      }, state);
      return state;
    },
    setState: (state, action: { payload: GamesState }) => {
      return action.payload;
    },
  },
});

export const {
  setGame,
  setManyGames,
  setState: setGameState,
} = gamesSlice.actions;

export const gamesReducer = gamesSlice.reducer;
