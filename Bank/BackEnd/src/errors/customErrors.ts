import { StatusCodes } from "http-status-codes";
import { ICustomError } from "../interfaces/ICustomError.js";

export class NotFoundError extends Error implements ICustomError {
  statusCode = StatusCodes.NOT_FOUND;
  data = [];

  constructor(message: string, data?: any) {
    super(message);
    this.name = "NotFoundError";
    this.data = data ?? [];

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends Error implements ICustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  data = [];

  constructor(message: string, data?: any) {
    super(message);
    this.name = "BadRequestError";
    this.data = data ?? [];

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthenticatedError extends Error implements ICustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  data = [];

  constructor(message: string, data?: any) {
    super(message);
    this.name = "UnauthenticatedError";
    this.data = data ?? [];

    Object.setPrototypeOf(this, UnauthenticatedError.prototype);
  }
}

export class UnauthorizedError extends Error implements ICustomError {
  statusCode = StatusCodes.FORBIDDEN;
  data = [];

  constructor(message: string, data?: any) {
    super(message);
    this.name = "UnauthorizedError";
    this.data = data ?? [];

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
