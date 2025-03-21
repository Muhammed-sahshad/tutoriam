import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { IAuthController } from "../core/interfaces/controller/IAuthController";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IAuthService } from "../core/interfaces/service/IAuthService";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {}
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      await this.authService.register(name, email, password);
      res.status(200).json({ message: "otp send to your email" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
      console.log(email, otp);
      const response = await this.authService.verifyOtp(email, otp);

      const { refreshToken, ...newUser } = response;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      console.log(error);
    }
  };

  resendOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authService.resendOtp(email);
      res.status(200).json({ message: "otp resend to your email" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
    const { refreshToken, ...user } = await this.authService.login(
      email,
      password,
      role
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({user});
  });

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        res.status(403).json({ error: "Refresh tokekn required" });

      const { role } = req.body;
      const { accessToken, user } = await this.authService.refreshAccessToken(
        refreshToken,
        role
      );
      res.status(200).json({ accessToken, user });
    } catch (error: any) {
      res.status(403).json({ error: error.message });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "something went wrong while logging out" });
    }
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authService.sendMagicLink(email);

      res.status(200).json({
        message: "A reset link has been sent to your email",
      });
    } catch (error: any) {
      if (error.message === "Invalid email address") {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: error.message });
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body;
      await this.authService.resetPassword(token, newPassword);
      res.status(200).json({ message: "password reseted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
