import Event from "@/app/api/model/event.model";
import Ticket from "@/app/api/model/ticket.model";
import { connectDB } from "@/app/utils/connect";
import { verifyToken } from "@/app/utils/middleware";
import { ParamType } from "@/type";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req: NextRequest, { params }: ParamType) => {
  try {
    await connectDB();
    const user = await verifyToken(req);
    const { id: eventId } = await params;

    const body = await req.json();

    // 🔁 Normalize payload (single or multiple)
    let tickets: any[] = [];

    if (Array.isArray(body.tickets)) {
      tickets = body.tickets;
    } else if (body.name) {
      tickets = [body];
    } else {
      return NextResponse.json(
        { message: "Invalid ticket payload" },
        { status: 400 }
      );
    }

    if (tickets.length === 0) {
      return NextResponse.json(
        { message: "At least one ticket is required" },
        { status: 400 }
      );
    }

    // 🔍 Check event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // 🔐 Authorization
    if (event.createdBy.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "Not authorized to create tickets for this event" },
        { status: 403 }
      );
    }

    const createdTickets = [];

    for (const t of tickets) {
      if (!t.name || !t.quantity || t.quantity <= 0) {
        return NextResponse.json(
          { message: "Invalid ticket data" },
          { status: 400 }
        );
      }

      const ticket = await Ticket.create({
        eventId,
        eventOwnerId: user._id,
        name: t.name,
        isPaid: t.isPaid ?? true,
        price: t.isPaid ? t.price || 0 : 0,
        quantity: t.quantity,
        
        limitPerUser: t.limitPerUser || 5,
      });

      event.tickets.push(ticket._id);
      createdTickets.push(ticket);
    }

    await event.save();

    return NextResponse.json(
      {
        message: "Ticket(s) created successfully",
        Ticket: createdTickets,
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