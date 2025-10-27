import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";
import Event from "../model/event.model";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    // verify the logged-in user
    const user = await verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // find all events created by this user
    const events = await Event.find({ createdBy: user._id }).sort({
      createdAt: -1,
    });

    if (!events || events.length === 0) {
      return NextResponse.json({ message: "No events found" }, { status: 404 });
    }

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
};