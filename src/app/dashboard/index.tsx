"use client"

import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <Link href={"/dashboard/profilepage"}>profile page</Link>
    </div>
  )
}

export default Dashboard