import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { authActions } from "./auth-slice";

interface loginForm {
  username: string;
  password: string;
}

export const signInWithCredential = createAsyncThunk(
  "auth/signin",
  async (user: loginForm) => {
    const response = await signIn("credentials", {
      redirect: false,
      username: user.username,
      password: user.password,
    });
    if (response!.ok) {
    }
  }
);
