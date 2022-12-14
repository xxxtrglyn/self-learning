import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/react";
import { BaseURL } from "../lib/axiosinstance";
import { User } from "../types/user";
interface loginForm {
  email: string;
  password: string;
}

interface registerForm {
  email: string;
  password: string;
  fullname: string;
}

interface updateForm {
  avatar: string;
  fullname: string;
  phone: number;
  dob: string | null;
  city: string;
  job: string;
  quotes: string;
}

interface changePasswordForm {
  password: string;
  newPassword: string;
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
      window.location.replace(
        "https://self-learning-kappa.vercel.app/dashboard"
      );
      return true;
    } else {
      return false;
    }
  }
);
export const logout = createAsyncThunk("auth/signout", async () => {
  signOut({ callbackUrl: "https://self-learning-kappa.vercel.app" });
  return true;
});

export const signUpwithCredentical = createAsyncThunk(
  "auth/signup",
  async (user: registerForm) => {
    try {
      const response = await BaseURL.post("/api/auth/signup", {
        email: user.email,
        password: user.password,
        fullname: user.fullname,
      });
    } catch {}
  }
);

export const updateProfile = createAsyncThunk(
  "auth/update",
  async (user: updateForm) => {
    try {
      const response = await BaseURL.post("/api/auth/update", user);
    } catch {
      console.log("error occurs");
    }
  }
);

export const adminUpdateUser = createAsyncThunk(
  "auth/updateuser",
  async (user: User) => {
    try {
      const response = await BaseURL.post("/api/auth/admin/user", user);
    } catch {
      console.log("error occurs");
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changepassword",
  async (password: changePasswordForm) => {
    try {
      const response = await BaseURL.post(
        "/api/auth/change-password",
        password
      );
      console.log(response);
    } catch {
      console.log("error occurs");
    }
  }
);
