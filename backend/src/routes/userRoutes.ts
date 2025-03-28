import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/user.controller";
import upload from "../middlewares/upload";
import container from "../di/container";
import { IUserController } from "../core/interfaces/controller/IUserController";
import { TYPES } from "../di/types";


const router = express.Router();

const userController = container.get<IUserController>(TYPES.UserController)

router.use(authMiddleware);
router.get("/profile", userController.getUserProfile)
router.put(
  "/profile",
  upload.single("profileImage"),
  userController.updateProfile
);
router.patch("/:userId/change-password", userController.changePassword)
router.post("/:userId/become-instructor",upload.single("idCardImage"), userController.becomeInstructor)

export default router;
