import { Types } from "mongoose";

export interface IPost {
  id?: Types.ObjectId;
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
