import api from "@/utils/axiosInstance"

const API_URL = "http://localhost:5000/api/admin";

export const getUsers = async () =>{
    const response = await api.get(
        `${API_URL}/users`,
        {withCredentials:true}
    )
    return response
}