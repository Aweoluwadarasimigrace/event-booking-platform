import { connectDB } from "@/app/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import Event from "../../model/event.model";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // Current date
    const currentDate = new Date();

    // Find all events that have ended
    const endedEvents = await Event.find({
      endDate: { $lt: currentDate },
    }).sort({ endDate: -1 }); // Sort by most recent ended

    if (!endedEvents.length) {
      return NextResponse.json(
        { message: "No ended events found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Ended events fetched successfully",
        events: endedEvents,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching ended events:", error);
    return NextResponse.json(
      { message: "Error fetching ended events", error: error.message },
      { status: 500 }
    );
  }
};
