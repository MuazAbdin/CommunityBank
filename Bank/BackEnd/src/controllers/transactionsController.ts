import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  IRequestBodyTransaction,
  IRequestQueryTransactions,
} from "../types/IHttp.js";
import Transaction from "../models/Transaction.js";

export async function getAllTransactions(req: Request, res: Response) {
  const filters = req.query as unknown as IRequestQueryTransactions;
  console.log(filters);
  res.status(StatusCodes.OK).send("ok");
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
  res.status(StatusCodes.CREATED).send({
    msg: "transaction created successfully",
    transaction,
  });
}
