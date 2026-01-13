import React from "react";
import Events from ".";
import Header from "./(components)/Header";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-lg sm:text-md md:text-2xl font-bold">Events Page</h1>
        <Link href="/dashboard/events/createevent" className="border-amber-400 bg-amber-600 px-3 py-3 text-white rounded-md"> Create Event </Link>
      </div>
      <Header />
      <Events />
    </div>
  );
};

export default page;
