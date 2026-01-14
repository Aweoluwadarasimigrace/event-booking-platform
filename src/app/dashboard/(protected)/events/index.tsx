"use client";

import useEventStore from "@/store/getEvent";
import React, { useEffect, useState } from "react";
import { isEventEnded } from "./(components)/EventEnded";
import { PiTicketLight } from "react-icons/pi";
import Link from "next/link";

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
           <Link href={`/dashboard/events/${evt._id}`}>
             <div
              key={evt._id}
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
                    <span className="inline-block w-fit px-3 py-1 bg-amber-50 text-amber-600 text-[10px] sm:text-sm font-medium rounded-full">
                      Virtual
                    </span>
                  ) : (
                    <span className="inline-block w-fit px-2 py-1 bg-amber-50 text-amber-600 text-[10px] sm:text-sm font-medium rounded-full">
                      Physical
                    </span>
                  )}

                  <p className="text-base sm:text-lg font-semibold">
                    {evt.title}
                  </p>

                  {isEventEnded(evt.endDate, evt.endTime) ? (
                    <span className="text-[10px] sm:text-sm font-medium text-red-500">
                      Event Ended
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-sm font-medium text-green-600">
                      Event Ongoing
                    </span>
                  )}
                  <div>
                    <PiTicketLight />
                    <span className="text-sm ml-1">{evt.ticketSold || 0}</span>
                  </div>
                  <p className="text-gray-400 text-sm">ticket sold</p>
                </div>
              </div>
            </div>
           </Link>
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
