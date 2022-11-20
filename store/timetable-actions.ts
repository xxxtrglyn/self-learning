import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../lib/axiosinstance";

interface newTimeline {
  id: string;
  moreDetail: string;
  startAt: string;
  endAt: string;
}

export const createNewTimeTable = createAsyncThunk(
  "timetable/create",
  async (title: string) => {
    try {
      const response = await BaseURL.post("/api/timetables", { title: title });
      return response.data;
    } catch {
      console.log("?");
    }
  }
);

export const createNewTimeLine = createAsyncThunk(
  "timeline/create",
  async (timeline: newTimeline) => {
    try {
      const response = await BaseURL.post(
        "/api/timetables/timelines",
        timeline
      );
      return response.data;
    } catch {
      console.log("?");
    }
  }
);

export const updateTimeline = createAsyncThunk(
  "timeline/update",
  async (timeline: newTimeline) => {
    try {
      const response = await BaseURL.patch(
        `/api/timetables/timelines/${timeline.id}`,
        {
          moreDetail: timeline.moreDetail,
          startAt: timeline.startAt,
          endAt: timeline.endAt,
        }
      );
      return response.data;
    } catch {
      console.log("?");
    }
  }
);

export const deleteTimetable = createAsyncThunk(
  "timetable/delete",
  async (list: string[]) => {
    try {
      const response = await BaseURL.post(
        "api/timetables/delete-request",
        list
      );
      return list;
    } catch {
      console.log("?");
    }
  }
);
