// src/routes/scoreRoutes.js
import express from "express";
import { saveScore, getUserScores, getAllScores } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Save new score (user authenticated)
router.post("/", protect, saveScore);

// ✅ Get all scores for a user
router.get("/my", protect, getUserScores);

// ✅ Admin: Get all user scores
router.get("/all", protect, getAllScores);

export default router;
