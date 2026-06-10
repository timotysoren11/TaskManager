import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

taskApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default taskApi;