import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { Instructor } from "../models/Instructor";

@injectable()
export class InstructorController implements IInstructorController {
 
    constructor(@inject(TYPES.InstructorService) private instructorService:IInstructorService){}

    getInstructorApplications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const instructorApplications = await this.instructorService.getInstructorApplications();
        res.status(StatusCodes.OK).json({ instructorApplications, message: "applications fetched successfully" });
      });

    getInstructorProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
      console.log('hi')
      const {id } = req.query
      if(!id){
        res.status(400)
      }
      const instructor = await this.instructorService.getInstructorProfile(id as string)
      res.status(StatusCodes.OK).json({message: "instructor profile fetched successfully", instructor})
    })

}