import axios, { AxiosHeaders } from "axios";

const backend_call = axios.create({
  baseURL: "http://localhost:3015/",

});

backend_call.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') ?? '';
  if(token) {
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`); // JWT
  }
  return config;
});

export default backend_call;
