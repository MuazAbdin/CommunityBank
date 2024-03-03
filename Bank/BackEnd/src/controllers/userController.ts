import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { ITokenPayload } from "../types/IToken.js";

export async function getCurrentUser(req: Request, res: Response) {
  // const userWithoutPassword = await User.findOneWithoutPassword(req.user._id);
  res.status(StatusCodes.OK).json({ user: req.user });
}

export async function editCurrentUserDetails(req: Request, res: Response) {}
