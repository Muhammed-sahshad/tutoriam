import { IInstructor } from "../../../models/Instructor";
import { IUser } from "../../../models/User";
import { AdminDashboardStats } from "../../types/userTypes";

export interface IAdminService {
    getUsers(): Promise<IUser[]>;
    toggleUserStatus(userId: string): Promise<IUser|null>;
    // reviewTutorApplication(tutorId: string, status: string, reason?: string) :Promise<IInstructor|null>
     getDashboardDetails():Promise<AdminDashboardStats>
  }