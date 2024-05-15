import axios from "axios";

const baseURL =
  import.meta.env.VITE_SERVER_URL || "https://cosmost.onrender.com";

const localInstance = axios.create({
  baseURL: `${baseURL}/api/`,
});

const uploadInstance = axios.create({
  baseURL: `${baseURL}/upload/`,
});

const authInstance = axios.create({
  baseURL: `${baseURL}/auth/`,
});

export const addAuthorizationToken = (config, shouldIncludeToken) => {
  if (shouldIncludeToken) {
    config.headers["token"] = localStorage.getItem("token");
  }

  return config;
};

export { localInstance, uploadInstance, authInstance };
