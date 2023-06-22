import axios from "axios"
import AuthService from "../services/AuthService"

const API_URL = "http://localhost:5000/api"

const API = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("AccessToken")}`
    return config
})

API.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            console.log(response.data)
            localStorage.setItem('AccessToken', response.data.accessToken);
            return API.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default API