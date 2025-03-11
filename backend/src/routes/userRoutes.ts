import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";
import upload from "../middlewares/upload";

const router = express.Router();

router.use(authMiddleware);
router.put(
  "/profile",
  upload.single("profileImage"),
  UserController.updateProfile
);

export default router;
