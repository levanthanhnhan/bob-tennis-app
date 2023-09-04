import axios from "axios";

const httpCommon = axios.create({
  baseURL: import.meta.env.VITE_HOST_COMMON,
  headers: {
    "Content-type": "application/json",
  },
});

// Add a request interceptor
httpCommon.interceptors.request.use(
  (config) => {
    const token = JSON.parse(window.localStorage.getItem("vuex")).user.accessToken;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    this.$router("/login");
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpCommon.interceptors.response.use(function (response) {
  if (response.status != 200) {
    this.$router("/login");
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

const httpAuth = axios.create({
  baseURL: import.meta.env.VITE_HOST_AUTH,
  headers: {
    "Content-type": "application/json",
  },
});

const http = {
  auth: httpAuth,
  common: httpCommon,
};

export default http;
