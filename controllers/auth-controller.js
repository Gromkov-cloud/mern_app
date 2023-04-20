const User = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getPayload = ({ login, roles }) => {
    return {
        login,
        roles
    }
}

const registration = async (req, res) => {
    try {
        const { login, password, roles } = req.body
        const candidate = await User.findOne({ login: login })
        if (candidate) {
            return res.json("Такой пользователь уже существует")
        }
        if (!roles.length) {
            roles.push("USER")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ login: login, password: hashedPassword, roles: roles })
        const result = await user.save()
        console.log(result)
        res.json("Пользователь создан")
    } catch (error) {
        console.log(error)
        res.json("Возникла какая то ошибка")
    }
}
const login = async (req, res) => {
    try {
        const { login, password } = req.body
        const candidate = await User.findOne({ login })

        const isPasswordCorrect = await bcrypt.compare(password, candidate.password)
        if (!isPasswordCorrect) {
            return res.status(402).json("Неверные данные")
        }
        const token = jwt.sign(getPayload(candidate), "superSecretKeyEverBumBamBam", { expiresIn: "30s" })
        const refreshToken = jwt.sign({}, "refreshToken")
        const user = await User.findOne({ login })
        user.refreshToken = refreshToken
        await user.save()
        res.cookie("refreshToken", refreshToken)
        res.json({ token, refreshToken })
    } catch (error) {
        console.log(error)
        res.json("что то почло не так")
    }
}

module.exports = {
    registration,
    login
}