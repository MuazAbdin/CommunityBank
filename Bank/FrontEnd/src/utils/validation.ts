function validateDefaultString(v: string) {
  return /\w{3,35}/.test(v);
}

export function isIDValid(IDcard: string) {
  return /\d{9}/.test(IDcard);
}

export function isPasswordValid(password: string) {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,12}$/.test(
    password
  );
}

export function isPasswordConfirmValid(
  password: string,
  passwordConfirm: string
) {
  return isPasswordValid(passwordConfirm) && password === passwordConfirm;
}

export function isFirstNameValid(firstName: string) {
  return validateDefaultString(firstName);
}

export function isLastNameValid(lastName: string) {
  return validateDefaultString(lastName);
}

export function isEmailValid(email: string) {
  return /[\w.*-]+@([\w-]+\.)+[\w-]{2,4}/.test(email);
}

export function isMobileValid(mobile: string) {
  return /05\d{8}/.test(mobile);
}

export function isAddressValid(address: string) {
  return validateDefaultString(address);
}
