// server/src/routes/adminRoutes.js
import express from "express";
import User from "../models/User.js";
import Score from "../models/Score.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all users (admin only)
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("name email role");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// ✅ Get all scores (admin only)
router.get("/scores", verifyToken, isAdmin, async (req, res) => {
  try {
    const scores = await Score.find().populate("user", "name email");
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scores", error: error.message });
  }
});

export default router;
