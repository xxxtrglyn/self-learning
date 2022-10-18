import axios from "axios";

export const BaseURL = axios.create({
  baseURL: "http://localhost:3000",
});
