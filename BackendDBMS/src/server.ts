import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import paperRoutes from "./routes/paperRoutes";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Ensure environment variables are set
if (!process.env.MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in .env file");
}

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize WebSocket Server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // Allow frontend access
app.use(express.json());
app.use(cookieParser());

// Connect Database (Ensures MongoDB connection before starting server)
connectDB().catch((err) => {
  console.error("❌ Database Connection Error:", err);
  process.exit(1); // Exit if DB fails
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/papers", paperRoutes);

// WebSocket Connection Handling
io.on("connection", (socket) => {
  console.log("✅ New WebSocket client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });

  // Example: Handle real-time notifications for paper submissions
  socket.on("new-paper-submitted", (paper) => {
    console.log("📄 New Paper Submitted:", paper);
    io.emit("update-papers", paper);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
