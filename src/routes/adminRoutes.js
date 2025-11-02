// server/src/routes/adminRoutes.js
import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Score from "../models/Score.js";

const router = express.Router();

// ✅ Get all users (admin only)
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Admin users fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all scores (admin only)
router.get("/scores", protect, adminOnly, async (req, res) => {
  try {
    const scores = await Score.find().populate("user", "name email role");
    res.json(scores);
  } catch (err) {
    console.error("Admin scores fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
