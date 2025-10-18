"use client";

import { apiClient } from "@/app/lib/client";


type UpdateUserData ={
  firstname?: string;
  lastname?: string;
  email?: string;
  contact?:string;
  // add other optional fields if needed
}

export const fetchCurrentUser = async () => {
  try {
    const res = await apiClient.get("/api/user");
    return res.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const UpdateUser = async (formData : UpdateUserData) => {
  try {
    const res = await apiClient.patch("/api/user/updateUser", formData);
    return res.data.user;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
