import React from "react";
import Events from ".";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold mb-4">Events Page</h1>
        <button className="bg-amber-500 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </div>
      <Events />
    </div>
  );
};

export default page;
