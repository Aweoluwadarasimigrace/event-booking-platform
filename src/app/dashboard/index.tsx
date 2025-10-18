"use client"

import useUserStore from '@/store/getCurrentUser'
import Link from 'next/link'
import React, { useEffect } from 'react'

const Dashboard = () => {
    const {fetchUser} = useUserStore()
     useEffect(() => {
        fetchUser();
      }, []);
  return (
    <div>
        <Link href={"/dashboard/profilepage"}>profile page</Link>
    </div>
  )
}

export default Dashboard