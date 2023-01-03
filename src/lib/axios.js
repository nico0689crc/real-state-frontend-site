import axios from "axios";
import getUserData from "./getUserData.js";

export const axiosAdminPath = (headers) => {
  const { uid, accessToken, client } = getUserData();

  const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ADMIN_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      uid: uid,
      "access-token": accessToken,
      client: client,
      ...headers
    },
  });

  request.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return request;
}

export const axiosPublicPath = (headers) => {
  const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_PUBLIC_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
  });

  request.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return request;
}

export const axiosRootPath = (headers) => {
  const request = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_ROOT,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
  });

  request.interceptors.request.use(
    config => {
      config.headers = {
        ...config.headers
      };
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return request;
}
