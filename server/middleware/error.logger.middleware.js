const Logger = require("../loggers");
const logger = Logger("request");

const errorLogger = (err, req, res, next) => {
  console.log(err);
  logger.error(`${err.name}: ${err.message}`);
  res.status(500).send(err.message);
};

module.exports = errorLogger;
