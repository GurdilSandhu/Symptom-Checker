import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("📩 Incoming Request Data:", req.body); // Log request data
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    console.log("User Created:", newUser);
    res.json({ message: "Registration successful", token: generateToken(newUser._id) });
  } catch (error) {
    console.error("Backend Error:", error);  // Log full backend error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
