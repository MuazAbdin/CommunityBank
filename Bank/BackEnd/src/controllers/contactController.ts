import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createContact(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
  res.status(StatusCodes.OK).send({ msg: "Messege sent successfully" });
}
