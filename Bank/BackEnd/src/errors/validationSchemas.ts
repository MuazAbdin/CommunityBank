import { IRequestBodyUserDetails } from "../types/IHttp.js";
import User from "../models/User.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "./customErrors.js";
import { comparePassword } from "../utils/auth.js";

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
