const express = require("express")
const router = express.Router()

const { addName } = require("../controllers/names-controller")

router.post("/names", addName)

module.exports = router