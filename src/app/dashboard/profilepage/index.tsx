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
  const { user, updateUser, fetchUser } = useUserStore();
       useEffect(() => {
          fetchUser();
        }, []);
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Load user data into the form once available
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact: user.contact || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUser(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Couldn't update, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white w-full h-full p-6">
      <div>
        <h1 className="border-b text-2xl font-semibold mb-10">Account</h1>
      </div>

      <div className="mt-6 font-semibold text-lg tracking-1">
        <h1>Personal details</h1>
      </div>

      <form className="mt-6" onSubmit={submitForm}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          {/* First name */}
          <div>
            <div className="flex items-center gap-0.5 text-center">
              <LuAsterisk className="text-[#fc6435] text-xs" />
              <label
                className="block text-[14px] font-[500] mb-2 mt-4"
                htmlFor="firstname"
              >
                First name
              </label>
            </div>
            <input
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]"
              type="text"
              name="firstname"
              placeholder="Enter your firstname"
            />
          </div>

          {/* Last name */}
          <div>
            <div className="flex items-center gap-0.5 text-center">
              <LuAsterisk className="text-[#fc6435] text-xs" />
              <label
                className="block text-[14px] font-[500] mb-2 mt-4"
                htmlFor="lastname"
              >
                Last name
              </label>
            </div>
            <input
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#fc6435]"
              type="text"
              name="lastname"
              placeholder="Enter your lastname"
            />
          </div>

          {/* Phone number */}
          <div>
            <div className="flex items-center gap-0.5 text-center">
              <LuAsterisk className="text-[#fc6435] text-xs" />
              <label
                className="block text-[14px] font-[500] mb-2 mt-4"
                htmlFor="contact"
              >
                Phone number
              </label>
            </div>
            <input
              value={formData.contact}
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
            disabled={isLoading}
            className="px-6 py-2.5 bg-[#fc6435] hover:bg-[#e75a2e] text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fc6435] transition-all"
          >
            {isLoading ? <Loading /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profilepage;
