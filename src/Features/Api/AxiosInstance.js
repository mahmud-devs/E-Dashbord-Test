import axios from "axios";
export const axiosinstance = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_NAME,
  headers: { "Content-Type": "multipart/form-data" },
});
