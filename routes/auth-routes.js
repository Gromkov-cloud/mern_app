const Router = require("express")
const router = new Router()

const { registration, login } = require("../controllers/auth-controller")

router.post("/registration", registration)
router.post("/login", login)

module.exports = router