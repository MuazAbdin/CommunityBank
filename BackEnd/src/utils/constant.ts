export const CATEGORIES = [
  "Entertainment",
  "Food",
  "Government",
  "Healthcare",
  "Housing",
  "Insurance",
  "Bank Loan",
  "Miscellaneous",
  "Payments",
  "Salary",
  "Transportation",
];

export const TRANSACTOIN_TYPES = [
  "deposit",
  "withdrawal",
  "transfer",
  "loan payment",
];

export const LOAN_MONTH_TERMS = Array(4)
  .fill(null)
  .map((_, i) => `${(i + 1) * 12} months`);
