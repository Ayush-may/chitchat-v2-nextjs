"use client"
import axios from "axios"; "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export default axiosConfig;