const userService = require("../services/user-service")

const authController = class {
    async login(req, res, next) {
        try {
            const { login, password } = req.body
            const userData = await userService.login(login, password)
            res.cookie("refreshToken", userData.refreshToken, { httOnly: true, maxAge: 3600000 })
            res.status(200).json({ accessToken: userData.accessToken, userData })
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const userLogin = req.body.login
            const user = await userService.logout(userLogin)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
    async getUsers(req, res, next) {
        res.json(res.isOwner || "не авторизован")
    }
    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken
            // console.log(refreshToken)
            const userData = await userService.refreshTokens(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { httOnly: true, maxAge: 3600000 })
            res.status(200).json({ accessToken: userData.accessToken })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new authController()