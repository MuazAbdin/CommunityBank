import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, generateToken, hashPassword } from "../utils/auth.js";

export async function register(req: Request, res: Response) {
  const isFirstUser = (await User.countDocuments()) === 0;
  const role = isFirstUser ? "admin" : "user";
  const hashedPassword = await hashPassword(req.body.password);

  const newUser = {
    IDcard: req.body.IDcard,
    name: { first: req.body.firstName, last: req.body.lastName },
    password: hashedPassword,
    email: req.body.email,
    mobile: req.body.mobile,
    address: { city: req.body.city, street: req.body.street },
    role: role,
  };

  await User.create(newUser);
  res.status(StatusCodes.CREATED).send({ msg: "user registered successfully" });
}

export async function login(req: Request, res: Response) {
  const { IDcard, password } = req.body;
  const user = await User.findOne({ IDcard: IDcard });
  if (!user) throw new Error();
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) throw new Error();

  const token = generateToken({
    userId: user._id,
    IDcard: user.IDcard,
    role: user.role,
  });

  const HOUR = 1000 * 60 * 60;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 0.25 * HOUR),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).send({ msg: "user logged in successfully" });
}

export async function logout(req: Request, res: Response) {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
}
