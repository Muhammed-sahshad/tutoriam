import { AdminRepository } from "../repositories/AdminRepository";

const adminRepsitory = new AdminRepository()
export class AdminService {
   async getUsers(){
    try {
        const users = await adminRepsitory.getUsers()
        return users
    } catch (error) {
        throw new Error("error while fetching all users")
    }
   }
}