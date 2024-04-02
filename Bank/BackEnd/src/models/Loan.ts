import { constants } from "fs/promises";
import { get } from "http";
import { Schema, model } from "mongoose";

const payment = {
  date: { type: Date, required: true },
  amount: { type: Number, required: true, min: 0.01 },
};

const loanSchema = new Schema(
  {
    account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    amount: { type: Number, required: true, min: 0.01 },
    interestRate: { type: Number, required: true, default: 0.05 },
    term: { type: Number, required: true, default: 12 },
    nextPayment: { type: Number, required: true },
    payOffDate: { type: Date, required: true },
    // date: { type: Date, required: true },
    // payments: { type: [payment], required: true, default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    virtuals: {
      balnce: {
        get() {
          const monthlyPayment = monthlyAmortizedRepayment(
            this.amount,
            this.term / 12,
            this.interestRate
          );
          const initBalance = monthlyPayment * this.term;
          const pastPayments = monthlyPayment * this.nextPayment;
          return initBalance - pastPayments;
        },
      },
      monthlyPayment: {
        get() {
          return monthlyAmortizedRepayment(
            this.amount,
            this.term / 12,
            this.interestRate
          );
        },
      },
    },
  }
);

export default model("Loan", loanSchema);

function monthlyAmortizedRepayment(
  loanAmount: number,
  loanTerm: number,
  interestRate: number,
  compoundings: number = 12
) {
  const r = interestRate / (100 * compoundings);
  const n = loanTerm * compoundings;
  // const factor = r !== 0 ? Math.pow(1 + r, n) : 1 / n;
  // const totalRepayment = (loanAmount * r * factor) / (factor - 1);
  const factor = r !== 0 ? r / (1 - Math.pow(1 + r, -n)) : 1 / n;
  const monthlyRepayment = loanAmount * factor;

  return monthlyRepayment;
}
