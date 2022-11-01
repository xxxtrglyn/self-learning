import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";

export const createNewTimeTable = createAsyncThunk(
  "goal/create",
  async (title: string) => {
    try {
      const response = await BaseURL.post("/api/timetables", { title: title });
      return response.data;
    } catch {
      console.log("?");
    }
  }
);
