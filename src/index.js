// src/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

// ✅ Initialize Express app FIRST
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Routes (now app is defined)
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Base route
app.get("/", (req, res) => {
  res.send("🚀 Farm To Table Game Server is running successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
