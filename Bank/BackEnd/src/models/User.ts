import { Schema, model } from "mongoose";

const defaultString = {
  type: String,
  lowercase: true,
  required: true,
  minlength: 3,
  maxlength: 35,
};

const name = {
  first: defaultString,
  last: defaultString,
};

const address = {
  city: defaultString,
  street: defaultString,
};

const userSchema = new Schema(
  {
    IDcard: {
      type: String,
      required: true,
      validate: { validator: (v: string) => /\d{9}/.test(v) },
    },
    name: name,
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,12}$/.test(
            v
          ),
      },
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      validate: {
        validator: (v: string) => /[\w.*-]+@([\w-]+\.)+[\w-]{2,4}/.test(v),
      },
    },
    mobile: {
      type: String,
      required: true,
      validate: { validator: (v: string) => /05\d{8}/.test(v) },
    },
    address: address,
    role: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    // accountList: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  },
  { timestamps: true }
);

export default model("User", userSchema);
