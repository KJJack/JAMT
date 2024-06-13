import BaseError from "./base.error.js";
import { HTTP_SERVER_RESPONSE } from "../constants/response.constant.js";

class authError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "Authorization Error";
    this.code = HTTP_SERVER_RESPONSE.UNAUTHORIZED;
    this.isOperational = true;
  }
}

export default authError;
