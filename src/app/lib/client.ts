import axios, { InternalAxiosRequestConfig } from "axios";


const baseURL = process.env.BASE_URL;

export const apiClient = axios.create({
    baseURL,
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig)=>{
    const token = sessionStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


apiClient.interceptors.response.use((response)=> response,

    (error)=>{
        if(error.response?.status === 401){
            window.location.href = "/auth/login"
        }
        return Promise.reject(error)
    }
)