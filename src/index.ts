import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env";
import { router } from "./routes/index";
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(env.ROUTER_PREFIX, router);

// Express Configurations
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
