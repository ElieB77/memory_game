// This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.

import { configureStore } from "@reduxjs/toolkit";
import renderReducer from "../redux/render/renderSlice";
import userReducer from "../redux/user/userSlice";
import sesionReducer from "../redux/session/sessionSlice";

export const store = configureStore({
  reducer: {
    render: renderReducer,
    user: userReducer,
    session: sesionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
