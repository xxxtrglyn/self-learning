import { createSlice } from "@reduxjs/toolkit";
import { signInWithCredential } from "./auth-actions";

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
    builder.addCase(signInWithCredential.fulfilled, (state, action) => {
      state.isLogin = true;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
