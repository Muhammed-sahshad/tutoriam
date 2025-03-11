import { updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import api from "@/utils/axiosInstance";
// import axios from "axios"

const API_URL = "http://localhost:5000/api/user";

export const updateProfile = async (formData: FormData, dispatch:AppDispatch) => {
  const response = await api.put(`${API_URL}/profile`, formData, {
    withCredentials: true,
  });
  dispatch(
        updateUser({
            user:response.data.user
        })
      );
};
