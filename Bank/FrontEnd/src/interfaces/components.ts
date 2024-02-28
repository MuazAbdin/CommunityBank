import { IInputField } from "../utils/constants";

export interface IMainHeaderProps {
  isDark: boolean;
  themeToggle: () => void;
}

export interface IUserDetailsFormProps {
  formID: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  title: string;
  buttonText: string;
  fields: IInputField[];
  values?: UserDetails;
  className?: string;
}

export interface IUserFormActionData {
  msg: string;
  data?: { name: string; value: string; message: string }[];
}

export interface UserDetails {
  IDcard: string;
  name: { first: string; last: string };
  email: string;
  mobile: string;
  address: { city: string; street: string };
}

export interface ITransactionProps {
  _id: string;
  createdAt: string;
  vendor: string;
  category: string;
  amount: number;
}
