import { Schema, model, Types } from "mongoose";

export interface IActivity {
  _id?: string;
  post: Types.ObjectId | string;
  author: Types.ObjectId | string;
  content: string;
  rating: number;
}

export interface ICreateActivityDTO extends IActivity {}

const activitySchema = new Schema<IActivity>(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Activity = model<IActivity>("Activity", activitySchema);
