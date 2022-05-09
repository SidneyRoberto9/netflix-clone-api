import { Schema, model } from "mongoose";

export interface movieModelInterface {
  title: string;
  desc: string;
  img: string;
  imgTitle: string;
  imgSm: string;
  trailer: string;
  video: string;
  year: string;
  limit: number;
  genre: string;
  duration: string;
  type: string;
}

const MovieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    duration: { type: String },
    type: { type: String, default: "movie" },
  },
  { timestamps: true }
);

export default model<movieModelInterface>("Movie", MovieSchema);
