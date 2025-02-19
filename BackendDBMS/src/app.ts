import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Placeholder
app.get("/", (req, res) => {
  res.send("Paper Review Backend is running...");
});

export default app;
