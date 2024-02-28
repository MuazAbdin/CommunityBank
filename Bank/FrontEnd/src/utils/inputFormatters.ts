import { UserDetails } from "../interfaces/components";

export interface IInputFormatter {
  (value: string, symbol?: string): string;
}

export const IDcardFormatter: IInputFormatter = function (
  IDcard: UserDetails["IDcard"]
) {
  if (IDcard.length < 9) return IDcard;
  return `${IDcard.substring(0, 8)}-${IDcard.charAt(8)}`;
};

export const moneyAmountFormatter: IInputFormatter = function (
  amount: string,
  currency = "₪"
) {
  if (amount.length === 0) return amount;
  return `${currency} ${amount}`;
};

export const accountNumFormatter: IInputFormatter = function (account: string) {
  if (account.length <= 2) return account;
  if (account.length <= 5)
    return `${account.substring(0, 2)}-${account.substring(2)}`;
  return `${account.substring(0, 2)}-${account.substring(
    2,
    5
  )}-${account.substring(5)}`;
};
