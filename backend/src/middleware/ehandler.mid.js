import logger from "../utils/logger.util.js";

function eHandler(err, req, res, next) {
  logger.error(err);

  const statusCode = err.code || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });

  if (!err.isOperational) {
    logger.error("A non-operational error has occured. The process will exit.");

    setTimeout(() => {
      process.exit(1);
    }, 1000).unref();
  }
}

export default eHandler;
