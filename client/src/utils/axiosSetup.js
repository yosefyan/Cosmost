import axios from "axios";

const localInstance = axios.create({
  baseURL: "http://localhost:5174/api/",
});

const cloudInstance = axios.create({
  baseURL: "https://api.example.com/api/",
});

const uploadInstance = axios.create({
  baseURL: "http://localhost:5174/upload/",
});

const authInstance = axios.create({
  baseURL: "http://localhost:5174/auth/",
});

export const addAuthorizationToken = (config, shouldIncludeToken) => {
  if (shouldIncludeToken) {
    config.headers["token"] = localStorage.getItem("token");
  }

  return config;
};

export { localInstance, cloudInstance, uploadInstance, authInstance };
