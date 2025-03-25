import { Course } from "../models/Course";

export const TYPES = {
  // Controllers
  AdminController: Symbol.for("AdminController"),
  UserController: Symbol.for("UserController"),
  AuthController: Symbol.for("AuthController"),
  InstructorController: Symbol.for("InstructorController"),
  CourseController: Symbol.for("CourseController"),
  ModuleController: Symbol.for("ModuleController"),
  LessonController: Symbol.for("LessonController"),

  // Services
  AdminService: Symbol.for("AdminService"),
  UserService: Symbol.for("UserService"),
  AuthService: Symbol.for("AuthService"),
  InstructorService: Symbol.for("InstructorService"),
  CourseService: Symbol.for("CourseService"),
  ModuleService: Symbol.for("ModuleService"),
  LessonService: Symbol.for("LessonService"),

  // Repositories
  AdminRepository: Symbol.for("AdminRepository"),
  UserRepository: Symbol.for("UserRepository"),
  AuthRepository: Symbol.for("AuthRepository"),
  InstructorRepository: Symbol.for("InstructorRepository"),
  CourseRepository: Symbol.for("CourseRepository"),
  ModuleRepository: Symbol.for("ModuleRepository"),
  LessonRepository: Symbol.for("LessonRepository"),
  
};
