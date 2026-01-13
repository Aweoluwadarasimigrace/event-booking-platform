import { ParamType } from '@/type'
import React from 'react'
import { fetchSingleEvent } from '../hooks/fetchSingleEvent';
import DisplaySingleEvent from '.';

const page = async ({params}: ParamType) => {
    const { id } = await params;
    console.log(id)
    const event = await fetchSingleEvent(id);
  return (
    <div>
        <DisplaySingleEvent event={event} />
    </div>
  )
}

export default page