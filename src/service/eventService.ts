import { apiClient } from "@/app/lib/client";

type pageParams = {
  page?: number;
};

export const fetchEventCreated = async ({ page = 1 }: pageParams) => {
  try {
    const res = await apiClient.get(`/api/Event?page=${page}&limit=10`);

    if (!res?.data) {
      throw new Error("Empty response from server");
    }
    return res.data; // contains page, limit, totalEvents, totalPages, events
  } catch (error) {
    console.error("Error fetching Events", error);
    throw error; // so your Zustand store can catch it
  }
};
