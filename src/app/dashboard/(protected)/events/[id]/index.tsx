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
    console.log(event)
  return (
    <div>
       hi
    </div>
  )
}

export default DisplaySingleEvent