import connectDB from "./DB/connection.js";
import {
  adminLimiter,
  authLimiter,
  globalLimiter,
} from "./middleware/rateLimiter.js";
import authRouter from "./modules/auth/auth.controller.js";
import accountRouter from "./modules/user/user.controller.js";
import { globalErrorHandler } from "./utils/response/error.response.js";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./app.schema.js";
import helmet from "helmet";
const bootstrap = async (app, express) => {
  await connectDB();
  app.use(express.json());
  app.use(helmet());
  app.use("/", globalLimiter);
  app.use("/auth", authLimiter, authRouter);
  app.use("/account", accountRouter);
  app.use("/graphql", createHandler({ schema }));
  app.use(globalErrorHandler);
};

export default bootstrap;
