import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRepository } from "../repositories/AuthRepository";
import { sendOtpEmail } from "../utils/emailServices";
import { RedisClient } from "../config/redis";

dotenv.config();

const authRepository = new AuthRepository();

export class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const otp = this.generateOtp();

    const hashedPassword = await this.hashPassword(password);

    await sendOtpEmail(email, otp);

    await RedisClient.setex(`otp:${email}`, 150, JSON.stringify({ otp }));

    await RedisClient.setex(
      `user_session:${email}`,
      600,
      JSON.stringify({ name, email, hashedPassword })
    );
  }

  async verifyOtp(email: string, otp: string) {
    const data = await RedisClient.get(`otp:${email}`);
    if (!data) throw new Error("OTP expired or invalid");

    const { otp: storedOtp } = JSON.parse(data);
    if (otp !== storedOtp) throw new Error("Invalid OTP");

    const userData = await RedisClient.get(`user_session:${email}`);
    if (!userData) throw new Error("User data not found Please register again");

    const { name, hashedPassword } = JSON.parse(userData);

    const user = await authRepository.createUser(name, email, hashedPassword);

    const accessToken = this.generateAccessToken(user._id as string);
    const refreshToken = this.generateRefreshToken(user._id as string);

    await RedisClient.del(`otp:${email}`);
    await RedisClient.del(`user_session:${email}`);

    return { accessToken, refreshToken, user };
  }

  async resendOtp(email: string) {
    try {
      const user = await RedisClient.get(`user_session:${email}`);
      if (!user) throw new Error("user session expired please register again");

      const otp = this.generateOtp();

      await sendOtpEmail(email, otp);

      await RedisClient.setex(`otp:${email}`, 120, JSON.stringify({ otp }));
    } catch (error: any) {
      console.error(error);
      throw new Error(`error while resending otp:${error}`);
    }
  }

  async login(email: string, password: string, role: string) {
    let user;
    if (role === "admin") user = await authRepository.findAdminByEmail(email);
    else user = await authRepository.findUserByEmail(email);

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return { accessToken, refreshToken, user };
  }

  async refreshAccessToken(refreshToken: string, role: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as { userId: string };

      const newAccessToken = this.generateAccessToken(decoded.userId);
      let user;
      if (role === "admin")
        user = await authRepository.findAdminById(decoded.userId);
      else user = await authRepository.findUserById(decoded.userId);
      return { accessToken: newAccessToken, user };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  private generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
  }

  private generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  }

  private generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
