const Router = require("express")
const router = new Router()

const modelController = require("../controllers/model-controller")
const multerService = require("../services/multer-service")

router.get("/model/:id", modelController.getModel)
router.get("/models", modelController.getModels)
router.get("/model-info/:id", modelController.getModelInfo)
router.post("/model", multerService.upload.array("files", 2), modelController.postModel)
router.post("/model-delete/:id", modelController.deleteModel)

module.exports = router