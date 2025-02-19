import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Required for `httpOnly` cookies
});

// Attach JWT token from `localStorage` (only if using localStorage)
api.interceptors.request.use(
  (config) => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized errors (Token Expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token"); // Clear token
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
