import { createSlice } from "@reduxjs/toolkit";
import { Document2 } from "../types/document";
import { Lesson } from "../types/lesson";
import {
  createNewDocument,
  createNewLesson,
  deleteDocument,
  deleteLesson,
  updateLesson,
} from "./document-actions";

let emptyGoal: Document2[] = [];

const initialState = {
  items: emptyGoal,
  totalQuantity: 0,
};

const documentSlice = createSlice({
  name: "documentlist",
  initialState: initialState,
  reducers: {
    replaceDocumentList(state, action: { type: string; payload: Document2[] }) {
      state.items = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createNewDocument.fulfilled, (state, action) => {
      state.items.push({ ...action.payload, lessons: [] });
    });
    builder.addCase(deleteDocument.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items].filter((goal) => {
          return !action.payload?.find((id) => {
            return goal.id === id;
          });
        }),
      };
    });
    builder.addCase(
      createNewLesson.fulfilled,
      (state, action: { type: string; payload: Lesson }) => {
        const index = state.items.findIndex(
          (goal) => goal.id === action.payload.documentId
        );
        state.items[index].lessons!.push(action.payload);
      }
    );
    builder.addCase(
      updateLesson.fulfilled,
      (state, action: { type: string; payload: Lesson }) => {
        const indexGoal = state.items.findIndex(
          (goal) => goal.id === action.payload.documentId
        );
        const indexLesson = state.items[indexGoal].lessons!.findIndex(
          (Lesson) => Lesson.id === action.payload.id
        );
        state.items[indexGoal].lessons![indexLesson] = action.payload;
      }
    );
    builder.addCase(
      deleteLesson.fulfilled,
      (
        state,
        action: { type: string; payload: { id: string; list: string[] } }
      ) => {
        return {
          ...state,
          items: [...state.items].map((doc) => {
            if (doc.id !== action.payload.id) {
              return doc;
            } else {
              return {
                ...doc,
                lessons: doc.lessons?.filter(
                  (lesson) =>
                    !action.payload.list.find((id) => id === lesson.id)
                ),
              };
            }
          }),
        };
      }
    );
    //     builder.addCase(updateGoal.fulfilled, (state, action) => {
    //       const newItems = [...state.items].map((goal) => {
    //         if (goal.id === action.payload.id) {
    //           return { ...goal, label: action.payload.title };
    //         }
    //         return goal;
    //       });
    //       console.log(newItems);
    //       return { ...state, items: newItems };
    //     });
  },
});

export const documentActions = documentSlice.actions;

export default documentSlice;
