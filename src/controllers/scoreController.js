const Score = require("../models/Score");

exports.saveScore = async (req, res) => {
  console.log("🎮 Save score request received:", req.body, "User:", req.user);
  try {
    const { score, level } = req.body;
    if (score == null) return res.status(400).json({ msg: "Score missing" });

    const newScore = await Score.create({
      user: req.user.id,
      score,
      level: level || 1,
    });

    console.log("✅ Score saved for user:", req.user.id, "score:", score);
    res.status(201).json(newScore);
  } catch (err) {
    console.error("❌ Error saving score:", err.message);
    res.status(500).json({ msg: "Error saving score", error: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  console.log("🏆 Leaderboard request by:", req.user);
  try {
    const topScores = await Score.find()
      .populate("user", "name email")
      .sort({ score: -1 })
      .limit(10);
    res.json(topScores);
  } catch (err) {
    console.error("❌ Error fetching leaderboard:", err.message);
    res.status(500).json({ msg: "Error fetching leaderboard" });
  }
};
