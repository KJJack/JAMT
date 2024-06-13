import BaseError from "./base.error.js";

class reqError extends BaseError {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode;
    this.isOperational = true;
  }
}

export default reqError;
