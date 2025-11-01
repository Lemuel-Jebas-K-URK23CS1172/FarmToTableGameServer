import express from "express";
import { saveScore, getLeaderboard } from "../controllers/scoreController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", authMiddleware, saveScore);
router.get("/leaderboard", getLeaderboard);

export default router;
