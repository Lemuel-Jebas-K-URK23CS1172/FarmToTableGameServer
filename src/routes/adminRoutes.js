import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Score from "../models/Score.js";

const router = express.Router();

// ✅ Get all users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all scores
router.get("/scores", protect, adminOnly, async (req, res) => {
  try {
    const scores = await Score.find().populate("user", "name email");
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete score
router.delete("/scores/:id", protect, adminOnly, async (req, res) => {
  try {
    await Score.findByIdAndDelete(req.params.id);
    res.json({ message: "Score deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
