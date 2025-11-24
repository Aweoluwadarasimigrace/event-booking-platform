"use client"
import useEventStore from '@/store/getEvent';
import React, { useEffect, useState } from 'react'

const Events = () => {

  const { event, loading, error, fetchEvent } = useEventStore();
const [page, setPage] = useState(1);
  useEffect(() => {
    fetchEvent(page);

  }, [page]);

  return (
    <div>
      {loading && <p>Loading events...</p>}



      {error && <p>Error: {error}</p>}


      {event && event.length > 0 ? (
        <div>
          {event.map((eventItem) => (
            <div key={eventItem.id}>
              <h2>{eventItem.title}</h2>
              <p>{eventItem.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
    
  )
}

export default Events