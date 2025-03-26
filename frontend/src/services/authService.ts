import axios from "axios";
import { setAuthData, logout } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import apiClient from "@/utils/axiosInstance";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      { name, email, password },
      { withCredentials: true }
    );

    return response;
  } catch (error:any) {
    return error.response
  }
};

export const verifyOtp = async (email: string, otp: string, dispatch: AppDispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/verify-otp`,
      { email, otp },
      { withCredentials: true }
    );

    dispatch(
      setAuthData({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
    localStorage.setItem("isAuthenticated" , "true")
    return response;
  } catch (error:any) {
    return error.response
  }
};

export const resendOtp = async (email:string) => {
  try {
    const response = await axios.post(
      `${API_URL}/resend-otp`,
      {email},
      {withCredentials:true}
    )

    return response
  } catch (error) {
    
  }
}

export const login = async (
  email: string,
  password: string,
  role:string,
  dispatch: AppDispatch
) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password,role },
      { withCredentials: true }
    );
  
    dispatch(
      setAuthData({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
    localStorage.clear()
    localStorage.setItem("isAuthenticated" , "true")
    return response
  } catch (error:any) {
    return error.response
  }
};

export const userLogout = async (dispatch:AppDispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {withCredentials:true}
    )
    if(response.status === 200)
      dispatch(logout())

    return response
  } catch (error) {
    console.error(error)
    throw new Error('error while logging out')
  }
}

export const refreshToken = async (dispatch: AppDispatch) => {
  try {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const isAdmin = localStorage.getItem("adminLoggedIn")
    let data = {role:'user'}
    if(isAuthenticated === 'true'){
      if(isAdmin === 'true'){
        data = {role:'admin'}
      }
    const response = await axios.post(
      `${API_URL}/refresh-token`,
      data,
      { withCredentials: true }
    );

    dispatch(
      setAuthData({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    );
    return response.data.accessToken;
  }
  throw new Error("Session expired. Please log in again")
  } catch (error) {
    console.log(error)
    dispatch(logout());
    throw new Error("Session expired. Please log in again.");
  }
};

export const forgotPassword = async (email:string)=>{
   try {
     const response = await apiClient.post(`auth/forgot-password`,{email})
     return response
   } catch (error:any) {
     throw error
   }
}

export const resetPassword = async (token:string, newPassword:string) => {
  try {
    const response = await apiClient.post(`auth/reset-password`, {token, newPassword})
    return response
  } catch (error:any) {
    throw error
  }
}

export const googleLogin = () => {
  window.open(`${API_URL}/google/callback`,
    "_self"
  )
}