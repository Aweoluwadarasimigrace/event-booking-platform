import Event from "@/app/api/model/event.model";
import Ticket from "@/app/api/model/ticket.model";
import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: { id: string };
};

export const POST = async (req: NextRequest, { params }: ParamsType) => {
  try {
    await connectDB();
    const user = await verifyToken(req);
    const { id: eventId } = params;
    const body = await req.json();

    const { name, isPaid, price, quantity, limitPerUser } = body;

    // Validation
    if (!name || quantity <= 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Authorization check
    if (event.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        {
          message:
            "You are not authorized to create tickets for this event",
        },
        { status: 403 }
      );
    }

    // Create new ticket
    const ticket = await Ticket.create({
      eventId,
      eventOwnerId: user._id,
      name,
      isPaid: isPaid ?? true,
      price: isPaid ? price || 0 : 0,
      quantity,
      limitPerUser: limitPerUser || 5,
    });

    // Add ticket ID to event
    event.tickets.push(ticket._id);
    await event.save();

    return NextResponse.json(
      {
        message: "Ticket created successfully",
        ticket,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { message: "Error creating ticket", error: error.message },
      { status: 500 }
    );
  }
};