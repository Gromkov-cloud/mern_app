const jwt = require("jsonwebtoken")
const config = require("./config")
const User = require("./models/user-model")

const isRefreshTokenValid = (token) => {
    try {
        const payload = jwt.verify(token, config.REFRESH_SECRET)
        return payload
    } catch (error) {
        return null
    }
}

const isAuthTokenExpired = (token) => {
    try {
        const payload = jwt.verify(token, config["AUTH_SECRET"])
        return payload
    } catch (error) {
        return null
    }
}

const refreshTokens = async () => {
    const accessToken = jwt.sign({ id: "some user ids" }, config.AUTH_SECRET, { expiresIn: "30s" })
    const refreshToken = jwt.sign({}, config.REFRESH_SECRET, { expiresIn: "15d" })

    return {
        accessToken,
        refreshToken
    }
}

const authMiddleware = async (req, res, next) => {
    try {
        let refreshToken = req.cookies.refreshToken
        let accessToken = req.headers.authorization.split(" ")[1]

        if (!isAuthTokenExpired(accessToken)) {
            if (!isRefreshTokenValid(refreshToken)) {
                return res.json("Invalid Refresh token")
            }
            const newTokens = refreshTokens()
            const user = await User.findOne({ login })
            user.refreshToken = newTokens.refreshToken
            await user.save()
            res.cookies.refreshToken = newTokens.refreshToken
            res.body.accessToken = newTokens.accessToken
            console.log("tokens refreshed")
        }

        next()
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const checkRole = (role) => (req, res, next) => {
    try {
        const userRoles = req.payload.roles
        if (!userRoles.includes(role)) {
            return res.json("нет доступа")
        }
        next()
    } catch (error) {
        res.json(error)
    }
}

module.exports = { authMiddleware, checkRole }