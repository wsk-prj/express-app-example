import { ConflictError, HttpError } from "@/api/http-error";
import { InternalServerError } from "@/api/internal.error";
import logger from "@/utils/logger";
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const handlers = {
  PrismaError: (err: Prisma.PrismaClientKnownRequestError, res: Response) => {
    switch (err.code) {
      case "P2002": // 리소스 중복
        const target = err.meta?.target;
        const message = `${Array.isArray(target) ? target.join(", ") : target} already exists`;
        return res.fail(new ConflictError(message));
    }
    return res.error(new InternalServerError());
  },
};

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error("Caught Error:", err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) return handlers.PrismaError(err, res);
  if (err instanceof HttpError) return res.fail(err);
  if (err instanceof InternalServerError) return res.error(err);

  return res.error(new InternalServerError("Unknown Error"));
};
