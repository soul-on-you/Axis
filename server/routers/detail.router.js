const Router = require("express");
const router = Router();
const Logger = require("../loggers");
const authMiddleware = require("../middleware/auth.middleware");
const fileService = require("../services/file.service");

const logger = Logger("detail");

router.get("/", authMiddleware, fileService.getDetails);
router.get("/download", fileService.loadDetailById);
router.post("/upload", authMiddleware, fileService.uploadDetail);

module.exports = router;
