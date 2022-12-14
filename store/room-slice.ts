import { createSlice } from "@reduxjs/toolkit";
import { Room } from "../types/Room";
import { createNewRoom, joinRoom, leaveRoom } from "./room-actions";

let emptyGoal: Room[] = [];

const initialState: { items: Room[]; total: number } = {
  items: emptyGoal,
  total: 0,
};

const roomSlice = createSlice({
  name: "roomList",
  initialState: initialState,
  reducers: {
    replaceRoomList(state, action: { type: string; payload: Room[] }) {
      if (action.payload.length > 0) {
        state.items = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createNewRoom.fulfilled,
      (state, action: { type: string; payload: Room }) => {
        console.log(action.payload);

        state.items.push({ ...action.payload });
      }
    );
    builder.addCase(
      joinRoom.fulfilled,
      (state, action: { type: string; payload: Room | undefined }) => {
        state.items.push(action.payload!);
      }
    );
    builder.addCase(leaveRoom.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items].filter((note) => note.id !== action.payload),
      };
    });
  },
});
export const roomActions = roomSlice.actions;
export default roomSlice;
