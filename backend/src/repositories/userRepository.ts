import { IUser, User } from "../models/User";

export class UserRepository{
    async updateById(userId: string,
        updateData: Partial<IUser>){
          return  await User.findByIdAndUpdate(userId, updateData, {new:true})
        }
}