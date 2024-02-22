import express, { Request, Response, NextFunction } from "express";
import { ICustomError } from "../interfaces/ICustomError.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong, try again later";
  const data = err.data || [];
  res.status(statusCode).send({ msg, data });
};

export default errorHandlerMiddleware;
