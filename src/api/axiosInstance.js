import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://blatantly-large-coral.ngrok-free.app/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk otomatis tambahkan token di setiap request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;