import { configureStore } from "@reduxjs/toolkit";
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

export default store;
