import { HttpError } from "./http-error";

export class BadRequestError extends HttpError {
  constructor(message: string = "Bad Request", details?: any) {
    super();
    this.status = 400;
    this.message = message;
    this.details = details;
  }
}

export class UnauthorizedError extends BadRequestError {
  constructor(message: string = "Unauthorized", details?: any) {
    super();
    this.status = 401;
    this.message = message;
    this.details = details;
  }
}

export class ForbiddenError extends BadRequestError {
  constructor(message: string = "Forbidden", details?: any) {
    super();
    this.status = 403;
    this.message = message;
    this.details = details;
  }
}

export class NotFoundError extends BadRequestError {
  constructor(message: string = "Not Found", details?: any) {
    super();
    this.status = 404;
    this.message = message;
    this.details = details;
  }
}

export class ConflictError extends BadRequestError {
  constructor(message: string = "Conflict", details?: any) {
    super();
    this.status = 409;
    this.message = message;
    this.details = details;
  }
}
