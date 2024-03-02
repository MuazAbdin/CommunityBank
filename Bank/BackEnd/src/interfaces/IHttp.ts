import { ObjectId } from "mongoose";

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

export interface IRequestBodyNewAccount {
  type: ["checking", "savings"];
}
export interface IUserWithoutPasswordDetails {
  _id: ObjectId;
  IDcard: string;
  name: { first: string; last: string };
  email: string;
  mobile: string;
  address: { city: string; street: string };
  updatedAt: string;
}
