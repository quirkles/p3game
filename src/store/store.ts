import { configureStore } from "@reduxjs/toolkit";
import { sessionUserReducer } from "@/store/slices/sessionUser";
import { gamesReducer } from "@/store/slices/games";

export const makeStore = () => {
  return configureStore({
    reducer: {
      sessionUser: sessionUserReducer,
      games: gamesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];