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
  // console.log(filters);

  // const transactions = await Transaction.find({
  //   $or: [{ receiverAccount: req.account }, { senderAccount: req.account }],
  // }).sort({ createdAt: 1 });
  const received = await Transaction.find({
    receiverAccount: req.account,
  })
    .populate("senderAccount", "number")
    .transform((res) =>
      res.map((item) => {
        return { ...item._doc, tag: "received" };
      })
    );

  const sent = await Transaction.find({
    senderAccount: req.account,
  })
    .populate("receiverAccount", "number")
    .transform((res) =>
      res.map((item) => {
        return { ...item._doc, tag: "sent" };
      })
    );
  const transactions = [...received, ...sent].sort(
    (doc1, doc2) => doc1.createdAt - doc2.createdAt
  );
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
