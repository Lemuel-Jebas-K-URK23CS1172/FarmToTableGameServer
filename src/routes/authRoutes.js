// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// ✅ Use POST methods only
router.post("/register", register);
router.post("/login", login);

module.exports = router;
