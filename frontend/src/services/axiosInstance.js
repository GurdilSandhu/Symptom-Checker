import axios from "axios";

const API = axios.create({ baseURL: "https://symptom-checker-backend-06mx.onrender.com/api/auth" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

