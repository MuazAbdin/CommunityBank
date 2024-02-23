import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../interfaces/IToken.js";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export function hashPasswordSync(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export function generateToken(payload: ITokenPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  return decoded;
}
