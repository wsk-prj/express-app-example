import { HttpError } from "@/api/http-error";

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server Error", details?: any) {
    super();
    this.status = 500;
    this.message = message;
    this.details = details;
  }
}
