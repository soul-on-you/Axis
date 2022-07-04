const Router = require("express");
const router = Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Role = require("../models/Role");
const RefreshToken = require("../models/RefreshToken");
const Logger = require("../loggers");
const authMiddleware = require("../middleware/auth.middleware");
const registrationController = require("../controllers/auth/registration.controller");
const loginController = require("../controllers/auth/login.controller");
const authController = require("../controllers/auth/auth.controller");
const logoutController = require("../controllers/auth/logout.controller");
const refreshController = require("../controllers/auth/refresh.controller");

const logger = Logger("auth");

router.post(
  "/registration",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("serialNumber", "SerialNumber is required").exists(),
    check("serialNumber", "SerialNumber need to be numeric").isNumeric({
      no_symbols: true,
    }),
    check(
      "serialNumber",
      "SerialNumber must be at least 6 characters and less than 8"
    ).isLength({
      min: 6,
      max: 8,
    }),
  ],
  registrationController(logger)
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").exists(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  loginController(logger)
);

router.get("/logout", logoutController(logger));

router.get("/auth", authMiddleware, authController(logger));

router.get("/refresh", refreshController(logger));

module.exports = router;
