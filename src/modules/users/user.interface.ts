import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  age: number;
}

export interface ICreateUserDTO extends IUser {}
export interface IUpdateUserDTO extends Partial<IUser> {}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
