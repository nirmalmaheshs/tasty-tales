import axios from "axios";

console.log(process.env.REACT_APP_BACKEND_URL)
const axiosConfig = {
    baseURL: process.env.REACT_APP_BACKEND_URL,
};
export const axiosInstance = axios.create(axiosConfig);