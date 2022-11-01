import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";

interface noteForm {
  id: string;
  content: string;
}

export const createOrUpdateNote = createAsyncThunk(
  "note/createupdate",
  async (note: noteForm) => {
    try {
      const response = await BaseURL.post("/api/notes", note);
      return response.data;
    } catch {
      console.log("error occur");
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/delete",
  async (id: string) => {
    try {
      const response = await BaseURL.delete(`/api/notes/${id}`);
      return response.data;
    } catch {
      console.log("error occur");
    }
  }
);
