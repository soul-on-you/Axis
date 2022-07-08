const jwt = require("jsonwebtoken");
const Logger = require("../loggers");

const logger = Logger("auth");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);

    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    console.log(decoded);
    next();
  } catch (e) {
    logger.error("Unauthorized", { error: e.message });
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
