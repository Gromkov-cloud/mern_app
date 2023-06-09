const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [String],
    accessToken: String,
    refreshToken: String
})

const User = mongoose.model("users", userSchema)

module.exports = User