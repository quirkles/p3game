import { type RootState } from "@/store/store";

export const selectSessionUser = (state: RootState) => state.sessionUser;
