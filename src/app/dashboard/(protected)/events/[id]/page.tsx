import { idType} from '@/type'
import React from 'react'
import { fetchSingleEvent } from '../hooks/fetchSingleEvent';
// import DisplaySingleEvent from '.';

const Page = async({params}: idType) => {
    const {id} = await params
    console.log(id)
    const event = await fetchSingleEvent(id);
  return (
    <div>
        hi
        {/* <DisplaySingleEvent event={event} /> */}
    </div>
  )
}

export default Page