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
    lastPayment: Number,
    // date: { type: Date, required: true },
    // payments: { type: [payment], required: true, default: [] },
  },
  { timestamps: true }
);

export default model("Loan", loanSchema);
