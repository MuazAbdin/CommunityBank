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
import { CATEGORIES } from "../utils/constant.js";

function getTrasactoinsFilters(filters: IRequestQueryTransactions) {
  const query = filters.query ?? "^\\d{11}$";
  const sides = filters.side?.split(",") || ["Payee", "Payor"];
  const types = (
    filters.type?.split(",") || [
      "deposit",
      "withdrawal",
      "transfer",
      "loan payment",
    ]
  ).map((t) => t.toLowerCase());
  const categories = (filters.category?.split(",") || CATEGORIES).map((c) =>
    c.toLowerCase()
  );

  const start = filters.start
    ? new Date(filters.start)
    : new Date("2024-01-01Z00:00:00:000"); // the start date of the bank
  let end = filters.end ? new Date(filters.end) : new Date();
  if (end < start) end = start;
  end.setDate(end.getDate() + 1);
  const page = parseInt(filters.page);
  const limit = 10;
  const offset = (page - 1) * limit;
  return { query, sides, types, categories, start, end, limit, offset };
}

export async function getAllTransactions(req: Request, res: Response) {
  const filters = req.query as unknown as IRequestQueryTransactions;
  const { query, sides, types, categories, start, end, offset, limit } =
    getTrasactoinsFilters(filters);

  console.log(query, sides, types, categories, start, end, limit, offset);

  let accountMatch = [];
  let populatePath = "";
  if (sides.includes("Payee")) {
    accountMatch.push({ receiverAccount: req.account });
    populatePath += "senderAccount";
  }
  if (sides.includes("Payor")) {
    accountMatch.push({ senderAccount: req.account });
    populatePath += " receiverAccount";
  }

  let resultsCount = 0;
  let transactions = [];

  const result = await Transaction.find({
    $or: accountMatch,
    type: { $in: types },
    category: { $in: categories },
    createdAt: { $gte: start, $lte: end },
  })
    .populate({
      path: "senderAccount",
      select: "number",
      match: { number: { $regex: query } },
    })
    // .where({ "senderAccount.number": { $regex: query } })
    // .where({ senderAccount: { $ne: null } })
    .transform((res) => {
      const processedResult = res
        .filter((item) => item._doc.senderAccount != null)
        .map((item) => {
          return { ...item._doc, tag: "payee" };
        });
      resultsCount += processedResult.length;
      return processedResult;
    })
    .skip(offset)
    .limit(limit);

  if (sides.includes("Payee")) {
    const received = await Transaction.find({
      receiverAccount: req.account,
      type: { $in: types },
      category: { $in: categories },
      createdAt: { $gte: start, $lte: end },
    })
      // .populate("senderAccount", "number")
      .populate({
        path: "senderAccount",
        select: "number",
        match: { number: { $regex: query } },
      })
      // .where({ "senderAccount.number": { $regex: query } })
      // .where({ senderAccount: { $ne: null } })
      .transform((res) => {
        const processedResult = res
          .filter((item) => item._doc.senderAccount != null)
          .map((item) => {
            return { ...item._doc, tag: "payee" };
          });
        resultsCount += processedResult.length;
        return processedResult;
      })
      .skip(offset)
      .limit(limit)
      .exec();
    transactions = [...transactions, ...received];
  }
  if (sides.includes("Payor")) {
    const sent = await Transaction.find({
      senderAccount: req.account,
      type: { $in: types },
      category: { $in: categories },
      createdAt: { $gte: start, $lte: end },
    })
      // .populate("receiverAccount", "number")
      .populate({
        path: "receiverAccount",
        select: "number",
        match: { number: { $regex: query } },
      })
      // .where({ "receiverAccount.number": { $regex: query } })
      // .where({ receiverAccount: { $ne: null } })
      .transform((res) => {
        const processedResult = res
          .filter((item) => item._doc.receiverAccount != null)
          .map((item) => {
            return { ...item._doc, tag: "payor" };
          });
        resultsCount += processedResult.length;
        return processedResult;
      })
      .skip(offset)
      .limit(limit)
      .exec();

    transactions = [...transactions, ...sent];
  }
  transactions.sort((doc1, doc2) => doc1.createdAt - doc2.createdAt);
  const pagesCount = Math.ceil(resultsCount / limit);

  res
    .status(StatusCodes.OK)
    .send({ user: req.user, account: req.account, transactions, pagesCount });
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
