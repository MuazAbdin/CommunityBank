import {
  IInputFormatter,
  accountNumFormatter,
  moneyAmountFormatter,
} from "./inputFormatters";
import {
  IInputValidator,
  isAccountNumValid,
  isAddressValid,
  isAmountValid,
  isEmailValid,
  isEmpty,
  isFirstNameValid,
  isIDValid,
  isLastNameValid,
  isMobileValid,
  isPasswordConfirmValid,
  isPasswordValid,
} from "./validation";

export interface IInputField {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  validator?: IInputValidator;
  help?: string;
  hideVerifyIcon?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  formatter?: IInputFormatter;
}

export const REGISTER_FIELDS: IInputField[] = [
  {
    label: "ID Card",
    id: "IDcard",
    type: "number",
    placeholder: "ID Card",
    validator: isIDValid,
    help: "An israeli ID card.",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Password",
    validator: isPasswordValid,
    help: "6-12 characters. At least one lowercase, one uppercase, one digit, one of #?!@$ %^&*- .",
  },
  {
    label: "Confirm Password",
    id: "passwordConfirm",
    type: "password",
    placeholder: "Confirm Password",
    validator: isPasswordConfirmValid,
  },
  {
    label: "First Name",
    id: "firstName",
    type: "text",
    autoComplete: "given-name",
    placeholder: "First Name",
    validator: isFirstNameValid,
    help: "Must contain between 5-32 characters.",
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "text",
    autoComplete: "family-name",
    placeholder: "Last Name",
    validator: isLastNameValid,
    help: "Must contain between 5-32 characters.",
  },
  {
    label: "Email",
    id: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "Email",
    validator: isEmailValid,
  },
  {
    label: "Mobile",
    id: "mobile",
    type: "number",
    placeholder: "Mobile",
    validator: isMobileValid,
    help: "An israeli mobile number.",
  },
  {
    label: "City",
    id: "city",
    type: "text",
    placeholder: "City",
    validator: isAddressValid,
  },
  {
    label: "Street",
    id: "street",
    type: "text",
    placeholder: "Street",
    validator: isAddressValid,
  },
];

export const LOGIN_FIELDS: IInputField[] = [
  {
    label: "ID Card",
    id: "IDcard",
    type: "number",
    placeholder: "ID Card",
    autoComplete: "off",
    hideVerifyIcon: true,
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "off",
    hideVerifyIcon: true,
  },
];

export const EDIT_USER_FIELDS = REGISTER_FIELDS.filter(
  (f) => f.id !== "password" && f.id !== "passwordConfirm"
).map((f) => {
  if (f.id === "IDcard") return { ...f, disabled: true };
  return f;
});

export const CHANGE_PASSWORD_FIELDS: IInputField[] = [
  {
    label: "Old Password",
    id: "oldPassword",
    type: "password",
    placeholder: "Old Password",
    validator: isEmpty,
    hideVerifyIcon: true,
  },
  {
    label: "New Password",
    id: "password",
    type: "password",
    placeholder: "New Password",
    validator: isPasswordValid,
    help: "6-12 characters. At least one lowercase, one uppercase, one digit, one of #?!@$ %^&*- .",
  },
  {
    label: "Confirm Password",
    id: "passwordConfirm",
    type: "password",
    placeholder: "Confirm Password",
    validator: isPasswordConfirmValid,
  },
];

export const TRANSFER_FIELDS: IInputField[] = [
  {
    label: "Amount",
    id: "transferAmount",
    type: "number",
    placeholder: "Amount",
    validator: isAmountValid,
    help: "Minimum amount is ₪1.",
    formatter: moneyAmountFormatter,
  },
  {
    label: "Transfer to",
    id: "transferTo",
    type: "text",
    placeholder: "Transfer to",
    validator: isAccountNumValid,
    help: "A valid CommunityBank account number.",
    formatter: accountNumFormatter,
  },
  // {
  //   label: "Transfer on",
  //   id: "transferOn",
  //   type: "date",
  //   placeholder: "Transfer on",
  //   // min: new Date().toLocaleDateString("fr-ca"),
  // },
];

export const LOAN_FIELDS: IInputField[] = [
  {
    label: "Loan Amount",
    id: "loanAmount",
    type: "number",
    placeholder: "Loan Amount",
    validator: isAmountValid,
    help: "Minimum amount is ₪1.",
  },
  {
    label: "Loan Term",
    id: "loanTerm",
    type: "number",
    placeholder: "Loan Term",
  },
  {
    label: "Interest Rate",
    id: "interestRate",
    type: "number",
    placeholder: "Interest Rate",
  },
];
