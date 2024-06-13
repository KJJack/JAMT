import reqError from "../errors/req.error.js";
import User from "../models/user.model.js";
import { HTTP_SERVER_RESPONSE } from "../constants/response.constant.js";
import logger from "../utils/logger.util.js";
import mongoose from "mongoose";

export const getApplications = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return next(
        new reqError("Invalid user id format", HTTP_SERVER_RESPONSE.BAD_REQUEST)
      );
    }

    const user = await User.findById(user_id).select("applications");

    if (!user) {
      return next(
        new reqError("User not found", HTTP_SERVER_RESPONSE.NOT_FOUND)
      );
    }

    res.status(HTTP_SERVER_RESPONSE.SUCCESS).json(user.applications);
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.SERVER_ERROR));
  }
};

export const createApplication = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { company, position, location, prereqs } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      next(
        new reqError("Invalid user id format", HTTP_SERVER_RESPONSE.BAD_REQUEST)
      );
    }

    const user = await User.findById(user_id);

    if (!user) {
      return next(
        new reqError("User not found", HTTP_SERVER_RESPONSE.NOT_FOUND)
      );
    }

    const newApplication = {
      company,
      position,
      location,
      prereqs,
    };

    user.applications.push(newApplication);

    await user.save();

    logger.info(
      `[${
        HTTP_SERVER_RESPONSE.CREATED
      }] user:${user_id} added new Application:${JSON.stringify(
        newApplication
      )}`
    );
    res.status(HTTP_SERVER_RESPONSE.CREATED).json(newApplication);
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.SERVER_ERROR));
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const { user_id, application_id } = req.params;
    const updatedApplication = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !mongoose.Types.ObjectId.isValid(application_id)
    ) {
      next(
        new reqError("Invalid user id format", HTTP_SERVER_RESPONSE.BAD_REQUEST)
      );
    }

    const user = await User.findById(user_id);

    if (!user) {
      next(new reqError("User not found", HTTP_SERVER_RESPONSE.NOT_FOUND));
    }

    const application = user.applications.id(application_id);

    if (!application) {
      next(
        new reqError("Application not found", HTTP_SERVER_RESPONSE.NOT_FOUND)
      );
    }

    logger.info(
      `[${
        HTTP_SERVER_RESPONSE.SUCCESS
      }] user:${user_id} updated \nApplication:${JSON.stringify(
        application
      )} \nto:${JSON.stringify(updatedApplication)}`
    );
    Object.assign(application, updatedApplication);
    await user.save();
    res.status(HTTP_SERVER_RESPONSE.SUCCESS).json(application);
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.SERVER_ERROR));
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const { user_id, application_id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !mongoose.Types.ObjectId.isValid(application_id)
    ) {
      next(
        new reqError("Invalid user id format", HTTP_SERVER_RESPONSE.BAD_REQUEST)
      );
    }

    const user = await User.findById(user_id);

    if (!user) {
      next(new reqError("User not found", HTTP_SERVER_RESPONSE.NOT_FOUND));
    }

    const application = user.applications.id(application_id);

    if (!application) {
      next(
        new reqError("Application not found", HTTP_SERVER_RESPONSE.NOT_FOUND)
      );
    }

    user.applications.pull(application_id);
    await user.save();

    logger.info(
      `[${HTTP_SERVER_RESPONSE.SUCCESS}] User:${user_id}  deleted Application: ${application_id}`
    );
    res
      .status(HTTP_SERVER_RESPONSE.SUCCESS)
      .json({ message: "Application deleted successfully" });
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.SERVER_ERROR));
  }
};
