import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";

export const createNewDocument = createAsyncThunk(
  "document/create",
  async (title: string, thunkApi) => {
    try {
      const response = await BaseURL.post("/api/documents", { title: title });
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);
