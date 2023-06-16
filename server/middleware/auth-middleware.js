const ApiError = require("../exceptions/api-error");
const User = require("../models/user-model");
const tokenService = require("../service/token-service");

const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1]
        if (!accessToken) {
            console.log("нет асес токена")
            return next(ApiError.UnauthorizedError());
        }
        const payload = tokenService.verifyAccessToken(accessToken)
        if (!payload) {
            console.log("асес токен невалиден")
            console.log(accessToken)
            return next(ApiError.UnauthorizedError())
        }
        const userData = await User.findOne({ login: payload.login })
        if (!userData.accessToken) {
            console.log("в дб нет токена")
            return next(ApiError.UnauthorizedError())
        }

        res.isOwner = true
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}

module.exports = authMiddleware