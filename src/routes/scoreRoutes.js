const express = require("express");
const router = express.Router();
const { saveScore, getLeaderboard } = require("../controllers/scoreController");
const { protect } = require("../middleware/authMiddleware"); // optional if you have it

// Save player score
router.post("/save", protect, saveScore);

// Leaderboard
router.get("/leaderboard", getLeaderboard);

module.exports = router;
