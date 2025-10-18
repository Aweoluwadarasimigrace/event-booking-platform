"use client";

import Loading from "@/app/Loading";
import useUserStore from "@/store/getCurrentUser";
import React, { useEffect, useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import { toast } from "sonner";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
};

const Profilepage = () => {
  const { user, loading, error, fetchUser, updateUser } = useUserStore();
  const [formData, setformData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });
  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateUser(formData);
      toast.success("profile updated successfully");
    } catch (error) {
      toast.error("couldn't update try again");
    }
  };

  return (
    <div>
      <div>
        <h1 className="border-b">Acoount</h1>
      </div>

      <div>
        <h1>Personal details</h1>
      </div>

      <form className="mt-6" onSubmit={submitForm}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {/* email */}

          <div>
            <div className="flex items-center gap-0.5 text-center">
              <LuAsterisk className="text-[#fc6435] text-xs" />
              <label
                className="block text-[14px] font-[500] mb-2 mt-4"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <input
              value={user?.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          {/* firstname */}

          <div>
            <div className="flex items-center gap-0.5 text-center">
              <LuAsterisk className="text-[#fc6435] text-xs" />
              <label
                className="block text-[14px] font-[500] mb-2 mt-4"
                htmlFor="firstname"
              >
                firstname
              </label>
            </div>
            <input
              value={user?.firstname || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]"
              type="text"
              name="firstname"
              placeholder="Enter your firstname"
            />
          </div>
          {/* lastname */}

          <div>
            <div className="flex items-center gap-0.5 text-center">
              <LuAsterisk className="text-[#fc6435] text-xs" />
              <label
                className="block text-[14px] font-[500] mb-2 mt-4"
                htmlFor="lastname"
              >
                lastname
              </label>
            </div>
            <input
              value={user?.lastname || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]"
              type="text"
              name="lastname"
              placeholder="Enter your lastname"
            />
          </div>

          {/* lastname */}
          <div>
            <div className="flex items-center gap-0.5 text-center">
              <LuAsterisk className="text-[#fc6435] text-xs" />
              <label
                className="block text-[14px] font-[500] mb-2 mt-4"
                htmlFor="contact"
              >
                phone number
              </label>
            </div>
            <input
              value={user?.contact || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]"
              type="text"
              name="contact"
              placeholder="Enter your contact"
            />
          </div>
        </div>
 <div className="px-6 py-4 rounded-b-xl flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#fc6435] hover:bg-[#fc6435] text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all"
                  >
                   
                   {loading ? <Loading /> : "Save Changes" } 
                  </button>
                </div>
      </form>
    </div>
  );
};

export default Profilepage;
