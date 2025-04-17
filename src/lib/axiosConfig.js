"use client"
import axios from "axios";

const axiosConfig = axios.create({
  // baseURL: "http://localhost:8000/api/",
  baseURL: process.env.APP_BACKEND,
  withCredentials: false,
});

export default axiosConfig;