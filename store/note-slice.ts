import { createSlice } from "@reduxjs/toolkit";

interface note {
  id: number;
  userId: string;
  content: string;
}

const initialState = {
  items: [
    {
      id: 1,
      userId: 2,
      content: "sasasasascccccccccc",
    },
    {
      id: 2,
      userId: 2,
      content: "zzzzzzzzzzzzzzzzzzzzzzz",
    },
    {
      id: 3,
      userId: 2,
      content: "ddddddddddddddddddddddddddd",
    },
  ],
  total: 3,
};

const noteSlice = createSlice({
  name: "notelist",
  initialState: initialState,
  reducers: {},
});

export const noteAction = noteSlice.actions;
export default noteSlice;
