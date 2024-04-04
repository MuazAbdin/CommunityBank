import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, generateToken, hashPassword } from "../utils/auth.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { handleDBErrors } from "../errors/dbErrors.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isFirstUser = (await User.countDocuments()) === 0;
  const role = isFirstUser ? "admin" : "user";
  // const hashedPassword = await hashPassword(req.body.password);

  const newUser = {
    IDcard: req.body.IDcard,
    name: { first: req.body.firstName, last: req.body.lastName },
    // password: hashedPassword,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.mobile,
    address: { city: req.body.city, street: req.body.street },
    role: role,
  };

  try {
    await User.create(newUser);
    res.status(StatusCodes.CREATED).send({ msg: "Registered successfully" });
  } catch (error: any) {
    // db validation errors
    const errorValues = handleDBErrors(error);
    return next(new BadRequestError("Invalid inputs", errorValues));
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { IDcard, password } = req.body;
  const user = await User.findOne({ IDcard: IDcard });
  // if (!user) throw new UnauthenticatedError("invalid credentials");
  if (!user) return next(new UnauthenticatedError("invalid credentials"));
  const isPasswordValid = await comparePassword(password, user.password);
  // if (!isPasswordValid) throw new UnauthenticatedError("invalid credentials");
  if (!isPasswordValid)
    return next(new UnauthenticatedError("invalid credentials"));

  const token = generateToken({
    userId: user._id.toString(),
    IDcard: user.IDcard,
    role: user.role,
  });

  const HOUR = 1000 * 60 * 60;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 0.25 * HOUR),
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.status(StatusCodes.OK).send({ msg: "Logged in successfully" });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  // res.cookie("token", "logout", {
  //   httpOnly: true,
  //   expires: new Date(Date.now()),
  // });
  res.status(StatusCodes.OK).json({ msg: "Logged out successfully!" });
}
