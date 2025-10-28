import Event from "@/app/api/model/event.model";
import Ticket from "@/app/api/model/ticket.model";
import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";


type ParamsType = {
    params: {id: string};
}

export const PATCH = async(request: NextRequest, {params}: ParamsType)=>{
    
    try {
        await connectDB();
        const user = await verifyToken(request);
        const {id} = params;
        const body = await request.json()
 const event = await Event.findOne({ _id: id, createdBy: user._id });
        

  if (!event) {
      return NextResponse.json({ message: "Event not found or unauthorized" }, { status: 404 });
    }

     const now = new Date();
    if (new Date(event.endDate) < now) {
      return NextResponse.json(
        { message: "Cannot update an event that has already ended" },
        { status: 400 }
      );
    }

 const ticketsWithBuyers = await Ticket.find({
      eventId: id,
      buyers: { $exists: true, $not: { $size: 0 } },
    });

    // If there are buyers, restrict date/location changes
    if (ticketsWithBuyers.length > 0) {
      const restrictedFields = ["startDate", "endDate", "location"];
      for (const field of restrictedFields) {
        if (body[field] && body[field] !== event[field]) {
          return NextResponse.json(
            { message: `Cannot change ${field} after tickets have been purchased` },
            { status: 400 }
          );
        }
      }
    }


     const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
    
  } catch (error: unknown) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}