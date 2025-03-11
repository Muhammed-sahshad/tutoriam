import { IUser } from "../models/User";
import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository()

export class UserService {
  async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ) {
    return  userRepository.updateById(userId, updateData)
  }
}
