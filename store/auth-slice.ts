import { createSlice } from "@reduxjs/toolkit";
import { logout, signInWithCredential } from "./auth-actions";

const initialState = { isLogin: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
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
