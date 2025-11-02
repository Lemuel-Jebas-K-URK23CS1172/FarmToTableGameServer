// src/controllers/scoreController.js
import Score from "../models/Score.js";

// ✅ Save a new score
export const saveScore = async (req, res) => {
  try {
    const { score, level } = req.body;

    if (!score && score !== 0) {
      return res.status(400).json({ message: "Score is required" });
    }

    const newScore = new Score({
      user: req.user._id,
      score,
      level: level || 1,
    });

    await newScore.save();
    res.status(201).json({ message: "Score saved successfully", newScore });
  } catch (error) {
    console.error("❌ Error saving score:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all scores for the logged-in user
export const getScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(scores);
  } catch (error) {
    console.error("❌ Error fetching scores:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
