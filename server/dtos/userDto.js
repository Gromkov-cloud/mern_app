const UserDto = class {
    login
    roles

    constructor(user) {
        this.login = user.login
        this.roles = user.roles
    }
}
module.exports = UserDto