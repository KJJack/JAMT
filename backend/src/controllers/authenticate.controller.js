import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import reqError from "../errors/req.error.js";
import { HTTP_SERVER_RESPONSE } from "../constants/response.constant.js";
import logger from "../utils/logger.util.js";

const secret = process.env.SECRET;

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // this isn't working
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new reqError(
          "Invalid username or password",
          HTTP_SERVER_RESPONSE.UNAUTHORIZED
        )
      );
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return next(
        new reqError(
          "Invalid username or password",
          HTTP_SERVER_RESPONSE.UNAUTHORIZED
        )
      );
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    logger.info(
      `[${HTTP_SERVER_RESPONSE.SUCCESS}] User: ${user._id} has logged in and received their auth Token`
    );
    res.status(HTTP_SERVER_RESPONSE.SUCCESS).json(
      { token, 
        user: { 
          id: user._id, 
          email: user.email, 
          firstname: user.firstname, 
          lastname: user.lastname
        } 
    });
  } catch (error) {
    next(new reqError(error.message, HTTP_SERVER_RESPONSE.SERVER_ERROR));
  }
};
