import isEmail from "validator/lib/isEmail";
import {
  CHANGE_PASSWORD_FIELDS,
  EDIT_USER_FIELDS,
  REGISTER_FIELDS,
} from "./constants";
import { isInt } from "validator";

export interface IInputValidator {
  (v1: string, v2?: string): { result: boolean; message: string };
}

const validateDefaultString: IInputValidator = function (v) {
  if (v.length === 0) return { result: false, message: "required" };
  if (!/^[\w\d\s.\-_]{3,35}$/.test(v))
    return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isEmpty: IInputValidator = function (str) {
  if (str.length === 0) return { result: false, message: "required" };
  return { result: true, message: "valid" };
};

export const isAmountValid: IInputValidator = function (amount) {
  if (amount.length === 0) return { result: false, message: "required" };
  if (!isInt(amount, { min: 1 })) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isAccountNumValid: IInputValidator = function (accountNum) {
  if (accountNum.length === 0) return { result: false, message: "required" };
  if (!/^\d{11}$/.test(accountNum))
    return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isIDValid: IInputValidator = function (IDcard) {
  if (IDcard.length === 0) return { result: false, message: "required" };
  if (!/^\d{9}$/.test(IDcard)) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isPasswordValid: IInputValidator = function (password) {
  if (password.length === 0) return { result: false, message: "required" };
  const result =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,12}$/.test(
      password
    );
  if (!result) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isPasswordConfirmValid: IInputValidator = function (
  password,
  passwordConfirm
) {
  if (passwordConfirm?.length === 0)
    return { result: false, message: "required" };
  const result =
    isPasswordValid(passwordConfirm!).result && password === passwordConfirm;
  if (!result) return { result: false, message: "password is not match" };
  return { result: true, message: "valid" };
};

export const isFirstNameValid: IInputValidator = function (firstName) {
  return validateDefaultString(firstName);
};

export const isLastNameValid: IInputValidator = function (lastName) {
  return validateDefaultString(lastName);
};

export const isEmailValid: IInputValidator = function (email) {
  // return /[\w.*-]+@([\w-]+\.)+[\w-]{2,4}/.test(email);
  if (email.length === 0) return { result: false, message: "required" };
  const result = isEmail(email);
  if (!result) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isMobileValid: IInputValidator = function (mobile) {
  if (mobile.length === 0) return { result: false, message: "required" };
  const result = /^05\d{8}$/.test(mobile);
  if (!result) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isAddressValid: IInputValidator = function (address) {
  return validateDefaultString(address);
};

/* Whole form presubmit validators */
export function validateRegisterFields(fields: any) {
  const results = REGISTER_FIELDS.map((f) => {
    const validator =
      f.id === "passwordConfirm"
        ? (value: string) => f.validator(fields.password || "", value)
        : f.validator;
    return { name: f.id, value: fields[f.id], ...validator(fields[f.id]) };
  });
  const data = results
    .filter((r) => !r.result)
    .map((r) => {
      return { name: r.name, value: r.value, message: r.message };
    });
  const msg = data.length === 0 ? "" : "Invalid inputs";
  return { msg, data };
}

export function validateLoginFields(fields: any) {
  const missedFields = Object.keys(fields).filter((k) => fields[k] === "");
  if (missedFields.length > 0) {
    return {
      msg: "Invalid inputs",
      data: missedFields.map((k) => {
        return { name: k, value: "", message: "required" };
      }),
    };
  }
  return { msg: "", data: [] };
}

export function validateEditUserDetailsFields(fields: any) {
  const results = EDIT_USER_FIELDS.filter((f) => f.id !== "IDcard").map((f) => {
    return { name: f.id, value: fields[f.id], ...f.validator(fields[f.id]) };
  });
  const data = results
    .filter((r) => !r.result)
    .map((r) => {
      return { name: r.name, value: r.value, message: r.message };
    });
  const msg = data.length === 0 ? "" : "Invalid inputs";
  return { msg, data };
}

export function validateChangePasswordFields(fields: any) {
  const results = CHANGE_PASSWORD_FIELDS.map((f) => {
    return { name: f.id, value: fields[f.id], ...f.validator(fields[f.id]) };
  });
  const data = results
    .filter((r) => !r.result)
    .map((r) => {
      return { name: r.name, value: r.value, message: r.message };
    });
  const msg = data.length === 0 ? "" : "Invalid inputs";
  return { msg, data };
}
