import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { ITokenPayload } from "../types/IToken.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { handleDBErrors } from "../errors/dbErrors.js";
import { comparePassword } from "../utils/auth.js";

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
    if (!updatedUser) return next(new NotFoundError("User not found"));
    res.status(StatusCodes.OK).send(updatedUser);
  } catch (error: any) {
    // db validation errors
    const errorValues = handleDBErrors(error);
    return next(new BadRequestError("Invalid inputs", errorValues));
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { oldPassword, password, passwordConfirm } = req.body;
  const userID = req.user!._id;
  try {
    const user = await User.findById(userID);
    if (!user) return next(new NotFoundError("User Not Found"));
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid)
      return next(
        new BadRequestError("Invalid inputs", [
          {
            name: "oldPassword",
            value: oldPassword,
            message: "Wrong Password",
          },
        ])
      );
    user.password = password;
    await user.save();
    res.status(StatusCodes.OK).send({ msg: "Changed successfully" });
  } catch (error: any) {
    // db validation errors
    const errorValues = handleDBErrors(error);
    return next(new BadRequestError("Invalid inputs", errorValues));
  }
}
