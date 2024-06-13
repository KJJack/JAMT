import winston from "winston";

const customFormat = winston.format.printf(
  ({ level, name, message, timestamp, stack, code, operational }) => {
    // return `${timestamp} || [${level.toUpperCase()}] ${code ? `Code:${code}` : ''} ${name ? `${name}` : ''} ${operational ? `Op:${operational}` : ``} ${message} ${stack ? `\n${stack}` : ''}`;
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}] ${
        code ? `Code:${code}` : ""
      } ${
        operational != null ? `OP:${operational}` : ""
      } ${message} \n${stack}`;
    }
    return `${timestamp} ${message}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format((info) => {
    if (info instanceof Error) {
      return {
        ...info,
        message: info.message,
        stack: info.stack,
        code: info.code,
        operational: info.isOperational,
        name: info.name,
      };
    }
    return info;
  })(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        customFormat
      ),
    }),
    new winston.transports.File({
      filename: "./logs/combined.log",
      format: winston.format.combine(winston.format.timestamp(), customFormat),
    }),
  ],
});

export default logger;
