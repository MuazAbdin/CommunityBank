import { Schema, model } from "mongoose";
import { hashPassword, hashPasswordSync } from "../utils/auth.js";

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
    name: { type: name, required: true },
    password: {
      type: String,
      required: true,
      set: (v: string) => hashPasswordSync(v),
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
    address: { type: address, required: true },
    role: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    // accountList: [{ type: Schema.Types.ObjectId, ref: "Account" }],
  },
  {
    timestamps: true,
    statics: {
      async findOneWithoutPassword(userId: string) {
        return await this.findOne(
          { _id: userId },
          { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
        );
      },
    },
  }
);

export default model("User", userSchema);
