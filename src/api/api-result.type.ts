import { HttpError } from "@/api/http-error";

export type ApiResult<T = undefined> =
  | {
      status: number;
      message?: string;
      success: true;
      data: T;
    }
  | {
      status: number;
      message?: string;
      success: false;
      error: HttpError;
    };
