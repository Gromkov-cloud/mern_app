const jwt = require("jsonwebtoken")
require("dotenv").config()

const TokenService = class {

    createAccessToken(payload) {
        return jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME })
    }
    createRefreshToken(payload) {
        return jwt.sign({ ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME })
    }
    verifyAccessToken(accessToken) {
        try {
            const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            return payload
        } catch (error) {
            console.log(error)
            return null
        }
    }
    verifyRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }
    setRefreshTokenCookie(res, refreshToken) {
        try {
            const cookieLifetime = 1000 * 60 * 60 * 24 * 90  // 90d
            res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: cookieLifetime })
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService()