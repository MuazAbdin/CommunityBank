import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Account from "../models/Account.js";
import { ITokenPayload } from "../interfaces/IToken.js";
import {
  IRequestBodyNewAccount,
  IUserWithoutPasswordDetails,
} from "../interfaces/IHttp.js";

export async function getCurrentUserAccounts(
  req: Request & { user: IUserWithoutPasswordDetails },
  res: Response,
  next: NextFunction
) {
  const accounts = await Account.find({ user: req.user._id });
  res.status(StatusCodes.OK).json({ accounts });
}

export async function createNewAccout(
  req: Request & { user: IUserWithoutPasswordDetails },
  res: Response,
  next: NextFunction
) {
  const reqBody = req.body as IRequestBodyNewAccount;
  const newAccount = {
    number: Math.floor(10e4 + Math.random() * 90e4),
    user: req.user._id,
    type: reqBody.type,
  };
  const account = await Account.create(newAccount);
  res
    .status(StatusCodes.CREATED)
    .send({ msg: "account created successfully", account });
}
