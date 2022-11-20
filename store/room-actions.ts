import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";

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
