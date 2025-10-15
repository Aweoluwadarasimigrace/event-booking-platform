"use client";

import { fetchCurrentUser } from "@/service/authService";
import { create } from "zustand";


type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  // add any other fields your user model includes
};


type userStore={
    user: User | null,
    loading: boolean,
    error: string | null,
    fetchUser: ()=> Promise<void>
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
}));


export default useUserStore