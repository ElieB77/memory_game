import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RenderState {
  value: string;
  theme: string;
}

const initialState: RenderState = {
  value: "home",
  theme: "Choisissez un théme",
};

export const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    rendering: (state, action) => {
      state.value = action.payload;
    },
    choseTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { rendering, choseTheme } = renderSlice.actions;

export default renderSlice.reducer;
