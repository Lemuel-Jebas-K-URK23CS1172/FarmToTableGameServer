// src/controllers/scoreController.js
import Score from "../models/Score.js";

// Save score
export const saveScore = async (req, res) => {
  try {
    const { score, level } = req.body;
    const userId = req.user.id;

    if (!score && score !== 0) {
      return res.status(400).json({ message: "Score value required" });
    }

    const newScore = await Score.create({
      user: userId,
      score,
      level,
    });

    res.status(201).json({ message: "Score saved", score: newScore });
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ message: "Server error saving score" });
  }
};

// Get scores for the logged-in user
export const getUserScores = async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching scores" });
  }
};

// Admin: get all user scores
export const getAllScores = async (req, res) => {
  try {
    const scores = await Score.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all scores" });
  }
};
