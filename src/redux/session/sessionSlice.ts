import { createSlice } from "@reduxjs/toolkit";

export interface SessionState {
  status: string;
  isTimeUp: boolean;
  chrono: number;
  score: number;
  bestScore: number;
}

const initialState: SessionState = {
  status: "off",
  isTimeUp: false,
  chrono: 0,
  score: 0,
  bestScore: 0,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setIsTimeUp: (state, action) => {
      state.isTimeUp = action.payload;
    },
    setGameStatus: (state, action) => {
      state.status = action.payload;
      if (state.status === "on") {
        state.chrono = 60;
      } else {
        state.chrono = initialState.chrono;
      }
    },
    setScore: (state, action) => {
      state.score = action.payload;
      if (action.payload > state.bestScore) {
        state.bestScore = state.score;
      }
    },
  },
});

export const { setIsTimeUp, setGameStatus, setScore } = sessionSlice.actions;

export default sessionSlice.reducer;
