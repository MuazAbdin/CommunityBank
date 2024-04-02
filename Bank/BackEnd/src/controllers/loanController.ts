import { NextFunction, Request, Response } from "express";
import Loan from "../models/Loan.js";
import { StatusCodes } from "http-status-codes";
import { handleDBErrors } from "../errors/dbErrors.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { amortizedSchedule } from "../utils/amortizedSchedule.js";
import Account from "../models/Account.js";

export async function scheduleLoan(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { amount, term, interestRate } = req.body;
  const schedule = amortizedSchedule(
    parseFloat(amount),
    parseFloat(term) / 12,
    parseFloat(interestRate)
  );
  const lastIdx = parseFloat(term);
  const calculations = {
    monthlyPayment: schedule[lastIdx - 1].payment,
    totalInterestPaid: schedule[lastIdx].interest,
    loanAmount: parseFloat(amount),
    totalPaid: schedule[lastIdx].payment,
  };
  res.status(StatusCodes.OK).send({
    calculations,
    amount: parseFloat(amount),
    term: parseFloat(term),
    interestRate: parseFloat(interestRate),
  });
}

export async function createLoan(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqParams = req.params as { number: string };
  const account = await Account.findOne({ number: reqParams.number });
  if (!account) return next(new NotFoundError("Account not found"));
  if (account.user.toString() !== req.user!._id.toString())
    return next(new UnauthorizedError("Forbidden action"));
  account.lastVisit = new Date();
  await account.save();

  const { amount, term, interestRate } = req.body;
  const schedule = amortizedSchedule(
    parseFloat(amount),
    parseFloat(term) / 12,
    parseFloat(interestRate)
  );

  const payOffDate = new Date();
  payOffDate.setMonth(payOffDate.getMonth() + schedule.length - 1);

  const newLoan = {
    account: account._id,
    amount: parseFloat(amount),
    term: parseFloat(term),
    interestRate: parseFloat(interestRate),
    nextPayment: 0,
    payOffDate,
  };

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

export async function getAllLoans(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqParams = req.params as { number: string };
  const account = await Account.findOne({ number: reqParams.number });
  if (!account) return next(new NotFoundError("Account not found"));
  if (account.user.toString() !== req.user!._id.toString())
    return next(new UnauthorizedError("Forbidden action"));
  account.lastVisit = new Date();
  await account.save();

  const loans = await Loan.find({ account: account._id });
  res.status(StatusCodes.CREATED).send({ user: req.user, account, loans });
}
