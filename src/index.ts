import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import "reflect-metadata";

import logger from "@/utils/logger";
import { env } from "@/config/env";
import { errorHandler } from "@/middlewares/error.handler";
import { responseHandler } from "@/middlewares/response.handler";
import { router } from "@/routes/index";

const app = express();

// Configurations
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    name: env.SESSION_COOKIE_NAME,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: env.SESSION_COOKIE_OPTIONS,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(responseHandler); // Response Handler
app.use(env.ROUTER_PREFIX, router); // Routes
app.use(errorHandler); // Error Handler

// Server startup
app.listen(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});
