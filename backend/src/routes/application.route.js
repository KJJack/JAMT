import express from "express";

import {
  getApplications,
  updateApplication,
  createApplication,
  deleteApplication,
} from "../controllers/application.controller.js";
import { authenticateUser } from "../middleware/authenticate.mid.js";
import { logControllername } from "../utils/logcontroller.util.js";

const ApplicationRouter = express.Router();

ApplicationRouter.get(
  "/:user_id",
  logControllername(getApplications),
  authenticateUser,
  getApplications
);
ApplicationRouter.post(
  "/:user_id",
  logControllername(createApplication),
  authenticateUser,
  createApplication
);
ApplicationRouter.put(
  "/:user_id/:application_id",
  logControllername(updateApplication),
  authenticateUser,
  updateApplication
);
ApplicationRouter.delete(
  "/:user_id/:application_id",
  logControllername(deleteApplication),
  authenticateUser,
  deleteApplication
);

export default ApplicationRouter;
