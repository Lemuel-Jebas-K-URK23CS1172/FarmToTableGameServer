// src/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📩 Register request body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = createToken(user);
    console.log("✅ Registered new user:", user.email);
    res.json({ token, user });
  } catch (err) {
    console.error("💥 Register Error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = createToken(user);
    console.log("✅ Login successful:", user.email);
    res.json({ token, user });
  } catch (err) {
    console.error("💥 Login Error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
