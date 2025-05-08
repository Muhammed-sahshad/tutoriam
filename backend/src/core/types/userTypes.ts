import { IAdmin } from "../../models/Admin";
import { ICourse } from "../../models/Course";
import { IEnrollment } from "../../models/Enrollment";
import { IInstructor } from "../../models/Instructor";
import { IOrder } from "../../models/Order";
import { IUser } from "../../models/User";

export interface verifiedUer {
  accessToken: string;
  refreshToken: string;
  user: IUser | IAdmin;
}

export interface refreshedUser {
  accessToken: string;
  user: IUser | IAdmin;
}

export interface AdminDashboardStats {
  totalUsers: number | null;
  totalTutors: number | null;
  totalCourses: number | null;
}

export interface PaginatedCoursesResponse {
  totalCourses: number;
  totalPages: number;
  currentPage: number;
  courses: ICourse[] | null;
}

export interface PaginatedInstructorsResponse {
  totalInstructors: number;
  totalPages: number;
  currentPage: number;
  instructors: IInstructor[] | null;
}

export interface DashboardData {
  enrolledCourses: number
  activeCourses: number
  completedCourses: number
  instructors: number
  enrollments: IEnrollment[] | null
}

export interface PaginatedUsersResponse {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  users: IUser[] | null;
}

export interface PaginatedOrdersResponse {
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  orders: IOrder[] | null;
}

export interface EnrolledStudent {
  user: Partial<IUser>;
  enrollmentDate: Date;
}
