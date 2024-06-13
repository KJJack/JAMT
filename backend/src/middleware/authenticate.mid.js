import jwt from "jsonwebtoken";
import authError from "../errors/authorization.error.js";
import logger from "../utils/logger.util.js";

const secret = process.env.SECRET || "";

export function authenticateUser(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new authError("Access denied. No token provided"));
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    const { id, email } = req.user;

    const { user_id } = req.params;

    if (id !== user_id) {
      return next(new authError("Access denied. Token mismatch"));
    }

    logger.info(
      `User: ${id} ${email} token verified for: ${req.controllerName}`
    );
    next();
  } catch (error) {
    next(new authError(error.message));
  }
}
