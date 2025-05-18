import { createSlice } from "@reduxjs/toolkit";
import { Game } from "@/types/Game";
import { unique } from "@/utils/array";
import { values } from "@/utils/object";
import { PendingEntity } from "@/store/types";

export interface GamesState {
  games: {
    [gameId: string]: (Game | PendingEntity) & {
      players: string[];
    };
  };
  activeGameConnection: string | null;
}

const initialState: GamesState = {
  games: {},
  activeGameConnection: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGame: (state, action: { payload: Game }) => {
      state.games[action.payload.id] = {
        ...action.payload,
        players: [],
      };
      return state;
    },
    setManyGames: (state, action: { payload: Game[] }) => {
      state = action.payload.reduce((acc, game) => {
        acc.games[game.id] = {
          ...game,
          players: [],
        };
        return acc;
      }, state);
      return state;
    },
    setState: (state, action: { payload: GamesState }) => {
      return action.payload;
    },
    setActiveGameConnection: (state, action: { payload: string | null }) => {
      state.activeGameConnection = action.payload;
      return state;
    },
    unsetActiveGameConnection: (state, action: { payload: string | null }) => {
      if (state.activeGameConnection === action.payload) {
        // we only unset if the game is the one being unset
        state.activeGameConnection = null;
      }
      return state;
    },
    addPlayersToGame: (
      state,
      action: {
        payload: {
          gameId: string;
          playerIds: string[];
        };
      },
    ) => {
      values(state.games).forEach((game) => {
        game.players = game.players.filter(
          (id) => !action.payload.playerIds.includes(id),
        );
      });
      const game = state.games[action.payload.gameId];
      if (game) {
        game.players = unique([...game.players, ...action.payload.playerIds]);
      }
      return state;
    },
    removePlayersFromGame: (
      state,
      action: {
        payload: {
          gameId: string;
          playerIds: string[];
        };
      },
    ) => {
      const game = state.games[action.payload.gameId];
      if (game) {
        game.players = game.players.filter(
          (playerId) => !action.payload.playerIds.includes(playerId),
        );
      }
      return state;
    },
  },
});

export const {
  setGame,
  setManyGames,
  setState: setGameState,
  addPlayersToGame,
  removePlayersFromGame,
  setActiveGameConnection,
  unsetActiveGameConnection,
} = gamesSlice.actions;

export const gamesReducer = gamesSlice.reducer;
