import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";

export const createNewTime = createAsyncThunk(
  "timecontrol/create",
  async (time: { date: string }, thunkApi) => {
    try {
      const response = await BaseURL.post("/api/daycontrol", time);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const createNewSlider = createAsyncThunk(
  "slider/create",
  async (
    time: { id: string; description: string; amount: number },
    thunkApi
  ) => {
    try {
      const response = await BaseURL.post("/api/daycontrol/timecontrol", time);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);
export const updateSlider = createAsyncThunk(
  "slider/update",
  async (
    time: { id: string; description: string; amount: number },
    thunkApi
  ) => {
    try {
      const response = await BaseURL.patch("/api/daycontrol/timecontrol", time);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);
