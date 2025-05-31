import { type RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectSessionUser = (state: RootState) => state.sessionUser;

export const selectSessionUserId = createSelector(
  selectSessionUser,
  (sessionUser) => sessionUser.id || null,
);
