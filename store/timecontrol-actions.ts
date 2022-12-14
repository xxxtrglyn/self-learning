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
    time: {
      id: string;
      description: string;
      amount: number;
      documentId: string;
    },
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

export const deleteSlider = createAsyncThunk(
  "slider/delete",
  async (id: string, thunkApi) => {
    try {
      const response = await BaseURL.delete(
        `/api/daycontrol/timecontrol?id=${id}`
      );
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);
export const deleteTime = createAsyncThunk(
  "time/delete",
  async (id: string, thunkApi) => {
    try {
      const response = await BaseURL.delete(`/api/daycontrol?id=${id}`);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);
