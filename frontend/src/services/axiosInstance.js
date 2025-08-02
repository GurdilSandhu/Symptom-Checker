import axios from "axios";

const API = axios.create({ baseURL: "https://healthcare-1-2b0j.onrender.com/api/auth/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

