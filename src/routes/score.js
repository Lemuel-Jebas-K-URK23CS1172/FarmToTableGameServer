const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/auth");
const { saveScore, getLeaderboard } = require("../controllers/scoreController");

router.post("/", protect, saveScore);
router.get("/", protect, adminOnly, getLeaderboard);

module.exports = router;
