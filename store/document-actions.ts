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

export const createNewLesson = createAsyncThunk(
  "lesson/create",
  async (item: { id: string; label: string }, thunkApi) => {
    try {
      const response = await BaseURL.post("/api/documents/lessons", item);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const updateLesson = createAsyncThunk(
  "lesson/update",
  async (item: { id: string; label: string; content: string }, thunkApi) => {
    try {
      const response = await BaseURL.patch("/api/documents/lessons", item);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "lesson/delete",
  async (ids: { id: string; list: string[] }, thunkApi) => {
    try {
      const response = await BaseURL.post(
        "/api/documents/lessons/delete-request",
        ids.list
      );

      return ids;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "document/delete",
  async (ids: string[], thunkApi) => {
    try {
      const response = await BaseURL.post("/api/documents/delete-request", ids);

      return ids;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);

export const updateLearnTime = createAsyncThunk(
  "document/learnTime",
  async (ids: { id: string; learnTime: number }, thunkApi) => {
    try {
      const response = await BaseURL.patch(
        "/api/documents?learntime=true",
        ids
      );

      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response);
    }
  }
);
