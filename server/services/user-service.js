const ApiError = require("../exceptions/api-error")
const User = require("../models/user-model")
const bcrypt = require("bcrypt")
const tokenService = require("./token-service")

const UserService = class {
    async login(login, password) {
        const user = await User.findOne({ login })
        if (!user) {
            throw ApiError.BadRequest("Некорректный логин")
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest("Некорректный пароль")
        }

        const userDto = { login: user.login, roles: user.roles }

        const accessToken = tokenService.createAccessToken(userDto)
        const refreshToken = tokenService.createRefreshToken(userDto)

        this.updateTokens(user.login, accessToken, refreshToken)

        return { accessToken, refreshToken, user }
    }

    async logout(login) {
        const user = await User.updateOne({ login }, { refreshToken: null, accessToken: null })
        return user
    }

    async updateTokens(login, accessToken, refreshToken,) {
        const user = await User.updateOne({ login }, { refreshToken, accessToken })
    }

    async refreshTokens(token) {
        const payload = tokenService.verifyRefreshToken(token)
        console.log(payload)
        if (!payload) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await User.findOne({ login: payload.login })
        // console.log(userData)
        if (!userData.refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const { refreshToken, accessToken } = tokenService.createTokens({ login: userData.login, roles: [...userData.roles] })
        User.updateOne({ login: userData.login }, { refreshToken, accessToken })
        return {
            ...userData, refreshToken, accessToken
        }
    }
}

module.exports = new UserService()