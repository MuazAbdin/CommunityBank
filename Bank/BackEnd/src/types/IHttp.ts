import { Types } from "mongoose";
import { CATEGORIES } from "../utils/constant.js";

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
  type: "checking" | "savings";
}

export interface IRequestBodyTransaction {
  amount: string;
  receiverAccount: string;
  // vendor: string;
  category: (typeof CATEGORIES)[number];
  // date: Date;
}

export interface IRequestQueryTransactions {
  query?: string;
  side?: string;
  type?: string;
  category?: string;
  page: string;
  start?: string;
  end?: string;
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

export interface IAccountDetails {
  _id: Types.ObjectId;
  number: string;
  user: Types.ObjectId;
  type: "checking" | "savings";
  balance: number;
  lastVisit: Date;
}

/* Extend Express Request interface */
declare module "express-serve-static-core" {
  export interface Request {
    user?: IUserWithoutPasswordDetails;
    account?: IAccountDetails;
  }
}
