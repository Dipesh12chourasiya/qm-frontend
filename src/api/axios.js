import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  baseURL: "https://qm-backend-4gat3nrdm-dipeshs-projects-539f827b.vercel.app",
  // "https://qm-backend-qf6q2p0o2-dipeshs-projects-539f827b.vercel.app"
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;