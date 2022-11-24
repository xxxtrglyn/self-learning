import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  signInWithCredential,
  signUpwithCredentical,
  updateProfile,
} from "./auth-actions";
import { createNewGoal, deleteGoal } from "./goal-actions";
import { createOrUpdateNote, deleteNote } from "./note-actions";
import { createNewTimeTable, deleteTimeLine } from "./timetable-actions";

interface Notification {
  status: string;
  title: string;
  message: string;
}

const initialState: {
  loaderOverlay: boolean;
  notification: Notification | null;
} = {
  loaderOverlay: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.loaderOverlay = !state.loaderOverlay;
    },
    showNotification(
      state,
      action: { type: string; payload: Notification | null }
    ) {
      state.notification = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signInWithCredential.pending, (state) => {
      state.loaderOverlay = true;
    });
    builder.addCase(signInWithCredential.fulfilled, (state) => {
      state.loaderOverlay = false;
    });
    builder.addCase(signUpwithCredentical.pending, (state) => {
      state.loaderOverlay = true;
    });
    builder.addCase(signUpwithCredentical.fulfilled, (state) => {
      state.loaderOverlay = false;
    });
    builder.addCase(createNewGoal.pending, (state) => {
      state.loaderOverlay = true;
    });
    builder.addCase(createNewGoal.fulfilled, (state, action: any) => {
      state.loaderOverlay = false;
      state.notification = {
        status: "success",
        message: "Create successfully!",
        title: "Success",
      };
    });
    builder.addCase(
      createNewGoal.rejected,
      (state, action: { type: string; payload: any }) => {
        state.loaderOverlay = false;

        state.notification = {
          status: "error",
          message: action.payload.data.message,
          title: "Title Error",
        };
      }
    );
    builder.addCase(deleteGoal.fulfilled, (state) => {
      state.notification = {
        status: "success",
        message: "Delete successfully",
        title: "Success",
      };
    });
    builder.addCase(
      deleteGoal.rejected,
      (state, action: { type: string; payload: any }) => {
        state.notification = {
          status: "error",
          message: action.payload.data.message,
          title: "Delete Error",
        };
      }
    );
    builder.addCase(updateProfile.pending, (state) => {
      state.loaderOverlay = true;
    });
    builder.addCase(updateProfile.fulfilled, (state) => {
      state.loaderOverlay = false;
      state.notification = {
        status: "success",
        title: "Success",
        message: "Update profule successfully",
      };
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loaderOverlay = true;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loaderOverlay = false;
      state.notification = {
        status: "success",
        title: "Success",
        message: "Change password successfully",
      };
    });
    builder.addCase(createNewTimeTable.fulfilled, (state) => {
      state.notification = {
        status: "success",
        title: "Success",
        message: "Create new Timetable successfully!",
      };
    });
    builder.addCase(createOrUpdateNote.fulfilled, (state) => {
      state.notification = {
        status: "success",
        title: "Success",
        message: "Create/Update successfully!",
      };
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.notification = {
        status: "success",
        title: "Success",
        message: "Delete successfully!",
      };
    });
    builder.addCase(deleteTimeLine.fulfilled, (state) => {
      state.notification = {
        status: "success",
        title: "Success",
        message: "Delete successfully!",
      };
    });
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
