const Router = require("express")
const router = new Router()

const modelController = require("../controllers/model-controller")

router.get("/model/:id", modelController.getModel)

module.exports = router