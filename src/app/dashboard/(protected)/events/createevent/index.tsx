"use client"

import React from 'react'
import Multiform from './Multiform'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

const CreateEvent = () => {
  return (
    <div>
        <Link href="/dashboard/events" className="text-black">back <IoIosArrowBack /></Link>
        <Multiform />
    </div>
  )
}

export default CreateEvent