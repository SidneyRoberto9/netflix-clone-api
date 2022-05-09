import { Schema, model } from "mongoose";

export interface videoInterface {
  episode: string;
  season: string;
  content: string;
}

export interface serieModelInterface {
  title: string;
  desc: string;
  img: string;
  imgTitle: string;
  imgSm: string;
  trailer: string;
  year: string;
  limit: number;
  genre: string;
  duration: string;
  type: string;
  video: videoInterface[];
}

const SerieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    duration: { type: String },
    type: { type: String, default: "serie" },
    video: { type: Array },
  },
  { timestamps: true }
);

export default model<serieModelInterface>("Serie", SerieSchema);
