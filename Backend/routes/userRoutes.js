import express from "express";
import { register, login, logout, protect, getUserProfile, updateUserProfile, changePassword,verifyEmail  } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", protect, getUserProfile); // ✅ fixed
router.put("/profile", protect, updateUserProfile);
router.put('/profile/password', protect, changePassword);
router.get("/verify-email/:token", verifyEmail);

export default router;