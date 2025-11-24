import { fetchEventCreated } from "@/service/eventService";
import { create } from "zustand";

type Ticket = {
  type: string;
  quantity: number;
};

type EventData = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  format: string;
  isVirtual: boolean;
  location: string | null;
  meetingLink: string | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  meridiem: string;
  tickets?: Ticket[];
};

type eventStore = {
  event: EventData[] | null;
  loading: boolean;
  totalPages?: number;
  totalEvents?: number;
  error: string | null;
  fetchEvent: (page: number) => Promise<void>;
};

const useEventStore = create<eventStore>((set) => ({
  event: null,
  loading: false,
  error: null,
  fetchEvent: async (page: number) => {
      set({ loading: true, error: null });
    try {
        const eventData = await fetchEventCreated({ page });
        set({ event: eventData.events, totalPages: eventData.totalPages, totalEvents: eventData.totalEvents, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ loading: false, error: error.message });
      }

    }
  },
}));

export default useEventStore;
