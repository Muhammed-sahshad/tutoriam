import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

const adminService = new AdminService();
export class AdminController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await adminService.getUsers();
      if (!users) res.status(404).json({ message: "users not found" });

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  }
}
