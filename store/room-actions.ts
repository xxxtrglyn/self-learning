import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";
import { Room } from "../types/Room";

export const createNewRoom = createAsyncThunk(
  "room/create",
  async (name: string) => {
    try {
      const response = await BaseURL.post("/api/rooms", { name: name });

      return response.data;
    } catch {
      console.log("?");
    }
  }
);

export const joinRoom = createAsyncThunk("room/join", async (room: Room) => {
  try {
    const response = await BaseURL.patch("/api/rooms?join=true", {
      id: room.id,
    });

    return room;
  } catch {
    console.log("?");
  }
});
export const leaveRoom = createAsyncThunk(
  "room/leave",
  async (id: { userId: string; roomId: string }) => {
    try {
      const response = await BaseURL.patch("/api/rooms?leave=true", id);

      return id.roomId;
    } catch {
      console.log("?");
    }
  }
);
