import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth-slice";
import documentSlice from "./document-slice";

import goalSlice from "./goal-slice";
import noteSlice from "./note-slice";
import roomSlice from "./room-slice";
import TimeSlice from "./time-slice";
import timeTableSlice from "./timetable-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    goal: goalSlice.reducer,
    auth: authSlice.reducer,
    note: noteSlice.reducer,
    timetable: timeTableSlice.reducer,
    room: roomSlice.reducer,
    document: documentSlice.reducer,
    ui: uiSlice.reducer,
    time: TimeSlice.reducer,
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
