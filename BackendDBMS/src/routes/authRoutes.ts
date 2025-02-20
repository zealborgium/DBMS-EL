import { registerUser, login, logout } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;

