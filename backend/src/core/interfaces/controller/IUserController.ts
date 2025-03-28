import { RequestHandler } from "express"

export interface IUserController {
    updateProfile:RequestHandler
    changePassword:RequestHandler
    getUserProfile:RequestHandler
    becomeInstructor:RequestHandler
}