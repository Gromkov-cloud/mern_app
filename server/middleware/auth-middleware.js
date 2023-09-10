const ApiError = require("../exceptions/api-error");
const User = require("../models/user-model");
const tokenService = require("../services/token-service");

const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1]
        console.log("access token |auth-middleware|: " + accessToken)
        if (!accessToken) {
            console.log("нет асес токена")
            return next(ApiError.UnauthorizedError());
        }
        const payload = tokenService.verifyAccessToken(accessToken)
        if (!payload) {
            console.log("время жизни асес токена истекло |auth-middleware| ")
            return next(ApiError.UnauthorizedError())
        }
        const userData = await User.findOne({ login: payload.login })
        if (!userData.accessToken) {
            console.log("в дб нет access токена |auth-middleware|")
            return next(ApiError.UnauthorizedError())
        }

        res.isOwner = true
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}

module.exports = authMiddleware