import { Request, RequestHandler, Response } from "express"

export interface IAuthController {
    register(req: Request, res: Response):Promise<void>
    verifyOtp(req: Request, res: Response):Promise<void>
    resendOtp(req: Request, res: Response):Promise<void>
    login: RequestHandler
    refreshToken(req: Request, res: Response):Promise<void>
    logout(req:Request, res:Response):Promise<void>
    forgotPassword(req:Request, res:Response):Promise<void>
    resetPassword(req:Request, res:Response):Promise<void>
}