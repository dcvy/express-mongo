import { Schema, model } from "mongoose";

export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
}

export interface ICreateCategoryDTO extends ICategory {}
export interface IUpdateCategoryDTO extends Partial<ICategory> {}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Category = model<ICategory>("Category", categorySchema);
