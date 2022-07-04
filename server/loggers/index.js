const winston = require("winston");
const { join } = require("path");

const logger = (name) => {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
      winston.format.json()
    ),

    transports: [
      new winston.transports.File({
        filename: join(__dirname, `./logs/${name}-error.json`),
        level: "error",
      }),
      new winston.transports.File({
        filename: join(__dirname, `./logs/${name}-warn.json`),
        level: "warn",
      }),
      new winston.transports.File({
        filename: join(__dirname, `./logs/${name}-combined.json`),
      }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      })
    );
  }

  return logger;
};

module.exports = logger;
