import axios from "axios";
import { getAccessToken } from "@/store/authStorage";

export const axiosInstance = axios.create({
  baseURL: "https://library-backend-production-b9cf.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});