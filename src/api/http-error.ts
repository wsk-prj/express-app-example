/**
 * @description HTTP Error class
 * @param status - HTTP 상태 코드
 * @param instance - 에러가 발생한 API 경로
 * @param message - 에러 메시지
 * @param details - 에러 상세 정보
 */
export class HttpError extends Error {
  public status: number;
  public instance?: string;
  public details?: any;

  constructor(status: number, message?: string, instance?: string, details?: any) {
    super(message);
    this.status = status;
    this.instance = instance;
    this.details = details;
    this.name = "HttpError";
  }
}

export class BadRequestError extends HttpError {
  constructor(message?: string, instance?: string, details?: any) {
    super(400, message ?? "Bad Request", instance, details);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message?: string, instance?: string, details?: any) {
    super(401, message ?? "Unauthorized", instance, details);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends HttpError {
  constructor(message?: string, instance?: string, details?: any) {
    super(403, message ?? "Forbidden", instance, details);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string, instance?: string, details?: any) {
    super(404, message ?? "Not Found", instance, details);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends HttpError {
  constructor(message?: string, instance?: string, details?: any) {
    super(409, message ?? "Conflict", instance, details);
    this.name = "ConflictError";
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string, instance?: string, details?: any) {
    super(500, message ?? "Internal Server Error", instance, details);
    this.name = "InternalServerError";
  }
}
