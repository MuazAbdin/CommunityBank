import { NextFunction, Request, Response } from "express";
import Loan from "../models/Loan.js";
import { StatusCodes } from "http-status-codes";
import { handleDBErrors } from "../errors/dbErrors.js";
import { BadRequestError } from "../errors/customErrors.js";

export async function createLoan(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqBody = req.body;
  const newLoan = {};
  try {
    const loan = await Loan.create(newLoan);
    res.status(StatusCodes.CREATED).send({ msg: "Loan created successfully" });
    // .send({ msg: "Loan created successfully", account, user: req.user });
  } catch (error: any) {
    // db validation errors
    const errorValues = handleDBErrors(error);
    return next(new BadRequestError("Something went wrong", errorValues));
  }
}
