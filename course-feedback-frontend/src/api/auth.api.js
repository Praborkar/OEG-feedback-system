import api from "./axios";

export const adminLogin = (data) =>
  api.post("/api/auth/login", data);

export const adminSignup = (data) =>
  api.post("/api/auth/signup", data);
