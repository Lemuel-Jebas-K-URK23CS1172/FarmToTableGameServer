// src/routes/scoreRoutes.js
import express from "express";
import { saveScore, getScores } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Save user score (POST)
router.post("/save", protect, saveScore);

// ✅ Fetch all scores (GET)
router.get("/", protect, getScores);

export default router;
