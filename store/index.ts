import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth-slice";

import goalSlice from "./goal-slice";
import noteSlice from "./note-slice";

const store = configureStore({
  reducer: {
    goal: goalSlice.reducer,
    auth: authSlice.reducer,
    note: noteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
