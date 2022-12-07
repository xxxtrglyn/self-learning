import { createSlice } from "@reduxjs/toolkit";
import { TimeControl } from "../types/timecontrol";
import { TimeItem } from "../types/timeitem";
import { createNewSlider, createNewTime } from "./timecontrol-actions";

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
  },
});

export const timeActions = TimeSlice.actions;
export default TimeSlice;
