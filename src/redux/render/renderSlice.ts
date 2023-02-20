import { createSlice } from "@reduxjs/toolkit";

export interface RenderState {
  value: string;
}

const initialState: RenderState = {
  value: "home",
};

export const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    rendering: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { rendering } = renderSlice.actions;

export default renderSlice.reducer;
