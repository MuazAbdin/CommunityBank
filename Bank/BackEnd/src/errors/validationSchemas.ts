import {
  IRequestBodyTransaction,
  IRequestBodyUserDetails,
} from "../types/IHttp.js";
import User from "../models/User.js";
import { BadRequestError } from "./customErrors.js";
import { Request } from "express";
import Account from "../models/Account.js";
import { CATEGORIES } from "../utils/constant.js";

type Location = "body" | "cookies" | "headers" | "params" | "query";
type validator = (
  value: string,
  {
    req,
    location,
    path,
  }: {
    req: Request;
    location?: Location;
    path?: string;
  }
) => any;

export const registerSchema = {
  IDcard: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    matches: { bail: true, options: /^\d{9}$/ },
    custom: {
      errorMessage: "ID already exists",
      options: (async (value, { req }) => {
        const reqBody = req.body as unknown as IRequestBodyUserDetails;
        const user = await User.findOne({ IDcard: reqBody.IDcard });
        if (user) throw new BadRequestError("ID already exists");
      }) as validator,
    },
  },
  password: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    matches: {
      options:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,12}$/,
    },
  },
  passwordConfirm: {
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    custom: {
      errorMessage: "passwords do not match",
      options: ((value, { req }) => {
        const reqBody = req.body as unknown as IRequestBodyUserDetails;
        return value === reqBody.password;
      }) as validator,
    },
  },

  firstName: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    toLowerCase: true,
    matches: { options: /^[\w\d\s.\-_]{3,35}$/ },
  },
  lastName: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    toLowerCase: true,
    matches: { options: /^[\w\d\s.\-_]{3,35}$/ },
  },
  email: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    isEmail: true,
  },
  mobile: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    matches: { options: /^05\d{8}$/ },
  },
  city: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    toLowerCase: true,
    matches: { options: /^[\w\d\s.\-_]{3,35}$/ },
  },
  street: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    toLowerCase: true,
    matches: { options: /^[\w\d\s.\-_]{3,35}$/ },
  },
};

export const loginSchema = {
  IDcard: {
    errorMessage: "required",
    trim: true,
    notEmpty: true,
  },
  password: {
    errorMessage: "required",
    trim: true,
    notEmpty: true,
  },
};

export const editDetailsSchema = {
  firstName: registerSchema.firstName,
  lastName: registerSchema.lastName,
  email: registerSchema.email,
  mobile: registerSchema.mobile,
  city: registerSchema.city,
  street: registerSchema.street,
};

export const changePasswordSchema = {
  oldPassword: {
    errorMessage: "required",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
  },
  password: registerSchema.password,
  passwordConfirm: registerSchema.passwordConfirm,
};

export const transferSchema = {
  amount: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    isFloat: {
      errorMessage: "amount must be at least ₪ 0.01",
      options: { min: 0.01 },
      bail: true,
    },
    custom: {
      options: (async (value, { req }) => {
        if (parseFloat(value) > req.account!.balance)
          throw new BadRequestError("Insufficient balance");
      }) as validator,
    },
  },
  receiverAccount: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    custom: {
      options: (async (value, { req }) => {
        const account = await Account.findOne({ number: value });
        if (!account) throw new BadRequestError("Receiver Account not valid");
        if (account.number === req.account!.number)
          throw new BadRequestError("Can't transfer to same account");
      }) as validator,
    },
  },
  // vendor: {
  //   errorMessage: "invalid",
  //   trim: true,
  //   notEmpty: { errorMessage: "required", bail: true },
  //   toLowerCase: true,
  //   matches: { options: /^[\w\d\s.\-_]{3,35}$/ },
  // },
  category: {
    errorMessage: "invalid",
    trim: true,
    notEmpty: { errorMessage: "required", bail: true },
    isIn: { options: [CATEGORIES.map((c) => c.toLowerCase())] },
  },
  // date: {
  //   errorMessage: "invalid",
  //   trim: true,
  //   notEmpty: { errorMessage: "required", bail: true },
  //   isDate: { options: { format: "MM/DD/YYYY" } },
  // },
};
