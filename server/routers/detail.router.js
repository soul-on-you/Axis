const Router = require("express");
const router = Router();
const Logger = require("../loggers");
const fileService = require("../services/file.service");

const logger = Logger("detail");

router.get("/", fileService.getDetails);
router.get("/download", fileService.loadDetailById);
router.post("/upload", fileService.uploadDetail);

module.exports = router;
