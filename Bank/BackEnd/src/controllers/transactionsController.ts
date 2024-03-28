import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  IRequestBodyTransaction,
  IRequestQueryTransactions,
} from "../types/IHttp.js";
import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { handleDBErrors } from "../errors/dbErrors.js";

export async function getAllTransactions(req: Request, res: Response) {
  const filters = req.query as unknown as IRequestQueryTransactions;
  console.log(filters);
  const transactions = await Transaction.find({ account: req.account!._id });
  res
    .status(StatusCodes.OK)
    .send({ user: req.user, account: req.account, transactions });
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqBody = req.body as IRequestBodyTransaction;
  const newTransaction = {
    senderAccount: req.account?._id,
    receiverAccount: reqBody.receiver,
    type: "transfer",
    amount: parseInt(reqBody.amount),
    vendor: reqBody.vendor,
    category: reqBody.category,
    date: reqBody.date,
  };
  try {
    // findOneAndUpdate the receiver
    const receiverAccount = await Account.findOneAndUpdate(
      { number: reqBody.receiver },
      { $inc: { balance: parseInt(reqBody.amount) }, lastVisit: Date.now() },
      { new: true }
    );
    if (!receiverAccount)
      return next(new NotFoundError("Receiver account not found"));
    // check if sennder is the same as reciver
    if (receiverAccount._id === req.account?._id)
      return next(new BadRequestError("Can't transfer to yourself"));
    // findOneAndUpdate the sender
    const senderAccount = await Account.findOneAndUpdate(
      { _id: req.account?._id },
      {
        $inc: { balance: -1 * parseInt(reqBody.amount) },
        lastVisit: Date.now(),
      },
      { new: true }
    );
    if (!senderAccount)
      return next(new NotFoundError("Sender account not found"));
    // create transaction
    const transaction = await Transaction.create(newTransaction);

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
