import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Account from "../models/Account.js";
import { ITokenPayload } from "../interfaces/IToken.js";

export async function getAccounts(
  req: Request & { user: ITokenPayload },
  res: Response,
  next: NextFunction
) {
  const accounts = await Account.find();
}

export async function createNewAccout(
  req: Request & { user: ITokenPayload },
  res: Response,
  next: NextFunction
) {
  const accounts = await Account.find();
}
