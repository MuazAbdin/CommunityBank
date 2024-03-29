import { Schema, model } from "mongoose";

// restraining orders??
const accountSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      set: (v: number) => "24891" + v,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["checking", "savings"],
    },
    balance: { type: Number, required: true, default: 0 },
    lastVisit: { type: Date, required: true, default: Date.now() },
  },
  {
    timestamps: true,
    methods: {
      getTag(senderAccountId, receiverAccountId) {
        if (this._id === senderAccountId) return "payor";
        if (this._id === receiverAccountId) return "payee";
      },
    },
  }
);

export default model("Account", accountSchema);
