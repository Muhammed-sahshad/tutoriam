import { User } from "../models/User";

export class AdminRepository {
    async getUsers(){
      return User.find({role:'user'})
    }
}