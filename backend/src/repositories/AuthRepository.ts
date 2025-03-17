import { Admin } from "../models/Admin";
import { User } from "../models/User";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return User.findOne({ email });
  }

  async findAdminByEmail(email:string){
    return Admin.findOne({email})
  }

  async createUser(name: string, email: string, hashedPassword: string) {
    return User.create({ name, email, password: hashedPassword });
  }

  async findUserById(id:string){
    return User.findOne({ _id: id, status: 'active' })
  }

  async findAdminById(id:string){
    return Admin.findById(id)
  }

  async updateUserPassword(id:string, password:string){
    return User.findByIdAndUpdate(id,{password}, {new:true})
  }
  
}
