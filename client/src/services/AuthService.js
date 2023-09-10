import axios from "axios";
import API, { API_URL } from "../http";

export default class AuthService {
    static async login(login, password) {
        try {
            const res = await API.post("/login", { login, password })
            localStorage.setItem("AccessToken", res.data.accessToken)
            return res
        } catch (error) {
            return error.response
        }
    }
    static async logout(login) {
        try {
            await API.post(`${API_URL}/logout`, { login })
            localStorage.removeItem("AccessToken")
            return
        } catch (error) {
            console.log("LOGOUT ERROR")
        }
    }
    static async checkAuth() {
        try {
            const res = await API.post(`${API_URL}/checkAuth`)
            return res
        } catch (error) {
            console.error("CHECK-AUTH ERROR |Unauthorized|")
            return null
        }
    }
    static async refresh() {
        try {
            const response = await axios.post(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('AccessToken', response.data.accessToken);
            return res
        } catch (error) {
            console.error("REFRESH TOKEN ERROR")
            return null
        }
    }
}