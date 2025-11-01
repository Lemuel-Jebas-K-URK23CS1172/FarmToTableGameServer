import Score from "../models/Score.js";

export const saveScore = async (req, res) => {
  try {
    const { score, level } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const newScore = await Score.create({
      user: req.user.id,
      score,
      level,
    });

    res.json(newScore);
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ msg: "Error saving score", error: err.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const topScores = await Score.find()
      .populate("user", "name email")
      .sort({ score: -1 })
      .limit(10);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching leaderboard" });
  }
};
