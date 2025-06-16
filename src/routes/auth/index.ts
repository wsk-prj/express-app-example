import { ConflictError, UnauthorizedError } from "@/api/bad-request";
import { InternalServerError } from "@/api/internal-error";
import { env } from "@/config/env";
import { CheckEmailDto, CheckNicknameDto, LoginDto, RegisterDto } from "@/dto/auth.dto";
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

export const router = Router();

router.post(
  "/register",
  validateRequest(RegisterDto),
  asyncHandler(async (req, res, _next) => {
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

router.post(
  "/login",
  validateRequest(LoginDto),
  asyncHandler(async (req, res, _next) => {
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

router.post("/logout", (req, res, _next) => {
  req.session.destroy((err) => {
    if (err) throw new InternalServerError("error while logging out");

    res.clearCookie(env.SESSION_COOKIE_NAME, env.SESSION_COOKIE_OPTIONS);
    res.success();
  });
});

router.post(
  "/check/email",
  validateRequest(CheckEmailDto),
  asyncHandler(async (req, res, _next) => {
    const { email } = req.body;
    const user = await db.user.findUnique({
      where: { email },
    });
    if (user) throw new ConflictError("Email already exists");

    res.success();
  })
);

router.post(
  "/check/nickname",
  validateRequest(CheckNicknameDto),
  asyncHandler(async (req, res, _next) => {
    const { nickname } = req.body;
    const user = await db.user.findUnique({
      where: { nickname },
    });
    if (user) throw new ConflictError("Nickname already exists");

    res.success();
  })
);
