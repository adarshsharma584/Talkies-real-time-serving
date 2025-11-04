import axios from "axios";

// Provide a sensible fallback for local development when VITE_API_URL isn't set.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
