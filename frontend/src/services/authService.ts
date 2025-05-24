import axios from "axios";
import { setAuthData, logout } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import apiClient from "@/lib/axios";
import { clearCart } from "@/redux/slices/cartSlice";
import { clearNotifications } from "@/redux/slices/notificationSlice";
import { clearChat } from "@/redux/slices/chatSlice";
import { clearInstructor } from "@/redux/slices/instructorSlice";
import { clearMessage } from "@/redux/slices/messageSlice";

// const API_URL = import.meta.env.VITE_API_BASE_URL

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await apiClient.post("auth/register", { name, email, password });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const verifyOtp = async (email: string, otp: string, dispatch: AppDispatch) => {
  try {
    const response = await apiClient.post(`auth/verify-otp`, { email, otp });

    dispatch(
      setAuthData({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
    localStorage.setItem("isAuthenticated", "true");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const resendOtp = async (email: string) => {
  try {
    const response = await apiClient.post(`auth/resend-otp`, { email });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        if (error.message === "Network Error") {
          throw new Error("No internet connection. Please check your network.");
        }
        throw new Error("Network error. Please try again.");
      }
      throw new Error(error.response.data.message || "Something went wrong");
    }
    
    console.error("Unexpected error:", error);
    throw new Error("Unexpected error occurred");
  }
};

export const adminLogin = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    const response = await apiClient.post(`auth/admin/login`, { email, password });
    dispatch(
      setAuthData({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
    localStorage.clear();
    localStorage.setItem("isAuthenticated", "true");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const login = async (email: string, password: string, dispatch: AppDispatch) => {
  try {
    const response = await apiClient.post(`auth/login`, { email, password });

    dispatch(
      setAuthData({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
    localStorage.clear();
    localStorage.setItem("isAuthenticated", "true");
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const userLogout = async (dispatch: AppDispatch) => {
  try {
    const response = await apiClient.post(`auth/logout`, {}, { withCredentials: true });
    if (response.status === 200){
      dispatch(logout());
      dispatch(clearCart());
      dispatch(clearNotifications())
      dispatch(clearChat())
      dispatch(clearInstructor())
      dispatch(clearMessage())
    } 

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("error while logging out");
  }
};

export const refreshToken = async (dispatch: AppDispatch) => {
  try {
    const isAdmin = localStorage.getItem("adminLoggedIn");
    let data = { role: "user" };
    if (isAdmin === "true") {
      data = { role: "admin" };
    }
    const response = await apiClient.post(`auth/refresh-token`, data, { withCredentials: true });

    dispatch(
      setAuthData({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
    return response.data.user;
  } catch (error) {
    console.log(error);
    dispatch(logout());
    throw new Error("Session expired. Please log in again.");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await apiClient.post(`auth/forgot-password`, { email });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await apiClient.post(`auth/reset-password`, { token, newPassword });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const googleLogin = () => {
  window.location.href = `/api/auth/google`;
};
