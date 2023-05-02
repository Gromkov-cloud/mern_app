const Router = require("express")
const router = new Router()

const modelController = require("../controllers/model-controller")
const multerService = require("../services/multer-service")

router.get("/model/:id", modelController.getModel)
router.post("/model", multerService.upload.single("file"), modelController.postModel)

module.exports = router