import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PDFDocument from "pdfkit";
import fs from "fs";
import path, { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import Account from "../models/Account.js";
import { IRequestBodyAccountType } from "../types/IHttp.js";
import { handleDBErrors } from "../errors/dbErrors.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import buildBADC_PDF from "../utils/BADCpdf.js";

export async function getCurrentUserAccounts(req: Request, res: Response) {
  const accounts = await Account.find({ user: req.user!._id });
  res.status(StatusCodes.OK).send({ user: req.user, accounts });
}

export async function createNewAccout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqBody = req.body as IRequestBodyAccountType;
  const newAccount = {
    number: Math.floor(10e4 + Math.random() * 90e4),
    user: req.user!._id,
    type: reqBody.type,
  };
  try {
    const account = await Account.create(newAccount);
    res
      .status(StatusCodes.CREATED)
      .send({ msg: "Account created successfully" });
    // .send({ msg: "account created successfully", account, user: req.user });
  } catch (error: any) {
    // db validation errors
    const errorValues = handleDBErrors(error);
    return next(new BadRequestError("Something went wrong", errorValues));
  }
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

export async function getBADC(req: Request, res: Response, next: NextFunction) {
  const { number } = req.params as { number: string };
  try {
    const account = await Account.findOne({ number }).populate("user");
    if (!account) return next(new NotFoundError("Account not found"));
    //@ts-ignore
    if (req.user?.IDcard !== account.user.IDcard)
      return next(new UnauthorizedError("Forbidden action"));

    const fileName = `account-${account.number}.pdf`;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(
      resolve(__dirname, "../.."),
      "pdfFiles",
      fileName
    );

    const pdfDoc = new PDFDocument({
      size: "A4",
      margin: 80,
      info: {
        Title: `account-${account.number}.pdf`,
        Author: "Community-Bank",
      },
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${fileName}`);

    buildBADC_PDF(pdfDoc, account);

    pdfDoc.pipe(fs.createWriteStream(filePath)); // save copy on the server: optional
    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (error) {
    return next(new BadRequestError("Something went wrong"));
  }
}

export async function deleteAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { number } = req.params as { number: string };
  try {
    const account = await Account.findOneAndDelete({ number });
    if (!account) return next(new NotFoundError("Account not found"));
    res.send({ msg: "account deleted successfully " });
  } catch (error) {
    return next(new BadRequestError("Something went wrong"));
  }
}
