import BaseError from "./base.error.js";

class dbError extends BaseError {
  constructor(message, errorCode, isOperational = false) {
    super(message);
    this.name = "dbError";
    this.code = errorCode;
    this.isOperational = isOperational;
  }
}

export default dbError;
