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
  values?: IUserValues;
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

export interface AccountDetails {
  number: string;
  type: "savings" | "checking";
  balance: number;
  lastVisit: Date;
}

export interface TransactionDetails {
  _id: string;
  account: string;
  type: string;
  amount: number;
  vendor: string;
  category: string;
  date: Date;
}

export interface ITransactionProps {
  // _id: string;
  date: Date;
  vendor: string;
  category: string;
  amount: number;
}

export interface IUserProfileContext {
  // openModal: () => void;
  userValues: IUserValues;
  accountsValues: IAccountsValues[];
}

export interface IUserValues {
  IDcard: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  street: string;
}

export interface IAccountsValues {
  number: string;
  type: "savings" | "checking";
  balance: number;
  lastVisit: Date;
}
