const Router = require("express");
const router = new Router();

const modelController = require("../controllers/model-controller");
const multerService = require("../services/multer-service");
const authMiddleware = require("../middleware/auth-middleware");

// получение модели (3d) (ya bucket)
router.get("/model/:id", modelController.getModel);

// получение всех моделей (текстовой информации)
router.get("/models", modelController.getModels);

// получить картинку qr кода
router.get("/model-qr/:id", modelController.getModelQr);

// получене одной модели (текстовой информации)
router.get("/model-info/:id", modelController.getModelInfo);

// удалить модель
router.delete("/model/:id", authMiddleware, modelController.deleteModel);

// добавить модель
router.post(
  "/model/add",
  authMiddleware,
  multerService.upload.array("files", 2),
  modelController.postModel
);

// обновить модель
router.post(
  "/model/update/:id",
  authMiddleware,
  multerService.upload.array("files", 2),
  modelController.updateModel
);

module.exports = router;
