import { Schema, model } from "mongoose";

const accountSchema = new Schema(
  {
    number: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["checking", "savings"],
    },
    balance: { type: Number, required: true, default: 0 },
    lastVisit: { type: Date, required: true, default: Date.now() },
  },
  { timestamps: true }
);

export default model("Account", accountSchema);
