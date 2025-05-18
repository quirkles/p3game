import { User } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import { addPlayersToGame, removePlayersFromGame } from "@/store/slices/games";
import { PendingEntity } from "@/store/types";
import { fetchMany } from "@/store/thunks/players";

export interface PlayersState {
  players: {
    [playerId: string]: (User | PendingEntity) & {
      game: string | null;
    };
  };
}

const initialState: PlayersState = {
  players: {},
};

const playersSlice = createSlice({
  name: "players",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPlayersToGame, (state, action) => {
      action.payload.playerIds.forEach((playerId) => {
        state.players[playerId] = {
          ...(state.players[playerId] || { id: playerId, status: "PENDING" }),
          game: action.payload.gameId,
        };
      });
    });
    builder.addCase(removePlayersFromGame, (state, action) => {
      action.payload.playerIds.forEach((playerId) => {
        state.players[playerId] = {
          ...(state.players[playerId] || { id: playerId, status: "PENDING" }),
          game: null,
        };
      });
    });
    builder.addCase(fetchMany.pending, (state, action) => {
      action.meta.arg.forEach((playerId) => {
        const player: Partial<PendingEntity> = state.players[playerId] || {
          id: playerId,
          game: null,
        };
        player["status"] = "FETCHING";
        state.players[playerId] = player as PendingEntity & {
          game: string | null;
        };
      });
      return state;
    });
    builder.addCase(fetchMany.fulfilled, (state, action) => {
      action.payload.forEach((player) => {
        state.players[player.id] = {
          ...player,
          game: state.players[player.id]?.game || null,
        };
      });
    });
  },
});

export const playersReducer = playersSlice.reducer;
