import { createSlice } from "@reduxjs/toolkit";
import { Timeline } from "../types/timeline";
import { Timetable } from "../types/timetable";
import {
  createNewTimeLine,
  createNewTimeTable,
  deleteTimeLine,
  deleteTimetable,
} from "./timetable-actions";

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
    });
    builder.addCase(
      createNewTimeLine.fulfilled,
      (state, action: { type: string; payload: Timeline }) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.timeTableId
        );
        state.items[index].timelines.push(action.payload);
      }
    );
    builder.addCase(deleteTimetable.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items].filter((timetable) => {
          return !action.payload?.find((id) => {
            return timetable.id === id;
          });
        }),
      };
    });
    builder.addCase(
      deleteTimeLine.fulfilled,
      (state, action: { type: string; payload: Timeline }) => {
        return {
          ...state,
          items: [...state.items].map((timetable) => {
            if (timetable.id !== action.payload.timeTableId) {
              return timetable;
            } else {
              return {
                ...timetable,
                timelines: timetable.timelines.filter(
                  (timeline) => timeline.id !== action.payload.id
                ),
              };
            }
          }),
        };
      }
    );
  },
});

export const timeTableAction = timeTableSlice.actions;
export default timeTableSlice;
