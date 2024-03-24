import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  IRequestBodyTransaction,
  IRequestQueryTransactions,
} from "../types/IHttp.js";
import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

export async function getAllTransactions(req: Request, res: Response) {
  const filters = req.query as unknown as IRequestQueryTransactions;
  console.log(filters);
  const transactions = await Transaction.find({ account: req.account!._id });
  res
    .status(StatusCodes.OK)
    .send({ user: req.user, account: req.account, transactions });
}

export async function createTransaction(req: Request, res: Response) {
  // const reqParams = req.params as { account: string };
  const reqBody = req.body as IRequestBodyTransaction;
  const newTransaction = {
    account: req.account?._id,
    type: "transfer",
    amount: parseInt(reqBody.amount),
    vendor: reqBody.vendor,
    category: reqBody.category,
    date: reqBody.date,
  };
  const transaction = await Transaction.create(newTransaction);
  const account = await Account.findOneAndUpdate(
    { _id: req.account?._id },
    { $inc: { balance: parseInt(reqBody.amount) }, lastVisit: Date.now() },
    { new: true }
  );
  res.status(StatusCodes.CREATED).send({
    msg: "transaction created successfully",
    account,
    transaction,
  });
}
