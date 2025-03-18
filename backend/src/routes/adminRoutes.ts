import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AdminController } from "../controllers/AdminController";

const router = express.Router();

router.use(authMiddleware);
router.get("/users",AdminController.getUsers);
router.patch("/users/:userId/toggle-status", AdminController.toggleUserStatus)

export default router;
