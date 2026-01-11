import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";
import Event from "../model/event.model";
import Ticket from "../model/ticket.model";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    // verify the logged-in user
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1; // default page 1
    const limit = Number(searchParams.get("limit")) || 10; // default limit 10
    const skip = (page - 1) * limit;

    const totalEvents = await Event.countDocuments({ createdBy: user._id });
    // find all events created by this user
    const events = await Event.find({ createdBy: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!events || events.length === 0) {
      return NextResponse.json(
        {
          page,
          limit,
          totalEvents: 0,
          totalPages: 0,
          events: [],
          message: "No events found",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        page,
        limit,
        totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
};
