import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL_API

const api = axios.create({
  baseURL
})


api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }

    return config;
  },
  (error) => {
    console.error(error)
    return Promise.reject(error);
  }
);

export default api;

