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

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/subscriptions", subscribeRoutes);

// If an unknown request starts with /api return JSON 404
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "Route not found" });
  }
  next();
});

// Serve front-end in production from client/dist (Vite build)
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  // non-production: any non-API route is treated as not found
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
}

const startServer = async () => {
  try {
    if (!MONGO_URI) {
      console.warn("MONGO_URI is not set. Server will start without database connection.");
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
