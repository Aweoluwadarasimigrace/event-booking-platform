"use client"

import { apiClient } from "@/app/lib/client"


export const fetchCurrentUser = async()=>{
    try {
        const res = await apiClient.get("/api/user")
        return res.data.user
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}