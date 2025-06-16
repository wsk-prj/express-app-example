import { ApiResult } from "@/api/api-result.type";
import { HttpError } from "@/api/bad-request";
import "express";

declare module "express-serve-static-core" {
  interface Response {
    success: (data?: any, status?: number, message?: string, details?: any) => Response<ApiResult>;
    fail: (error?: HttpError) => Response<ApiResult>;
    error: (error?: HttpError) => Response<ApiResult>;
  }
}
