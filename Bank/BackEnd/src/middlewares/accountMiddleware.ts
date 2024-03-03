import { Request, Response, NextFunction } from "express";
import Account from "../models/Account.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export async function getAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(req.params);
  const reqParams = req.params as { number: string };
  // console.log(reqParams.number);
  const account = await Account.findOneAndUpdate(
    { number: reqParams.number },
    { lastVisit: Date.now() },
    { new: true }
  );
  if (!account) next(new NotFoundError("Account Not Found"));
  req.account = account!;
  next();
  // console.log(moment(account?.lastVisit).format("LLLL"));
  // res.status(StatusCodes.OK).send({ user: req.user, account });
}
