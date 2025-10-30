// src/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://lemuel-jebas-k-urk23cs1172.github.io", // your GitHub Pages frontend
      "http://localhost:5173" // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Debug incoming requests (optional)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/scores", require("./routes/scoreRoutes"));

app.get("/", (req, res) => {
  res.send("🌾 Farm to Table Rescue API is running...");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
