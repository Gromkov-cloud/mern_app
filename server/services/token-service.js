const jwt = require("jsonwebtoken")
require("dotenv").config()

const TokenService = class {
    createAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME })
    }
    createRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME })
    }
    createTokens(payload) {
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME })
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME })
        return { accessToken, refreshToken }
    }
    verifyAccessToken(accessToken) {
        try {
            const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            return payload
        } catch (error) {
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
}

module.exports = new TokenService()