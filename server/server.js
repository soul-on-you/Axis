require("dotenv").config({ path: `.${process.env.NODE_ENV}.env` });

const express = require("express");

const requestLogger = require("./middleware/request.logger.middleware");
const credentials = require("./middleware/credentials.middleware");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.router");
const detailRouter = require("./routers/detail.router");
const authMiddleware = require("./middleware/auth.middleware");
const errorLogger = require("./middleware/error.logger.middleware");

const createServer = () => {
  const app = express();

  app.use(requestLogger);
  app.use(credentials);
  app.use(fileUpload({}));
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/auth", authRouter);
  app.use("/api/detail", detailRouter);

  app.use(authMiddleware);

  app.use(errorLogger);

  return app;
};

module.exports = createServer;
