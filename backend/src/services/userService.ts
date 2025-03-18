import { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/userRepository";
import { IUserService } from "../core/interfaces/service/IUserService";

const userRepository = new UserRepository();

export class UserService implements IUserService {
  async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser > {
    try {
      const user = await userRepository.updateById(userId, updateData);
      if (!user) {
        throw new Error("cannot update user. please try again");
      }
      return user;
    } catch (error) {
      throw new Error("error while updating user");
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ):Promise<IUser> {
    try {
      const user = await userRepository.findUserById(userId);
      if (!user) throw new Error("invalid userId");

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) throw new Error("incorrect current password");

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await userRepository.updateById(userId, { password: hashedPassword });
      if(!updatedUser){
        throw new Error("cannot changed password. please try again")
      }
      return updatedUser
    } catch (error) {
      throw new Error("error while changing password");
    }
  }

  async getUserProfile(userId: string):Promise<IUser> {
    try {
      const user = await userRepository.findUserById(userId);
      if (!user) {
        throw new Error("invalid userId");
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("error while fetching user");
    }
  }


}
