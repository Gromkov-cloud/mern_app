const Router = require("express")
const router = new Router()

const imageController = require("../controllers/image-controller")

router.get("/image/:id", imageController.getImage)

module.exports = router