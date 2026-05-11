const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const messageRoutes = require("./routes/messageRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const rawMongoUri = process.env.MONGO_URI || "";

const MONGO_URI =
  rawMongoUri && !/^mongodb(\+srv)?:\/\//.test(rawMongoUri)
    ? `mongodb://${rawMongoUri}`
    : rawMongoUri;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/subscriptions", subscribeRoutes);

// API 404
app.use("/api", (req, res) => {
  res.status(404).json({
    message: "API Route not found",
  });
});

// Production Frontend
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../client/dist");

  app.use(express.static(clientDist));

  // Serve React SPA for any unknown route (fallback middleware)
  app.use((req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found",
    });
  });
}

// Start Server
const startServer = async () => {
  try {
    if (!MONGO_URI) {
      console.warn(
        "MONGO_URI is not set. Server starting without DB connection."
      );
    } else {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();