import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { BaseURL } from "../lib/axiosinstance";
interface loginForm {
  email: string;
  password: string;
}

interface registerForm {
  email: string;
  password: string;
  fullname: string;
}

export const signInWithCredential = createAsyncThunk(
  "auth/signin",
  async (user: loginForm) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });
    if (response!.ok) {
    }
  }
);

export const signUpwithCredentical = createAsyncThunk(
  "auth/signup",
  async (user: registerForm) => {
    try {
      const response = await BaseURL.post("/api/auth/signup", {
        email: user.email,
        password: user.password,
        fullname: user.fullname,
      });
      console.log(response.data);
    } catch {
      console.log("error occur");
    }
  }
);
