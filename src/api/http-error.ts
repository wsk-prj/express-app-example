/**
 * @description HTTP Error class
 * @param message - 에러 메시지
 * @param details - 에러 상세 정보
 * @param status - HTTP 상태 코드
 * @param instance - 에러가 발생한 API 인스턴스
 */
export class HttpError extends Error {
  public status?: number;
  public details?: any;
  public instance?: string;

  constructor(message: string = "HTTP Error", details?: any, status?: number, instance?: string) {
    super();
    this.status = status;
    this.message = message;
    this.details = details;
    this.instance = instance;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = "Bad Request", details?: any) {
    super();
    this.status = 400;
    this.message = message;
    this.details = details;
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = "Unauthorized", details?: any) {
    super();
    this.status = 401;
    this.message = message;
    this.details = details;
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = "Forbidden", details?: any) {
    super();
    this.status = 403;
    this.message = message;
    this.details = details;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Not Found", details?: any) {
    super();
    this.status = 404;
    this.message = message;
    this.details = details;
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = "Conflict", details?: any) {
    super();
    this.status = 409;
    this.message = message;
    this.details = details;
  }
}
