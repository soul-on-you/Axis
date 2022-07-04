const Logger = require("../loggers");
const logger = Logger("request");

const requestLogger = (req, res, next) => {
  logger.info(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
};


module.exports = requestLogger;