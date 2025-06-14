import { HttpError } from "@/api/http-error";
import { ApiResult } from "@/api/api-result.type";
import { NextFunction, Request, Response } from "express";

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data?: object | null, statusCode: number = 200, message?: string): Response<ApiResult> => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  res.fail = (error?: HttpError, message?: string): Response<ApiResult> => {
    return res.status(error?.status ?? 400).json({
      success: false,
      message,
      error,
    });
  };
  res.error = (error?: HttpError): Response<ApiResult> => {
    return res.status(error?.status ?? 500).json({
      success: false,
      message: error?.message || "Internal Server Error",
      error,
    });
  };
  next();
};
