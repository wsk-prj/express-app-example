import { ApiResult } from "@/api/api-result.type";
import { HttpError } from "@/api/http-error";
import { NextFunction, Request, Response } from "express";

export const responseHandler = (_req: Request, res: Response, next: NextFunction) => {
  res.success = (data?: any, status: number = 200, message: string = "Success", details?: any): Response<ApiResult> => {
    return res.status(status).json({
      success: true,
      status: status,
      message: message,
      details: details,
      instance: _req.originalUrl,
      data,
    });
  };
  res.fail = (error?: HttpError): Response<ApiResult> => {
    return res.status(error?.status ?? 400).json({
      success: false,
      status: error?.status ?? 400,
      message: error?.message ?? "Failed",
      details: error?.details,
      instance: _req.originalUrl,
    });
  };
  res.error = (error?: HttpError): Response<ApiResult> => {
    return res.status(error?.status ?? 500).json({
      success: false,
      status: error?.status ?? 500,
      message: error?.message ?? "Error",
      details: error?.details,
      instance: _req.originalUrl,
    });
  };
  next();
};
