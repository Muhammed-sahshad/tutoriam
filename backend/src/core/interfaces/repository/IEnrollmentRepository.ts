import { FilterQuery } from "mongoose";
import { IEnrollment } from "../../../models/Enrollment";
import { IBaseRepository } from "./IBaseRepository";

export interface IEnrollmentRepository extends IBaseRepository<IEnrollment>{
    getEnrollmentsWithPagination(filter:FilterQuery<IEnrollment>, skip:number, limit:number): Promise<IEnrollment[]>
    isUserEnrolled(userId:string, courseId:string): Promise<boolean>
    createEnrollment(userId: string, courseId: string, totalLessons: number): Promise<IEnrollment>;
    findEnrollmentsByUser(userId: string): Promise<IEnrollment[]>;
    updateLessonCompletion(userId: string, courseId: string, lessonId: string): Promise<IEnrollment | null>;
    updateLastVisitedLesson(filter: FilterQuery<IEnrollment>, lessonId: string): Promise<IEnrollment | null>
  }