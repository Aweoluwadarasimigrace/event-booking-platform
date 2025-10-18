"use client";

import { fetchCurrentUser, UpdateUser } from "@/service/authService";
import { create } from "zustand";


type User = {
  firstname: string;
  lastname: string;
  email: string;
  contact:string;
  // add any other fields your user model includes
};


type userStore={
    user: User | null,
    loading: boolean,
    error: string | null,
    fetchUser: ()=> Promise<void>
    updateUser: (formData: User)=> Promise<void>
}

const useUserStore = create<userStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });

    try {
      const userData = await fetchCurrentUser();
      set({ user: userData, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({
          error: error.message || "Failed to fetch user",
          loading: false,
        });
        console.log(error);
      }
    }
  },

  updateUser: async(formData)=>{
    set({loading: true, error: null})

    try {
        const updateData = await UpdateUser(formData)
        set({user: updateData, loading: false})
    } catch (error) {
         if (error instanceof Error) {
        set({
          error: error.message || "Failed to fetch user",
          loading: false,
        });
        console.log(error);
      }
    }
  }

}));


export default useUserStore