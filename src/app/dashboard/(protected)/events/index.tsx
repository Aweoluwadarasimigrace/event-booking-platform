"use client"
import useEventStore from '@/store/getEvent';
import React, { useEffect, useState } from 'react'

const Events = () => {

  const { event, loading, error, fetchEvent , totalEvents, totalPages} = useEventStore();
const [page, setPage] = useState(1);
  useEffect(() => {
    fetchEvent(page);

  }, [page]);
  console.log(event);
  console.log(loading);
  console.log(error);


  if(event?.length === 0){
    return <p>No events found.</p>
  }

  return (
    <div>
      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}

      {event && event.map((evt) => (
        <div key={evt.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h2>{evt.title}</h2>
          <p>{evt.description}</p>
          <p>Date: {evt.startDate}</p>
          <p>Time: {evt.startTime}</p>
          <p>Location: {evt.location}</p>
        </div>
      ))}
      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
    
  )
}

export default Events