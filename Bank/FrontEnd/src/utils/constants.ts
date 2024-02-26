import {
  IInputValidator,
  isAddressValid,
  isEmailValid,
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
  disabled?: boolean;
}

export const REGISTER_FIELDS = [
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
    help: "must contain between 5-32 characters.",
  },
  {
    label: "Last Name",
    id: "lastName",
    type: "text",
    autoComplete: "family-name",
    placeholder: "Last Name",
    validator: isLastNameValid,
    help: "must contain between 5-32 characters.",
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

export const LOGIN_FIELDS = [
  {
    label: "ID Card",
    id: "IDcard",
    type: "number",
    placeholder: "ID Card",
    autoComplete: "off",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Password",
    autoComplete: "off",
  },
];

export const EDIT_USER_FIELDS = REGISTER_FIELDS.filter(
  (f) => f.id !== "password" && f.id !== "passwordConfirm"
).map((f) => {
  if (f.id === "IDcard") return { ...f, disabled: true };
  return f;
});

export const CHANGE_PASSWORD_FIELDS = [
  {
    label: "Old Password",
    id: "oldPassword",
    type: "password",
    placeholder: "Old Password",
    // validator: isPasswordValid,
    // help: "6-12 characters. At least one lowercase, one uppercase, one digit, one of #?!@$ %^&*- .",
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
