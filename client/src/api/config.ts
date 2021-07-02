import axios from "axios";
import { checkAuth } from "../services";

const Axios = axios.create({
  baseURL: "http://localhost:4000/",
});

Axios.interceptors.request.use(async (config) => {
  const token = checkAuth();
  const configuration = config;
  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`;
  }
  return configuration;
});

export default Axios;
