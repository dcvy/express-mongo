import { Schema, model, Types } from "mongoose";

export interface IPost {
  id?: string;
  title: string;
  content: string;
  author: Types.ObjectId | string;
  category: Types.ObjectId | string;
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreatePostDTO {
  title: string;
  content: string;
  author: Types.ObjectId | string;
  category: Types.ObjectId | string;
  averageRating?: number;
}

export interface IUpdatePostDTO {
  title?: string;
  content?: string;
  author?: Types.ObjectId;
  category?: Types.ObjectId;
  averageRating?: number;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    averageRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = model<IPost>("Post", postSchema);
