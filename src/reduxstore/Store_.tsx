import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userslice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define RootState type for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
