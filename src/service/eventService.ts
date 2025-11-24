import { apiClient } from "@/app/lib/client"

type pageParams = {
    page?: number;
}
export const fetchEventCreated = async({ page }: pageParams) => {
    try {
        const res = await apiClient.get(`/api/Event?page=${page || 1}&limit=10`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.error("Error fetching Events", error)
    }
}