const Router = require("express");
const router = Router();
const { check } = require("express-validator");
const Logger = require("../loggers");
const ROLES = require("../config/roles");
const createUserController = require("../controllers/user/create.controller");
const updateUserController = require("../controllers/user/update.controller");
const findUserController = require("../controllers/user/find.controller");
const deleteUserController = require("../controllers/user/delete.controller");
const verifyRoles = require("../middleware/roles.middleware");
const findAllUserController = require("../controllers/user/findAll.controller");

const logger = Logger("userCRUD");

const userValidation = [
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
  check("name", "Need to be like template").matches(
    /^[а-яА-Я]+\s[а-яА-Я]+\s[а-яА-Я]+[а-яА-Я]$/
  ),
  check("role", "Role is required").exists(),
  check(
    "role",
    "Role must be one of the following: " + Object.values(ROLES).join(", ")
  ).isIn(Object.values(ROLES)),
];

router.get("/", findAllUserController(logger));
router.get("/:id", findUserController(logger));

router.post(
  "/",
  verifyRoles(ROLES.Admin),
  userValidation,
  createUserController(logger)
);

router.put(
  "/",
  verifyRoles(ROLES.Admin),
  userValidation,
  //     check("id", "Id is required").exists(),
  //     check("id", "Invalid MongoDB id").isMongoId(),
  //   ],
    [
      check("id", "Id is required").exists(),
      check("id", "Invalid MongoDB id").isMongoId(),
    ],
  updateUserController(logger)
);

router.delete("/", verifyRoles(ROLES.Admin), deleteUserController(logger));

// router
//   .route("/")
//   .get(findAllUserController(logger))
//   .post(verifyRoles(ROLES.Admin), userValidation, createUserController(logger))
//   .put(verifyRoles(ROLES.Admin), userValidation, updateUserController(logger))
//   .delete(verifyRoles(ROLES.Admin), deleteUserController(logger));

// router.route("/:id").get(findUserController(logger));

module.exports = router;
