import React from "react";
import Events from ".";
import Header from "./(components)/Header";
import Link from "next/link";
import CreateEvent from "./createevent";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold mb-4">Events Page</h1>
      <Link href="/dashboard/events/createevent" className="bg-[#fc6435] text-white px-4 py-2 rounded hover:bg-amber-100 hover:text-amber-500 font-semibold">Create Event</Link>
      </div>
      <Header />
      <Events />
    </div>
  );
};

export default page;
