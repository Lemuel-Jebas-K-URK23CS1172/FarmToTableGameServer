// src/routes/scoreRoutes.js
import express from "express";
import { saveScore, getLeaderboard } from "../controllers/scoreController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Register routes correctly
router.post("/save", authMiddleware, saveScore);
router.get("/leaderboard", getLeaderboard);

export default router; // ✅ THIS is critical
