import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { logout, signInWithCredential } from "./auth-actions";

const initialState: { isLogin: boolean; info: User | null } = {
  isLogin: false,
  info: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    updateInfo(state, action: { type: string; payload: User }) {
      state.info = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      signInWithCredential.fulfilled,
      (state, action: { type: string; payload: boolean }) => {
        if (action.payload) {
          state.isLogin = true;
        }
      }
    );
    builder.addCase(logout.fulfilled, (state) => {
      state.isLogin = false;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
