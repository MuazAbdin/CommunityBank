import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { ITokenPayload } from "../interfaces/IToken.js";

export async function getCurrentUser(
  req: Request & { user: ITokenPayload },
  res: Response,
  next: NextFunction
) {
  //@ts-ignore
  const userWithoutPassword = await User.findOneWithoutPassword(req.user._id);
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
}

export async function editCurrentUserDetails(
  req: Request & { user: ITokenPayload },
  res: Response,
  next: NextFunction
) {}
