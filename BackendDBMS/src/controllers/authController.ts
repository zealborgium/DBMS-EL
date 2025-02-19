import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// ✅ Generate JWT Token
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

// ✅ Login Controller (Set JWT as `httpOnly` Cookie)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Set `httpOnly` cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Logout Controller (Clear Cookie)
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}; 

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role });
  
      const token = generateToken(newUser.id);
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      });
  
      res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  