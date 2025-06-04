import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import { env } from "./config/env";
import { router } from "./routes/index";

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(helmet());
app.use(cookieParser());
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 2 * 60 * 1000  // 2M
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(env.ROUTER_PREFIX, router);

// Express Configurations
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
