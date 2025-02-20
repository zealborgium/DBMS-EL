import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "2447b63b655a00759bb928205616bf46b167a48dc09ddf9c596fa4a63c3e10da";

// ✅ Generate JWT Token
export const generateToken = (id: string, email: string, role: string) => {
    return jwt.sign(
      { id, email, role }, // Include email & role in the payload
      process.env.JWT_SECRET as string, // Ensure you have a JWT secret in `.env`
      { expiresIn: "1h" }
    );
  };

// ✅ Login Controller (Set JWT as `httpOnly` Cookie)
export const login = async (req: Request, res: Response) => {
    try {
      // ✅ Extract and validate email & password
      const { email, password } = req.body;
  
      if (!email || !password || typeof email !== "string") {
        return res.status(400).json({ message: "Invalid email or password format" });
      }
  
      console.log("🟡 Login attempt received for:", email.trim());
  
      // ✅ Find user by email (ensure case-insensitive search)
      const user = await User.findOne({ email: email.trim().toLowerCase() });
      if (!user) {
        console.log("❌ User not found in database");
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      console.log("✅ User found:", { id: user.id, email: user.email, role: user.role });
  
      // ✅ Check password match securely
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("❌ Incorrect password");
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      console.log("✅ Password matched!");
  
      // ✅ Generate JWT token
      const token = generateToken(user.id, user.email, user.role);
      console.log("✅ JWT Token generated:", token);
  
      // ✅ Set `httpOnly` cookie for security
      res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript access (mitigates XSS)
        secure: process.env.NODE_ENV === "production", // Uses secure cookies in production
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 60 * 60 * 1000, // Expires in 1 hour
      });
  
      console.log("✅ Cookie set with JWT token");
  
      // ✅ Send user data (excluding password) and token
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
  
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

// ✅ Logout Controller (Clear Cookie)
export const logout = (req: Request, res: Response) => {
  console.log("🔵 Logout request received");

  res.clearCookie("token");
  console.log("✅ Cookie cleared");

  res.json({ message: "Logged out successfully" });
};

// ✅ Register User Controller
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("🟡 Registration attempt for:", email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already registered");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("✅ Email is available. Proceeding with registration");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");

    const newUser = await User.create({ name, email, password: hashedPassword, role });
    console.log("✅ New user created:", newUser);

    const token = generateToken(newUser.id, newUser.email, newUser.role);
    console.log("✅ JWT Token generated for new user:", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    console.log("✅ Cookie set with JWT token for new user");

    res.status(201).json({ 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } 
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
