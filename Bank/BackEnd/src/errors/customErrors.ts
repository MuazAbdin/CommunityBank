import { StatusCodes } from "http-status-codes";
import { ICustomError } from "../interfaces/ICustomError.js";

export class NotFoundError extends Error implements ICustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends Error implements ICustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthenticatedError extends Error implements ICustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
    this.name = "UnauthenticatedError";

    Object.setPrototypeOf(this, UnauthenticatedError.prototype);
  }
}

export class UnauthorizedError extends Error implements ICustomError {
  statusCode = StatusCodes.FORBIDDEN;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
