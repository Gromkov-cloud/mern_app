const UserDto = require("../dtos/userDto")
const tokenService = require("../services/token-service")
const userService = require("../services/user-service")

const authController = class {
    async login(req, res, next) {
        try {
            const { login, password } = req.body
            const user = await userService.login(login, password)
            const userDto = new UserDto(user.userData)
            tokenService.setRefreshTokenCookie(res, user.refreshToken)
            res.status(200).json({ ...userDto, accessToken: user.accessToken })
        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const userLogin = req.body.login
            console.log(req.body)
            console.log(userLogin)
            const user = await userService.logout(userLogin)
            res.clearCookie("refreshToken")
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
            console.log("куки при запросе на рефреш |auth-controller|: ", req.cookies)
            const refreshToken = req.cookies?.refreshToken
            const user = await userService.recreateTokens(refreshToken)
            const userDto = new UserDto(user.userData)
            tokenService.setRefreshTokenCookie(res, user.refreshToken)
            console.log({ accessToken: user.accessToken, userDto })
            res.status(200).json({ ...userDto, accessToken: user.accessToken })
        } catch (error) {
            next(error)
        }
    }
    async checkAuth(req, res, next) {
        try {
            // console.log("|auth-controller / checkAuth|")
            const accessToken = req.headers.authorization.split(" ")[1]
            const user = await userService.checkAuth(accessToken)
            console.log("user abrakadabra", user)
            const userDto = new UserDto(user.userData)
            res.status(200).json({ ...userDto })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = new authController()