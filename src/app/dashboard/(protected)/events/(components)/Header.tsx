import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='flex justify-between items-center mb-10 border-b pb-4 border-gray-300'>
            <p><Link href={""}>All Events</Link></p>
            <p><Link href={""}>ongoing events</Link></p>
            <p><Link href={""}>ended events</Link></p>
        </div>
    </div>
  )
}

export default Header