const TokenDto = class {
    login
    // _id
    roles

    constructor(user) {
        // this._id = user._id
        this.login = user.login
        this.roles = user.roles
    }
}

module.exports = TokenDto