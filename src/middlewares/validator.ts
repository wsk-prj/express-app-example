import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../api/http-error";

export function validateRequest(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const instance = plainToInstance(type, req.body);

    // 검증 조건 설정
    const errors = await validate(instance, {
      whitelist: true, // 허용된 속성만 전달
      forbidNonWhitelisted: true, // 허용되지 않은 속성은 에러 발생
    });

    // 검증 에러 처리(첫 번째 에러만)
    if (errors.length > 0) {
      const firstError = errors[0];
      const message = `${Object.values(firstError.constraints!).join(", ")}`;
      throw new BadRequestError(message, req.originalUrl, firstError);
    }

    // 유효성 검사 통과한 객체를 req.body에 다시 할당
    req.body = instance;
    next();
  };
}
