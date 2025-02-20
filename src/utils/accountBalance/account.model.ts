import mongoose, { Schema, Document } from "mongoose";

export interface IAccountBalance extends Document {
  user_id: number;
  user_name: string;
  balance: number;
}

const AccountBalanceSchema: Schema = new Schema(
  {
    user_id: { type: Number, required: true, unique: true },
    user_name: { type: String, required: true },
    balance: { type: Number, required: true },
  },
  {
    collection: "account_balance",
  }
);

const AccountBalance = mongoose.model<IAccountBalance>(
  "AccountBalance",
  AccountBalanceSchema
);

export default AccountBalance;
