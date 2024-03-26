import { Types } from "mongoose";

export interface IUser {
  name: {
    first: string;
    last: string;
  };
  IDcard: string;
  email: string;
  mobile: string;
  password: string;
  address: {
    city: string;
    street: string;
  };
  role: "user" | "admin";
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

export interface IAccount {
  number: string;
  type: "checking" | "savings";
  user: Types.ObjectId;
  balance: number;
  lastVisit: Date;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
