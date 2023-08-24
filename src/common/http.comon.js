import axios from "axios";

const httpCommon = axios.create({
  baseURL: import.meta.env.VITE_HOST_COMMON,
  headers: {
    "Content-type": "application/json",
  },
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
}

export default http;
