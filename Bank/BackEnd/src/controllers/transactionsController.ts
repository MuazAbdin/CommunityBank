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
import {
  buildSearchQuery,
  getTrasactoinsFilters,
} from "../utils/queryParser.js";

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

//  const res22 = await Transaction.aggregate([
//     {
//       $lookup: {
//         from: "accounts",
//         as: "senderAccount",
//         let: { senderAccount: "$senderAccount" },
//         pipeline: [
//           {
//             $match: {
//               $expr: { $eq: ["$_id", "$$senderAccount"] },
//               number: { $regex: "25" },
//             },
//           },
//           { $project: { number: 1 } },
//         ],
//       },
//     },
// {
//   $project: {
//     receiverAccount: 1,
//     senderAccount: {
//       $cond: {
//         if: { $ne: ["$senderAccount", []] },
//         then: { $arrayElemAt: ["$senderAccount", 0] },
//         else: "$$REMOVE",
//       },
//     },
//     amount: 1,
//     type: 1,
//     category: 1,
//     createdAt: 1,
//     tag: {
//       $cond: {
//         if: { $eq: ["$senderAccount.0.number", req.account!.number] },
//         then: "payor",
//         else: "payee",
//       },
//     },
//   },
// },
// ]);
// console.log(res22);
