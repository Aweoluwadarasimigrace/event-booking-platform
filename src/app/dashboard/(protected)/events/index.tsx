"use client";

import useEventStore from '@/store/getEvent';
import React, { useEffect, useState } from 'react';

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

     <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
       {event && event.map((evt) => (
       <div
      key={evt.id}
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
    >
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        {evt.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4">
        {evt.description}
      </p>

      {/* Meta info */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">📅 Date:</span> {evt.startDate}
        </p>
        <p>
          <span className="font-medium">⏰ Time:</span> {evt.startTime}
        </p>
        <p>
          <span className="font-medium">📍 Location:</span> {evt.location}
        </p>
      </div>
    </div>
      ))}

     </div>
      {page < (totalPages || 0) && (
        <button onClick={() => setPage(page + 1)} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Events;
