import isEmail from "validator/lib/isEmail";

export interface IInputValidator {
  (v1: string, v2?: string): { result: boolean; message: string };
}

const validateDefaultString: IInputValidator = function (v) {
  if (v.length === 0) return { result: false, message: "required" };
  if (!/\w{3,35}/.test(v)) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isIDValid: IInputValidator = function (IDcard) {
  if (IDcard.length === 0) return { result: false, message: "required" };
  if (!/\d{9}/.test(IDcard)) return { result: false, message: "invalid" };
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
  const result = /05\d{8}/.test(mobile);
  if (!result) return { result: false, message: "invalid" };
  return { result: true, message: "valid" };
};

export const isAddressValid: IInputValidator = function (address) {
  return validateDefaultString(address);
};
