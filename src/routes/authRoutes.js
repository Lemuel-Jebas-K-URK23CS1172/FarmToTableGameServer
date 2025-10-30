const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// ✅ Both routes use POST (not GET)
router.post("/register", register);
router.post("/login", login);

module.exports = router;
