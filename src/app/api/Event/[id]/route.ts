import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";
import Event from "../../model/event.model";



export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
     const { id } = params;
  try {
    await connectDB();
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Error fetching event" },
      { status: 500 }
    );
  }
};
