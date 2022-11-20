import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../types/Room";
import { createNewRoom } from "./room-actions";

const initialState: { items: Room[] } = {
  items: [],
};

const roomSlice = createSlice({
  name: "roomList",
  initialState: initialState,
  reducers: {
    replaceRoomList(state, action: { type: string; payload: Room[] }) {
      return { ...state, items: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createNewRoom.fulfilled,
      (state, action: { type: string; payload: Room }) => {
        state.items.push(action.payload);
      }
    );
  },
});
export const roomActions = roomSlice.actions;
export default roomSlice;
