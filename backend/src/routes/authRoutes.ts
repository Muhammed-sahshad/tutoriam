import express from "express";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

const authController = new AuthController()

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password",authController.resetPassword)

export default router;
