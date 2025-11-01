import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js"; // ✅ ensure this matches filename

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Use routes
app.use("/api/auth", userRoutes);
app.use("/api/scores", scoreRoutes); // ✅ make sure this matches

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
