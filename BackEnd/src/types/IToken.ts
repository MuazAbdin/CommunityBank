import { JwtPayload } from "jsonwebtoken";

export interface ITokenPayload extends JwtPayload {
  userId: string;
  IDcard: string;
  role: string;
}
