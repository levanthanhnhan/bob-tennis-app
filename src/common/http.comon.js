import axios from "axios";

const httpCommon = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

const httpAuth = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-type": "application/json",
  },
});

const http = {
  auth: httpAuth,
  common: httpCommon,
}

export default http;
