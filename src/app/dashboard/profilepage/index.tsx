"use client"

import useUserStore from '@/store/getCurrentUser'
import React, { useEffect } from 'react'

const Profilepage = () => {

    const {user, loading, error, fetchUser} = useUserStore()



    useEffect(() => {
     fetchUser()
    
     
    }, [])
    
  return (
    <div>

        <p>{user?.firstname}</p>
    </div>
  )
}

export default Profilepage