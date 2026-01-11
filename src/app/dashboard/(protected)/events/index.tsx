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
              <div className="flex">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-48 h-48 mb-4"
                />
                <div className="ml-4">
                  {evt.isVirtual ? (
                    <span className="ml-4 px-2 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full self-start">
                      Virtual
                    </span>
                  ) : (
                    <span className="ml-4 px-2 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full self-start">
                      Physical
                    </span>
                  )}
                  <p className="text-lg font-semibold mt-2 mb-2">{evt.title}</p>
                  {isEventEnded(evt.endDate, evt.endTime) ? (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                      Event Ended
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
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
