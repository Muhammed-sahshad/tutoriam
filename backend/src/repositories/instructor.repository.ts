import mongoose, { ObjectId } from "mongoose";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { IInstructor, Instructor } from "../models/Instructor";

export class InstructorRepository implements IInstructorRepository {
  createInstructor = async (instructor: any): Promise<IInstructor | null> => {
    instructor.userId = new mongoose.Types.ObjectId(
      instructor.userId as string
    );

    return await Instructor.create(instructor);
  };

  getInstructorApplications = async (): Promise<IInstructor[] | null> => {
    return await Instructor.find({
      "adminApproval.status": "pending",
    }).populate("userId");
  };

  updateInstructorStatus = async (
    id: string,
    updates: Partial<IInstructor>
  ): Promise<IInstructor | null> => {
    return await Instructor.findByIdAndUpdate(id, updates, { new: true });
  };

  getInstructors = async ():Promise<IInstructor[]  | null> => {
    return await Instructor.find({"adminApproval.status": "approved"}).populate("userId")
  }

}
