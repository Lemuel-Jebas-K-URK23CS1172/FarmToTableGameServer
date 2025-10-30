// src/controllers/scoreController.js
const Score = require("../models/Score");

exports.saveScore = async (req, res) => {
  try {
    const { score, level } = req.body;
    const newScore = await Score.create({
      user: req.user.id,
      score,
      level,
    });
    res.json(newScore);
  } catch (err) {
    console.error("💥 Error saving score:", err.message);
    res.status(500).json({ msg: "Error saving score", error: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const topScores = await Score.find()
      .populate("user", "name email")
      .sort({ score: -1 })
      .limit(10);
    res.json(topScores);
  } catch (err) {
    console.error("💥 Error fetching leaderboard:", err.message);
    res.status(500).json({ msg: "Error fetching leaderboard" });
  }
};
