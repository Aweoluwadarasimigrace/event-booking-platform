import { apiClient } from "@/app/lib/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type dataprops = {
  formdaata: {
    email: string;
    password: string;
  };
};
export const useLogin = () => {
  const [formdata, setformdata] = useState<dataprops["formdaata"]>({
    email: "",
    password: "",
  });
  const Router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [errors, seterrors] = useState<{ message: string }>({ message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisLoading(true);

    if (!formdata.email || !formdata.password) {
      seterrors({ message: "All fields are required" });
      setisLoading(false);
      return;
    }

    try {
      const res = await apiClient.post("/api/admin/login", formdata);
      if (res.data) {
        sessionStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        Router.push("/dashboard/events");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        toast.error(message || "Login failed");
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setisLoading(false);
    }
  };
  return {
    errors,
    isLoading,
    formdata,
    handleChange,
    handleSubmit,
  };
};
