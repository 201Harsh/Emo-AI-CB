import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

export default AxiosInstance