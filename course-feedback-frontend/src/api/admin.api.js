import api from "./axios";

export const getAllFeedback = (params) =>
  api.get("/api/admin/feedback", { params });

export const getAdminStats = () =>
  api.get("/api/admin/stats");
