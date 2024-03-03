import { Types } from "mongoose";

/* Request Body types */
export interface IRequestBodyUserDetails {
  IDcard: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  street: string;
}

export interface IRequestBodyAccountType {
  type: ["checking", "savings"];
}

export interface IUserWithoutPasswordDetails {
  _id: Types.ObjectId;
  IDcard: string;
  name: { first: string; last: string };
  email: string;
  mobile: string;
  address: { city: string; street: string };
  // updatedAt: string;
}

/* Extend Express Request interface */
declare module "express-serve-static-core" {
  export interface Request {
    user?: IUserWithoutPasswordDetails;
  }
}
