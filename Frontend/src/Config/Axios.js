import axios from "axios";

const token = localStorage.getItem("token");
const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default AxiosInstance;
