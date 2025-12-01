"use client"

import React from 'react'
import Multiform from './Multiform'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

const CreateEvent = () => {
  return (
    <div>
       <div className='flex items-center gap-2 mb-4 text-amber-500 hover:text-amber-700 cursor-pointer'>
        <IoIosArrowBack />
         <Link href="/dashboard/events" className="text-black">back</Link>
       </div>
        <Multiform />
    </div>
  )
}

export default CreateEvent