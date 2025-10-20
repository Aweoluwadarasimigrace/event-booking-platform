
import { apiClient } from "@/app/lib/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
 const Router = useRouter();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("token");
      const res = await apiClient.post("api/user/logout");
      console.log(res.data)
      toast.success(res.data.message);
     Router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to logout, Try Again Later");
    }
  };

  return {
    handleLogout
  };
};
