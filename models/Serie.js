const mongoose = require("mongoose");

const SerieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: Array },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    type: { type: String, default: "serie" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Serie", SerieSchema);
