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

export const ACCOUNT_TYPES = [
  "deposit",
  "withdrawal",
  "transfer",
  "loan payment",
];

export const LOAN_MONTH_TERMS = Array(4)
  .fill(null)
  .map((_, i) => `${(i + 1) * 12} months`);
