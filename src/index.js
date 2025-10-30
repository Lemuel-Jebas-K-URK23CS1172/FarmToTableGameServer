require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://lemuel-jebas-k-urk23cs1172.github.io",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ✅ Make sure these lines are EXACTLY like this:
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/scores", require("./routes/scoreRoutes"));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // 👈 Important
app.use("/api/scores", require("./routes/scoreRoutes"));

// Root route
app.get("/", (req, res) => {
  res.send("🌾 Farm to Table Rescue API is running...");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


