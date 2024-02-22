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
import { userSchema } from "../errors/validationSchemas.js";

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

// @ts-ignore
export const validateRegisterInput = validationRunner(checkSchema(userSchema));

export const validateLoginInput = validationRunner(checkSchema({}));

export const validateEditDetailsInput = validationRunner(checkSchema({}));
