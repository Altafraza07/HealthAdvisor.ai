import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

// JWT Token generator
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Send verification email function
const sendVerificationEmail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Email Verification",
    html: `<p>Hi ${user.name}, please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Register User with email verification token
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "Email already registered" });

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = new User({
    name,
    email,
    password,
    emailVerificationToken: verificationToken,
    isVerified: false,
  });

  await user.save();
  await sendVerificationEmail(user, verificationToken);

  res.status(201).json({
    message: "Registered successfully. Please check your email to verify your account.",
  });
};


// Verify Email Controller
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  console.log("Token received:", token); // Debug

  try {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      console.log("No user found for token"); // Debug
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    console.log("User verified:", user.email); // Debug

    res.status(200).json({
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    console.error("Error during verification:", error);
    res.status(500).json({ message: "Server error during email verification" });
  }
};

// Login User with verified check
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(401).json({ message: "Please verify your email first." });

  const isMatch = await user.matchPassword(password.trim());
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Logged In", token });
};

// Logout User
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out" });
};

// Protect Middleware
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
export const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ message: "Profile updated", user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
