import { Schema, model } from "mongoose";

const CATEGORIES = [
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

const transactionSchema = new Schema(
  {
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    type: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["deposit", "withdrawal", "transfer"],
    },
    amount: { type: Number, required: true, min: 0.01 },
    vendor: { type: String, lowercase: true, trim: true, required: true },
    category: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      enum: CATEGORIES,
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model("Transaction", transactionSchema);
