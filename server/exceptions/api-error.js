module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'UnauthorizedError: Пользователь не авторизован')
    }

    static BadRequest(message, errors = []) {
        console.log("BadRequest: ", message)
        return new ApiError(400, message, errors);
    }
}