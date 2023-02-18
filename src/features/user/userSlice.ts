import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: "Player 1",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUsername: (state, action) => {
      action.payload
        ? (state.userName = action.payload)
        : (state.userName = initialState.userName);
    },
  },
});

export const { storeUsername } = userSlice.actions;

export default userSlice.reducer;
