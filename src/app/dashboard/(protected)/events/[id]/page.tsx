import React from 'react'
import { fetchSingleEvent } from '../hooks/fetchSingleEvent';
import DisplaySingleEvent from '.';

const Page = async ({params}: {params: {id: string}}) => {
    const { id } = params;
    console.log(id)
    const event = await fetchSingleEvent(id);
  return (
    <div>
        <DisplaySingleEvent event={event} />
    </div>
  )
}

export default Page