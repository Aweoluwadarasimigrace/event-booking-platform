import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";
import Event from "../../model/event.model";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      title,
      description,
      category,
      format,
      country,
      isVirtual,
      location,
      meetingLink,
      startDate,
      endDate,
      startTime,
      endTime,
      meridiem,
    } = body;

    if (
      !title ||
      !category ||
      !format ||
      !startDate ||
      !endDate ||
      !startTime ||
      !endTime ||
      !meridiem
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title,
      description,
      image:
        "https://res.cloudinary.com/datfugth6/image/upload/v1761205537/downloadss_y8c47e.jpg",
      category,
      format,
      isVirtual,
      location: isVirtual ? null : location,
      meetingLink: isVirtual ? meetingLink : null,
      startDate,
      endDate,
      startTime,
      endTime,
      meridiem,
      createdBy: user._id,
    });

    return NextResponse.json(
      { message: "Event created successfully", event },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating event", error },
      { status: 500 }
    );
  }
};
