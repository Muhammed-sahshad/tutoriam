import api from "@/utils/axiosInstance"

const API_URL = "http://localhost:5000/api/admin";

export const getUsers = async () =>{
    const response = await api.get(
        `${API_URL}/users`,
        {withCredentials:true}
    )
    return response
}

export const toggleUserStatus = async (userId:string) =>{
    try {
        const response = await api.patch(
            `${API_URL}/users/${userId}/toggle-status`,
            {},
            {withCredentials:true}
        )
    
        return response
    } catch (error:any) {
        console.log(error)
        return error.response
    }
}