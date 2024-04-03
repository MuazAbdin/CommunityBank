import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  IRequestBodyTransaction,
  IRequestQueryTransactions,
} from "../types/IHttp.js";
import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { handleDBErrors } from "../errors/dbErrors.js";
import {
  buildSearchQuery,
  getTrasactoinsFilters,
} from "../utils/queryParser.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import buildTransactionsPDF from "../utils/transactionsPDF.js";

export async function getAllTransactions(req: Request, res: Response) {
  const filters = req.query as unknown as IRequestQueryTransactions;
  const processedFilters = getTrasactoinsFilters(filters);
  const resultsCount = (await buildSearchQuery(req, processedFilters).exec())
    .length;
  const transactions = await buildSearchQuery(req, processedFilters)
    .skip(processedFilters.offset)
    .limit(processedFilters.limit)
    .exec();

  const pagesCount = Math.ceil(resultsCount / processedFilters.limit);

  res.status(StatusCodes.OK).send({
    user: req.user,
    account: req.account,
    transactions,
    pagesCount,
  });
}

export async function getBreakdown(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user!._id.toString() !== req.account!.user.toString())
    return next(new UnauthorizedError("Forbidden action"));

  const breakdown = await Transaction.aggregate([
    {
      $match: {
        $or: [
          { senderAccount: req.account!._id },
          { receiverAccount: req.account!._id },
        ],
      },
    },
    { $group: { _id: "$category", count: { $sum: "$amount" } } },
  ]);

  res.status(StatusCodes.OK).send({ breakdown });
}

export async function getTransactionsPDF(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user!._id.toString() !== req.account!.user.toString())
    return next(new UnauthorizedError("Forbidden action"));

  const filters = {
    query: undefined,
    side: undefined,
    type: undefined,
    category: undefined,
    page: "1",
    start: undefined,
    end: undefined,
  };
  const processedFilters = getTrasactoinsFilters(filters);
  const transactions = await buildSearchQuery(req, processedFilters).exec();

  const fileName = `account-${req.account!.number}.pdf`;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(resolve(__dirname, "../.."), "pdfFiles", fileName);

  const pdfDoc = new PDFDocument({
    size: "A4",
    margin: 50,
    info: {
      Title: `account-${req.account!.number}.pdf`,
      Author: "Community-Bank",
    },
  });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=${fileName}`);

  buildTransactionsPDF(pdfDoc, req.user!, req.account!, transactions);

  pdfDoc.pipe(fs.createWriteStream(filePath)); // save copy on the server: optional
  pdfDoc.pipe(res);
  pdfDoc.end();
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqBody = req.body as IRequestBodyTransaction;

  const newTransaction = {
    // senderAccount: req.account?._id,
    // receiverAccount: reqBody.receiverAccount,
    type: "transfer",
    amount: parseInt(reqBody.amount),
    // vendor: reqBody.vendor,
    category: reqBody.category,
    // date: reqBody.date,
  };
  try {
    // findOneAndUpdate the receiver
    const receiverAccount = await Account.findOneAndUpdate(
      { number: reqBody.receiverAccount },
      { $inc: { balance: parseInt(reqBody.amount) }, lastVisit: Date.now() },
      { new: true }
    );
    // findOneAndUpdate the sender
    const senderAccount = await Account.findOneAndUpdate(
      { _id: req.account!._id },
      {
        $inc: { balance: -1 * parseInt(reqBody.amount) },
        lastVisit: Date.now(),
      },
      { new: true }
    );
    // create transaction
    const transaction = await Transaction.create({
      receiverAccount,
      senderAccount,
      ...newTransaction,
    });

    res.status(StatusCodes.CREATED).send({
      msg: "transaction created successfully",
      transaction,
    });
  } catch (error: any) {
    // db validation errors
    const errorValues = handleDBErrors(error);
    return next(new BadRequestError("Something went wrong", errorValues));
  }
}
