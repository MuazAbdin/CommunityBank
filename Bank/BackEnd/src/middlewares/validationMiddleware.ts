import {
  ValidationChain,
  checkSchema,
  validationResult,
} from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { RunnableValidationChains } from "express-validator/src/middlewares/schema.js";
import { Request, Response, NextFunction } from "express";
import {
  loginSchema,
  registerSchema,
  editDetailsSchema,
} from "../errors/validationSchemas.js";

function processValidations(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorValues = errors.array().map((error) => {
      // @ts-ignore
      return { name: error.path, value: error.value, message: error.msg };
    });
    throw new BadRequestError("Invalid inputs", errorValues);
  }
  next();
}

function validationRunner(
  validations: RunnableValidationChains<ValidationChain>
) {
  return [validations, processValidations];
}

export const validateRegisterInput = validationRunner(
  // @ts-ignore
  checkSchema(registerSchema)
);

export const validateLoginInput = validationRunner(
  // @ts-ignore
  checkSchema(loginSchema)
);

export const validateEditDetailsInput = validationRunner(
  // @ts-ignore
  checkSchema(editDetailsSchema)
);

// export const validateChangePasswordInput = validationRunner(
//   // @ts-ignore
//   checkSchema(changePasswordSchema)
// );
