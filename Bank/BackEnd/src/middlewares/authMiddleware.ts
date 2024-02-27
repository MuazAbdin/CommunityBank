import { Request, Response, NextFunction } from "express";
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyToken } from "../utils/auth.js";
import { ITokenPayload } from "../interfaces/IToken.js";
import User from "../models/User.js";

export async function authenticateUser(
  req: Request & { user?: ITokenPayload },
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  if (!token) next(new UnauthenticatedError("Not authenticated"));

  try {
    const { userId, IDcard, role } = verifyToken(token) as ITokenPayload;
    req.user = { userId, IDcard, role };
    next();
  } catch (error) {
    next(new UnauthenticatedError("authentication invalid"));
  }
}

export async function getCurrentUserDetails(
  req: Request & { user: ITokenPayload },
  res: Response,
  next: NextFunction
) {
  //@ts-ignore
  const userWithoutPassword = await User.findOneWithoutPassword(
    req.user.userId
  );
  next();
}
