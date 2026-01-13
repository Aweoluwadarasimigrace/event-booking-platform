import { apiClient } from "@/app/lib/client";

export const fetchSingleEvent = async (id: string) => {
  try {
    const res = await apiClient.get(`/api/Event/${id}`);
    return res.data.event;
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};