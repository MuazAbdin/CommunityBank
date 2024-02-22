import { IRequestBodyUserDetails } from "../interfaces/IHttp.js";
import User from "../models/User.js";

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
    trim: true,
    notEmpty: true,
    matches: { options: /\d{9}/ },
    custom: {
      errorMessage: "ID already exists",
      options: (async (value, { req }) => {
        const reqBody = req.body as unknown as IRequestBodyUserDetails;
        const user = await User.findOne({ IDcard: reqBody.IDcard });
        if (user) throw new Error();
      }) as validator,
    },
  },
  password: {
    trim: true,
    notEmpty: true,
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
    trim: true,
    notEmpty: true,
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
  lastName: {
    trim: true,
    notEmpty: true,
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
  email: { trim: true, notEmpty: true, isEmail: true },
  mobile: { trim: true, notEmpty: true, matches: { options: /05\d{8}/ } },
  city: {
    trim: true,
    notEmpty: true,
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
  street: {
    trim: true,
    notEmpty: true,
    toLowerCase: true,
    matches: { options: /\w{3,35}/ },
  },
};
