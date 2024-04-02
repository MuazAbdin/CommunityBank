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
import Transaction from "../models/Transaction.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import buildLoanPDF from "../utils/loanPDF.js";

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
    const newTransaction = {
      receiverAccount: newLoan.account,
      type: "deposit",
      amount: newLoan.amount,
      category: "bank loan",
    };
    console.log(account);
    const receiverAccount = await Account.findOneAndUpdate(
      { _id: account._id },
      {
        $inc: { balance: newTransaction.amount },
        lastVisit: Date.now(),
      },
      { new: true }
    );
    const transaction = await Transaction.create(newTransaction);
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

export async function getLoanPDF(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { loanId } = req.params;
  const loan = await Loan.findById(loanId);
  if (!loan) return next(new NotFoundError("Loan not found"));
  const account = await Account.findById(loan.account);
  if (!account) return next(new NotFoundError("Account not found"));
  if (req.user!._id.toString() !== account.user.toString())
    return next(new UnauthorizedError("Forbidden action"));

  const schedule = amortizedSchedule(
    loan.amount,
    loan.term / 12,
    loan.interestRate
  );

  const fileName = `loan-${loan._id}.pdf`;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(resolve(__dirname, "../.."), "pdfFiles", fileName);

  const pdfDoc = new PDFDocument({
    size: "A4",
    margin: 50,
    info: {
      Title: `loan-${loan._id}.pdf`,
      Author: "Community-Bank",
    },
  });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=${fileName}`);

  buildLoanPDF(pdfDoc, req.user!, account, loan, schedule);

  pdfDoc.pipe(fs.createWriteStream(filePath)); // save copy on the server: optional
  pdfDoc.pipe(res);
  pdfDoc.end();
}
