const ApiError = require("../exceptions/api-error")
const User = require("../models/user-model")
const bcrypt = require("bcrypt")
const tokenService = require("./token-service")
const TokenDto = require("../dtos/tokenDto")
const UserDto = require("../dtos/userDto")

const UserService = class {
    async login(login, password) {
        const userData = await User.findOne({ login })

        if (!userData) {
            throw ApiError.BadRequest("Invalid Username or Password", ["Bad Credentials"])
        }

        // const newPass = bcrypt.hash(password, 6, async function (err, hash) {
        //     const result = await User.findOneAndUpdate({ login }, { password: hash })
        //     console.log("result " + result)
        // });

        const isPasswordEquals = await bcrypt.compare(password, userData.password)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest("Invalid Username or Password", ["Bad Credentials"])
        }

        const tokenDto = new TokenDto(userData)

        const accessToken = tokenService.createAccessToken(tokenDto)
        const refreshToken = tokenService.createRefreshToken(tokenDto)

        await User.updateOne({ login }, { refreshToken, accessToken })

        return { userData, refreshToken, accessToken }
    }

    async logout(login) {
        const user = await User.updateOne({ login }, { refreshToken: null, accessToken: null })
        return user
    }

    async recreateTokens(refreshToken) {
        if (!refreshToken) {
            console.log("отсутствует рефреш токен |user-service| |recreateTokens|")
            throw ApiError.UnauthorizedError()
        }
        const payload = tokenService.verifyRefreshToken(refreshToken)
        if (!payload) {
            console.log("неверефицированный рефреш токен |user-service| |recreateTokens|")
            throw ApiError.UnauthorizedError()
        }
        const userData = await User.findOne({ login: payload.login })
        if (!userData.refreshToken) {
            console.log("пользователь не авторизован (в бд нет токена) |user-service| |recreateTokens|")
            throw ApiError.UnauthorizedError()
        }

        const tokenDto = new TokenDto(userData)

        const newAccessToken = tokenService.createAccessToken(tokenDto)
        const newRefreshToken = tokenService.createRefreshToken(tokenDto)
        await User.updateOne({ login: payload.login }, { refreshToken: newRefreshToken, accessToken: newAccessToken })
        return {
            userData, accessToken: newAccessToken, refreshToken: newRefreshToken
        }
    }
    async checkAuth(accessToken) {
        if (!accessToken) {
            console.log("отсутствует access токен |user-service / checkAuth|")
            throw ApiError.UnauthorizedError()
        }
        const payload = tokenService.verifyAccessToken(accessToken)
        if (!payload) {
            console.log("неверефицированный access токен |user-service / checkAuth|")
            throw ApiError.UnauthorizedError()
        }

        const userData = await User.findOne({ accessToken })

        if (!userData) {
            console.log("пользователь не авторизован |user-service / checkAuth|")
            throw ApiError.UnauthorizedError()
        }
        return { userData }
    }
}

module.exports = new UserService()