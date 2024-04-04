import { Request, Response, NextFunction } from "express";
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} from "../errors/customErrors.js";
import { verifyToken } from "../utils/auth.js";
import { ITokenPayload } from "../types/IToken.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { IUserWithoutPasswordDetails } from "../types/IHttp.js";

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  if (!token) next(new UnauthenticatedError("Not authenticated"));

  try {
    const { userId, IDcard, role } = verifyToken(token) as ITokenPayload;
    const user = await User.findOneWithoutPassword(userId);
    if (!user) next(new NotFoundError("User Not Found"));
    req.user = user!;
    next();
  } catch (error) {
    next(new UnauthenticatedError("authentication invalid"));
  }
}

// export async function getCurrentUserDetails(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   //@ts-ignore
//   const userWithoutPassword = await User.findOneWithoutPassword(
//     req.user.userId
//   );
//   next();
// }
