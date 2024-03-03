import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Account from "../models/Account.js";
import { IRequestBodyAccountType } from "../types/IHttp.js";

export async function getCurrentUserAccounts(req: Request, res: Response) {
  const accounts = await Account.find({ user: req.user!._id });
  res.status(StatusCodes.OK).send({ user: req.user, accounts });
}

export async function createNewAccout(req: Request, res: Response) {
  const reqBody = req.body as IRequestBodyAccountType;
  const newAccount = {
    number: Math.floor(10e4 + Math.random() * 90e4),
    user: req.user!._id,
    type: reqBody.type,
  };
  const account = await Account.create(newAccount);
  res
    .status(StatusCodes.CREATED)
    .send({ msg: "account created successfully", account, user: req.user });
}

export async function getAccount(req: Request, res: Response) {
  const reqParams = req.params as { number: string };
  const account = await Account.findOneAndUpdate(
    { number: reqParams.number },
    { lastVisit: Date.now() },
    { new: true }
  );
  // console.log(moment(account?.lastVisit).format("LLLL"));
  res.status(StatusCodes.OK).send({ user: req.user, account });
}

export async function deleteAccount(req: Request, res: Response) {
  const reqParams = req.params as { number: string };
  const account = await Account.findOneAndDelete({ number: reqParams.number });
  res
    .status(StatusCodes.OK)
    .send({ msg: "account deleted successfully ", account, user: req.user });
}
