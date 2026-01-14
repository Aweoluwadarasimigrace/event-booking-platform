"use client";
import React from 'react'

type Ticket = {
name: string;        // e.g. "VIP Ticket"
  isPaid: boolean;     // true = paid, false = free
  price: number;       // price in your currency
  quantity: number;    // total tickets available
  sold: number;        // tickets sold
  limitPerUser: number; // max tickets per user
};

type EventData = {
  _id: string;
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
  ticketSold: number;
};

const DisplaySingleEvent = ({ event }: { event: EventData }) => {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="mb-2"><strong>Category:</strong> {event.category}</p>
        <p className="mb-2"><strong>Format:</strong> {event.format}</p>
        {event.isVirtual && <p className="mb-2"><strong>Location:</strong> {event.location}</p>}
        {event.meetingLink && <p className="mb-2"><strong>Meeting Link:</strong> {event.meetingLink}</p>}
    </div>
  )
}

export default DisplaySingleEvent