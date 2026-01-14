import { apiClient } from "@/app/lib/client";

export const fetchSingleEvent = async (id: string) => {
  try {
    console.log(id, "fetch id")
    const res = await apiClient.get(`/api/Event/${id}`);
    console.log(res.data)
    return res.data.event;
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};