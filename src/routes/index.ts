import { Router } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const router = Router();

router.get("/", (_req, res) => {
  res.send("Hello World");
});

// Add routers here
router.use("/auth", authRouter);
router.use("/users", userRouter);
