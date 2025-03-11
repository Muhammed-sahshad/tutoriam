import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      await authService.register(name, email, password);
      res.status(200).json({ message: "otp send to your email" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      console.log(email, otp)
      const response = await authService.verifyOtp(email, otp);

      const { refreshToken, ...newUser } = response;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      console.log(error)
    }
  }

  static async resendOtp(req: Request, res: Response){
    try {
      const {email} = req.body
      await authService.resendOtp(email)
      res.status(200).json({message:'otp resend to your email'})
    } catch (error:any) {
      res.status(400).json({error:error.message})
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const { refreshToken, ...user } = await authService.login(
        email,
        password,
        role
      );
      
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        res.status(403).json({ error: "Refresh tokekn required" });

      const {role} = req.body 
      const { accessToken, user } =
        await authService.refreshAccessToken(refreshToken,role);
      res.status(200).json({ accessToken, user });
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  }

  static async logout(req:Request, res:Response){
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({message : 'Logged out successfully'})
    } catch (error:any) {
      res.status(500).json({message : 'something went wrong while logging out'})
    }
  }
}
