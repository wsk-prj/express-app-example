import { env } from "@/config/env";
import { LoginDto, RegisterDto } from "@/dto/auth.dto";
import { InternalServerError, UnauthorizedError } from "@/api/http-error";
import { db } from "@/libs/db";
import { validateRequest } from "@/middlewares/validator";
import bcrypt from "bcrypt";
import { Router } from "express";
import asyncHandler from "express-async-handler";

declare module "express-session" {
  interface Session {
    userId?: number;
  }
}

export const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(RegisterDto),
  asyncHandler(async (req, res, next) => {
    const { nickname, email, password } = req.body;

    const user = await db.user.create({
      data: {
        nickname,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    res.success({
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
      },
    });
  })
);

authRouter.post(
  "/login",
  validateRequest(LoginDto),
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedError();

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedError();

    req.session.userId = user.id;
    res.success({
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
      },
    });
  })
);

authRouter.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw new InternalServerError("error while logging out");

    res.clearCookie(env.SESSION_COOKIE_NAME, env.SESSION_COOKIE_OPTIONS);
    res.success();
  });
});
