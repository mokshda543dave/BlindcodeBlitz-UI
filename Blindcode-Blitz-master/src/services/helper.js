// release v1.0 commit

import axios from "axios";
import { getToken } from "../auth/auth";

export const BASE_URL = "http://localhost:8080";

export const Axios = axios.create({
  baseURL: BASE_URL,
});

export const PRIVATE_AXIOS = axios.create({
  baseURL: BASE_URL,
});

PRIVATE_AXIOS.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
