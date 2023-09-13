import { makeAutoObservable } from "mobx"
import AuthService from "../services/AuthService"

class AuthStore {
    userLogin = ""
    isAuth = false
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    setUserLogin = (login) => {
        this.userLogin = login
    }

    setAuth = (isAuth) => {
        this.isAuth = isAuth
    }

    setLoading = (isLoading) => {
        this.loading = isLoading
    }


    logIn = async (email, password) => {
        const res = await AuthService.login(email, password)
        if (!(res.status == 200)) {
            console.log(res.data.message)
            return res
        }
        this.setUserLogin(res.data.login)
        this.setAuth(true)
        return null
    }
    logOut = async () => {
        await AuthService.logout(this.login)
        this.setUserLogin("")
        this.setAuth(false)
        console.log('logout')
    }
    refresh = async () => {
        this.setLoading(true)
        try {
            const res = await AuthService.refresh()
            if (!res.data.accessToken) {
                return null
            }
            this.setAuth(true)
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(false)
        }
    }
    checkAuth = async () => {
        this.setLoading(true)
        try {
            console.log("ПРОВЕРКА АВТОРИЗАЦИИ |auth-store|")
            const res = await AuthService.checkAuth()
            console.log(res)
            if (!res?.data?.login) {
                return null
            }
            this.userLogin = res.data.login
            this.setAuth(true)
        } catch (error) {
            // console.log(error)
        } finally {
            this.setLoading(false)
        }
    }
}

export default new AuthStore()