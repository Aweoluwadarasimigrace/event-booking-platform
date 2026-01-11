"use client";

import useEventStore from "@/store/getEvent";
import React, { useEffect, useState } from "react";
import { isEventEnded } from "./(components)/EventEnded";

const Events = () => {
  const { event, loading, error, fetchEvent, totalPages } = useEventStore();
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchEvent(page);
  }, [page]);

  return (
    <div>
      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}

      {event && event.length === 0 && !loading && <p>No events found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {event &&
          event.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
            >
              {/* Image */}
             <div className="flex flex-col sm:flex-row gap-4">
  <img
    src={evt.image}
    alt={evt.title}
    className="w-full sm:w-48 h-48 object-cover rounded-lg"
  />

  <div className="flex flex-col gap-2">
    {evt.isVirtual ? (
      <span className="inline-block w-fit px-3 py-1 bg-amber-100 text-amber-800 text-xs sm:text-sm font-medium rounded-full">
        Virtual
      </span>
    ) : (
      <span className="inline-block w-fit px-3 py-1 bg-amber-100 text-amber-700 text-xs sm:text-sm font-medium rounded-full">
        Physical
      </span>
    )}

    <p className="text-base sm:text-lg font-semibold">
      {evt.title}
    </p>

    {isEventEnded(evt.endDate, evt.endTime) ? (
      <span className="text-xs sm:text-sm font-medium text-red-500">
        Event Ended
      </span>
    ) : (
      <span className="text-xs sm:text-sm font-medium text-green-600">
        Event Ongoing
      </span>
    )}
  </div>
</div>

            </div>
          ))}
      </div>
      {page < (totalPages || 0) && (
        <button onClick={() => setPage(page + 1)} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Events;
