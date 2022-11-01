import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../types/note";
import { createOrUpdateNote, deleteNote } from "./note-actions";

const initialState: { items: Note[]; totalQuantity: number } = {
  items: [],
  totalQuantity: 0,
};

const noteSlice = createSlice({
  name: "notelist",
  initialState: initialState,
  reducers: {
    replaceNoteList(state, action: { type: string; payload: Note[] }) {
      return { ...state, items: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createOrUpdateNote.fulfilled,
      (state, action: { type: string; payload: Note }) => {
        const index = state.items.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index >= 0) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      }
    );
    builder.addCase(
      deleteNote.fulfilled,
      (state, action: { type: string; payload: Note }) => {
        return {
          ...state,
          items: [...state.items].filter(
            (note) => note.id !== action.payload.id
          ),
        };
      }
    );
  },
});

export const noteAction = noteSlice.actions;
export default noteSlice;
