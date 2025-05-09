import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { IInstructor } from "../models/Instructor";

@injectable()
export class InstructorController implements IInstructorController {
  constructor(@inject(TYPES.InstructorService) private instructorService: IInstructorService) {}

  getInstructorApplications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const instructorApplications = await this.instructorService.getInstructorApplications();
    res.status(StatusCodes.OK).json({ instructorApplications, message: "applications fetched successfully" });
  });

  getInstructorProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const instructor = await this.instructorService.getInstructorProfile(userId as string);
    res.status(StatusCodes.OK).json({ message: "instructor profile fetched successfully", instructor });
  });

  updateInstrucotrProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const data: Partial<IInstructor> = req.body.data;
    console.log(data);
    const instructor = await this.instructorService.updateInstructorProfile(userId, data);
    res.status(StatusCodes.OK).json({ message: "instructor updated successfully", instructor });
  });

  getUserApplications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id;
    const applications = await this.instructorService.getUserApplications(userId as string);
    res.status(StatusCodes.OK).json({ applications, message: "applications fetched successfully" });
  });

  reviewInstructor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { instructorId } = req.params;
    const { status, reason } = req.body;
    await this.instructorService.reviewTutorApplication(instructorId, status, reason);
    res.status(StatusCodes.OK).json({ message: `instructor ${status} successfully` });
  });

  getEnrolledInstructorsForUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string;
    const { searchQuery, page = 1, limit = 12 } = req.query;

    const instructorswithPagination = await this.instructorService.getEnrolledInstructors(
      userId,
      Number(page),
      Number(limit),
      searchQuery as string
    );
    res.status(StatusCodes.OK).json({ message: "instructors fetched successfully", instructorswithPagination });
  });

  getAllInstructors = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.searchQuery as string)?.trim() || "";

    const instructorswithPagination = await this.instructorService.getAllInstructors(page, limit, search)
    res.status(StatusCodes.OK).json({ message: "instructors fetched successfully", instructorswithPagination });
  });
}
