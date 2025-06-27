"use client"
import axios from "axios";

const axiosConfig = axios.create({
  // baseURL: "http://localhost:8080/api/",
  baseURL: "http://13.233.125.25/api",
  withCredentials: false,
});

export default axiosConfig;