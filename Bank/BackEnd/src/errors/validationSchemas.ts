import { IRequestBodyUserDetails } from "../interfaces/IHttp.js";
import User from "../models/User.js";
import { BadRequestError } from "./customErrors.js";

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

export const userSchema = {
  IDcard: {
    errorMessage: "IDcard is invalid",
    trim: true,
    notEmpty: { errorMessage: "IDcard is required", bail: true },
    matches: { bail: true, options: /\d{9}/ },
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
    errorMessage: "password is invalid",
    trim: true,
    notEmpty: { errorMessage: "password is required", bail: true },
    matches: {
      options:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,12}$/,
    },
  },
  passwordConfirm: {
    trim: true,
    custom: {
      errorMessage: "not matching the password",
      options: ((value, { req }) => {
        const reqBody = req.body as unknown as IRequestBodyUserDetails;
        return value === reqBody.password;
      }) as validator,
    },
  },

  firstName: {
    errorMessage: "first name is invalid",
    trim: true,
    notEmpty: { errorMessage: "first name is required", bail: true },
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
  lastName: {
    errorMessage: "last name is invalid",
    trim: true,
    notEmpty: { errorMessage: "last name is required", bail: true },
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
  email: {
    errorMessage: "email is invalid",
    trim: true,
    notEmpty: { errorMessage: "email is required", bail: true },
    isEmail: true,
  },
  mobile: {
    errorMessage: "mobile is invalid",
    trim: true,
    notEmpty: true,
    matches: { options: /05\d{8}/ },
  },
  city: {
    errorMessage: "city is invalid",
    trim: true,
    notEmpty: { errorMessage: "city is required", bail: true },
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
  street: {
    errorMessage: "street is invalid",
    trim: true,
    notEmpty: { errorMessage: "street is required", bail: true },
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
};

export const loginSchema = {
  IDcard: {
    errorMessage: "IDcard is required",
    trim: true,
    notEmpty: true,
  },
  password: {
    errorMessage: "password is required",
    trim: true,
    notEmpty: true,
  },
};
