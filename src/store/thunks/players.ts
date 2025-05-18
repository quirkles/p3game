import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchManyUsers } from "@/firestore/users";

export const fetchMany = createAsyncThunk(
  "users/fetchMany",
  async (userIds: string[]) => {
    return fetchManyUsers(userIds).then((users) =>
      users.map((user) => ({
        id: user.id,
        name: user.name,
      })),
    );
  },
);
