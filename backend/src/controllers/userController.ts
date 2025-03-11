import { Request, Response } from "express";
import { AuthRequest } from "../types/custom";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary";
import { error } from "console";
import { UserService } from "../services/userService";
const userService = new UserService();
export class UserController {
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { name, title } = req.body;
      if (req.file) {
        const result = cloudinary.uploader
          .upload_stream({ folder: "profile_image" }, async (error, result) => {
            if (error) res.status(500).json({ error: error.message });
            if (result) {
              const updateData = {
                profileImageUrl: result.secure_url,
                name,
                title,
              };
              const response = await userService.updateUser(userId, updateData);
              res
                .status(200)
                .json({ message: "user updated successfully", user: response });
            }
          })
          .end(req.file.buffer);
      } else {
        const updateData = {
            name, title
        }
        const response = await userService.updateUser(userId, updateData);
        res
          .status(200)
          .json({ message: "user updated successfully", user: response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error})
    }
  }
}
