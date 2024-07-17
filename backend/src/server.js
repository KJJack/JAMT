import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./routes/user.route.js";
import ApplicationRouter from "./routes/application.route.js";
import dbError from "./errors/db.error.js";
import logger from "./utils/logger.util.js";
import eHandler from "./middleware/ehandler.mid.js";
import { DB_CONNECTION_STATUS } from "./constants/response.constant.js";
import LoginRouter from "./routes/authenticate.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRouter);
app.use("/application", ApplicationRouter);
app.use("/login", LoginRouter);

const PORT = process.env.PORT || 4723;

mongoose
  .connect(process.env.MONGODB || "")
  .then(() => {
    logger.info(DB_CONNECTION_STATUS.SUCCESS);
  })
  .catch((err) => {
    const dbErr = new dbError(err);
    logger.error(dbErr);
  });

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Welcome to JAMT server" });
});

app.get("/error", (req, res, next) => {
  next(new dbError("dbError has occured", 404, true));
});

app.get("/error-critical", (req, res, next) => {
  const dbErr = new dbError(DB_CONNECTION_STATUS.CRITICAL, 500, false);
  next(dbErr);
});

app.use(eHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
