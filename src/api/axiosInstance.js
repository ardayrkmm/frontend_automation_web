import axios from "axios";
import { logout } from "../features/authSlice";
import Config from "./config";

let storeRef; // tempat simpan store nanti

export const injectStore = (store) => {
    storeRef = store;
};

const axiosInstance = axios.create({
    baseURL: Config.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token expired. Logout otomatis...");

            if (storeRef) {
                storeRef.dispatch(logout());
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
