import reqError from "../errors/req.error.js";
import User from "../models/user.model.js";
import { HTTP_SERVER_RESPONSE } from "../constants/response.constant.js";
import logger from "../utils/logger.util.js";
import mongoose from "mongoose";

// get users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(HTTP_SERVER_RESPONSE.SUCCESS).json(users);
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.NOT_FOUND));
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(
        new reqError("Invalid user ID format", HTTP_SERVER_RESPONSE.BAD_REQUEST)
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return next(
        new reqError(`User not found`, HTTP_SERVER_RESPONSE.NOT_FOUND)
      );
    }

    logger.info(`[${HTTP_SERVER_RESPONSE.SUCCESS}] GET Request for ${id}`);
    res.status(HTTP_SERVER_RESPONSE.SUCCESS).json(user);
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.NOT_FOUND));
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(HTTP_SERVER_RESPONSE.SUCCESS).json(user);
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.SERVER_ERROR));
  }
};
