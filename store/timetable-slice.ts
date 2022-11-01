import { createSlice } from "@reduxjs/toolkit";
import { Timetable } from "../types/timetable";
import { createNewTimeTable } from "./timetable-actions";

const initialState: { items: Timetable[]; totalQuantity: number } = {
  items: [],
  totalQuantity: 0,
};

const timeTableSlice = createSlice({
  name: "timeTablelist",
  initialState: initialState,
  reducers: {
    replaceTimeTableList(
      state,
      action: { type: string; payload: Timetable[] }
    ) {
      return { ...state, items: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(createNewTimeTable.fulfilled, (state, action) => {
      state.items.push({
        id: action.payload.id,
        userId: action.payload.userId,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updateAt,
        timelines: [],
        title: action.payload.title,
      });
      console.log(state.items.length);
    });
  },
});

export const timeTableAction = timeTableSlice.actions;
export default timeTableSlice;
