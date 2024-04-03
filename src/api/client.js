// src/api/client.js
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001/api",
});

client.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Updated to retrieve "accessToken"
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
