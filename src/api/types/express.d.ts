import "express";
import { ApiResult } from "./api-result.type";
import { HttpError } from "@/api/http-error";

declare module "express-serve-static-core" {
  interface Response {
    success: (data?: any, statusCode?: number, message?: string) => Response<ApiResult>;
    fail: (error?: HttpError) => Response<ApiResult>;
    error: (error?: HttpError) => Response<ApiResult>;
  }
}
