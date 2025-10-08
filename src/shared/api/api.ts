import axios from "axios";
import { env } from "@/shared/config/env";

const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;