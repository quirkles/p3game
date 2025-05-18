import { configureStore } from "@reduxjs/toolkit";
import { sessionUserReducer } from "@/store/slices/sessionUser";
import { gamesReducer } from "@/store/slices/games";
import { playersReducer } from "@/store/slices/players";

export const makeStore = () => {
  return configureStore({
    reducer: {
      sessionUser: sessionUserReducer,
      games: gamesReducer,
      players: playersReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
