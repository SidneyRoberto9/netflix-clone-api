import { Schema, model } from "mongoose";

export interface listModelInterface {
  title: string;
  type: string;
  genre: string;
  content: string[];
}

export const ListSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true }
);

export default model<listModelInterface>("List", ListSchema);
