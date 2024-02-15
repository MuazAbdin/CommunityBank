import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export async function generateToken(payload: object) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

export async function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  return decoded;
}
