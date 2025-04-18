import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import { saveUser } from "@/firestore/queries/user";
import { RootState } from "@/store/store";

export interface SessionUserState {
  name: string | null;
  id: string | null;
}

const initialState: SessionUserState = {
  name: null,
  id: null,
};

export const saveUserThunk = createAsyncThunk(
  "sessionUser/persistUserInFirestore",
  (user: Pick<User, "name">) => {
    return saveUser(user);
  },
);

const userSlice = createSlice({
  name: "sessionUser",
  initialState,
  reducers: {
    setName(state, action: { payload: string }) {
      state.name = action.payload;
    },
    setUser(state, action: { payload: User }) {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUserThunk.fulfilled, (state, action) => {
      localStorage.setItem("sessionUser", JSON.stringify(action.payload));
      state.id = action.payload.id;
    });
  },
});

export const { setName, setUser } = userSlice.actions;

export const sessionUserReducer = userSlice.reducer;

export const selectSessionUser = (state: RootState) => state.sessionUser;
