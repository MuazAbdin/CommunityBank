import { Request, Response, NextFunction } from "express";
import Account from "../models/Account.js";
import { NotFoundError } from "../errors/customErrors.js";

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqParams = req.params as { number: string };
  const account = await Account.findOneAndUpdate(
    { number: reqParams.number },
    { lastVisit: Date.now() },
    { new: true }
  );
  if (!account) next(new NotFoundError("Account Not Found"));
  req.account = account!;
  next();
}
