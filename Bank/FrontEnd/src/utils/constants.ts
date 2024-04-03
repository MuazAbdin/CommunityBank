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
  isRateValid,
} from "./validation";

export interface IInputField {
  label: string;
  id: string;
  type?: string;
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
    help: "Must contain between 3-32 characters.",
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "text",
    autoComplete: "family-name",
    placeholder: "Last Name",
    validator: isLastNameValid,
    help: "Must contain between 3-32 characters.",
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
    id: "amount",
    type: "number",
    placeholder: "Amount",
    validator: isAmountValid,
    help: "Minimum amount is ₪1.",
    // formatter: moneyAmountFormatter,
  },
  {
    label: "Transfer to",
    id: "receiverAccount",
    type: "text",
    placeholder: "Transfer to",
    validator: isAccountNumValid,
    help: "Last 6 digits of a CommunityBank account number.",
    // formatter: accountNumFormatter,
    // hideVerifyIcon: true,
  },
  // {
  //   label: "Vendor",
  //   id: "vendor",
  //   type: "text",
  //   placeholder: "Vendor",
  //   validator: isEmpty,
  // },
];

export const LOAN_FIELDS: IInputField[] = [
  {
    label: "Loan Amount",
    id: "amount",
    type: "number",
    placeholder: "Loan Amount",
    validator: isAmountValid,
    help: "Minimum amount is ₪1.",
  },
  {
    label: "Loan Term",
    id: "term",
    type: "number",
    validator: isEmpty,
    placeholder: "Loan Term",
  },
  {
    label: "Interest Rate",
    id: "interestRate",
    type: "number",
    validator: isRateValid,
    placeholder: "Interest Rate",
    help: "Number between 0-100.",
  },
];

export const CONTACT_US_FIELDS: IInputField[] = [
  {
    label: "Name",
    id: "name",
    type: "text",
    placeholder: "Name",
    validator: isFirstNameValid,
    help: "Must contain between 3-32 characters.",
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
    label: "Message",
    id: "message",
    placeholder: "Message",
    validator: isEmpty,
  },
];

export const CATEGORIES = [
  "Entertainment",
  "Food",
  "Government",
  "Healthcare",
  "Housing",
  "Insurance",
  "Miscellaneous",
  "Payments",
  "Salary",
  "Transportation",
];

export const LOAN_MONTH_TERMS = Array(4)
  .fill(null)
  .map((_, i) => `${(i + 1) * 12} months`);
