import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { ITokenPayload } from "../types/IToken.js";
import { BadRequestError } from "../errors/customErrors.js";
import { handleDBErrors } from "../errors/dbErrors.js";

export async function getCurrentUser(req: Request, res: Response) {
  // const userWithoutPassword = await User.findOneWithoutPassword(req.user._id);
  res.status(StatusCodes.OK).json({ user: req.user });
}

export async function editCurrentUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, mobile, city, street } = req.body;
  const userID = req.user!._id;
  try {
    const updatedUser = await User.updateDetails(userID, req.body);
    if (!updatedUser) return next(new BadRequestError("User not found"));
    res.status(StatusCodes.OK).send(updatedUser);
  } catch (error: any) {
    // db validation errors
    const errorValues = handleDBErrors(error);
    return next(new BadRequestError("Invalid inputs", errorValues));
  }
}
