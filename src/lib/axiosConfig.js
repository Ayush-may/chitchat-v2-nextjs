"use client"
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: false,
});

export default axiosConfig;