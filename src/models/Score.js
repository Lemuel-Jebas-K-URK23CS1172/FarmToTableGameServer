// src/models/Score.js
import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    level: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Score", scoreSchema);
