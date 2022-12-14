import axios from "axios";

export const BaseURL = axios.create({
  baseURL: "https://self-learning-kappa.vercel.app",
});
