import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>this is landing page
        <Link href={"/dashboard"}>dashboard</Link>  
    </div>
  )
}

export default page