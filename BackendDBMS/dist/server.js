"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const paperRoutes_1 = __importDefault(require("./routes/paperRoutes"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Initialize WebSocket Server
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect Database
(0, db_1.connectDB)();
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/papers", paperRoutes_1.default);
// WebSocket Connection
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
