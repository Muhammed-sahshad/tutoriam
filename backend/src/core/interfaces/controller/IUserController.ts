import { Request, Response } from "express"
import { AuthRequest } from "../../../types/custom"

export interface IUserController {
    updateProfile(req: AuthRequest, res: Response):Promise<void>
    changePassword(req: Request, res: Response):Promise<void>
    getUserProfile(req: AuthRequest, res: Response):Promise<void>
    becomeInstructor(req:AuthRequest, res:Response):Promise<void>
}