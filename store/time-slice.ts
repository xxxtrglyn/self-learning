import { createSlice } from "@reduxjs/toolkit";
import { TimeControl } from "../types/timecontrol";
import { TimeItem } from "../types/timeitem";
import {
  createNewSlider,
  createNewTime,
  deleteSlider,
  deleteTime,
  updateSlider,
} from "./timecontrol-actions";

const initialState: { items: TimeControl[] } = {
  items: [],
};

const TimeSlice = createSlice({
  name: "TimeList",
  initialState: initialState,
  reducers: {
    replaceTimeList(state, action: { type: string; payload: TimeControl[] }) {
      return { ...state, items: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createNewTime.fulfilled,
      (state, action: { type: string; payload: TimeControl }) => {
        console.log(action.payload);

        state.items.push({ ...action.payload, timeitems: [] });
      }
    );
    builder.addCase(
      createNewSlider.fulfilled,
      (state, action: { type: string; payload: TimeItem }) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.timeControlId
        );
        state.items[index].timeitems.push(action.payload);
      }
    );
    builder.addCase(
      deleteSlider.fulfilled,
      (state, action: { type: string; payload: TimeItem }) => {
        return {
          ...state,
          items: [...state.items].map((timecontrol) => {
            if (timecontrol.id !== action.payload.timeControlId) {
              return { ...timecontrol };
            } else {
              return {
                ...timecontrol,
                timeitems: timecontrol.timeitems.filter(
                  (item) => item.id !== action.payload.id
                ),
              };
            }
          }),
        };
      }
    );
    builder.addCase(
      updateSlider.fulfilled,
      (state, action: { type: string; payload: TimeItem }) => {
        console.log(action.payload);

        const indexGoal = state.items.findIndex(
          (goal) => goal.id === action.payload.timeControlId
        );
        const indexTimeItem = state.items[indexGoal].timeitems!.findIndex(
          (TimeItem) => TimeItem.id === action.payload.id
        );
        state.items[indexGoal].timeitems![indexTimeItem] = action.payload;
      }
    );
    builder.addCase(
      deleteTime.fulfilled,
      (state, action: { type: string; payload: TimeControl }) => {
        return {
          ...state,
          items: [...state.items].filter(
            (note) => note.id !== action.payload.id
          ),
        };
      }
    );
  },
});

export const timeActions = TimeSlice.actions;
export default TimeSlice;
