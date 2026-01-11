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
        <Link href="/dashboard/events/createevent" className="inline-flex items-center justify-center bg-[#fc6435] text-white font-semibold px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-2.5 rounded-lg hover:bg-amber-100 hover:text-amber-500 transition-colors duration-200 w-full sm:w-auto" > Create Event </Link>
      </div>
      <Header />
      <Events />
    </div>
  );
};

export default page;
