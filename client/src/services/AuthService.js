import API from "../http";

export default class AuthService {
    static async login(login, password) {
        try {
            const res = await API.post("/login", { login, password })
            localStorage.setItem("AccessToken", res.data.accessToken)
            return res
        } catch (error) {
            return error
        }
    }
    static async logout(login) {
        try {
            const res = await API.post("/logout", { login })
            localStorage.removeItem("AccessToken")
            return res
        } catch (error) {
            console.log(error)
        }
    }
    static async refresh() {
        try {
            const res = await API.get("/refresh")
            return res
        }
        catch (error) {
            console.log(error)
        }
    }
}