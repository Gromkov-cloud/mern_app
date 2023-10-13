const Router = require("express")
const router = new Router()

const modelController = require("../controllers/model-controller")
const multerService = require("../services/multer-service")
const authMiddleware = require("../middleware/auth-middleware")

router.get("/model/:id", modelController.getModel) // получение модели (3d) (ya bucket)
router.get("/models", modelController.getModels) // получение всех моделей (текстовой информации)
router.get("/model-qr/:id", modelController.getModelQr) // получить картинку qr кода
router.get("/model-info/:id", modelController.getModelInfo) // получене одной модели (текстовой информации)
router.delete("/model/:id", authMiddleware, modelController.deleteModel) // удалить модель
router.post("/model/add", authMiddleware, multerService.upload.array("files", 2), modelController.postModel) // добавить модель
router.post("/model/update/:id", authMiddleware, multerService.upload.array("files", 2), modelController.updateModel) // обновить модель

module.exports = router