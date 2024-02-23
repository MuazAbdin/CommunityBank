import { Request, Response, NextFunction } from "express";
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyToken } from "../utils/auth.js";
import { ITokenPayload } from "../interfaces/IToken.js";

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  if (!token) next(new UnauthenticatedError("Not authenticated"));

  try {
    const { userId, IDcard, role } = verifyToken(token) as ITokenPayload;
    // req.user = { userId, role,  };
    next();
  } catch (error) {
    next(new UnauthenticatedError("authentication invalid"));
  }
}
