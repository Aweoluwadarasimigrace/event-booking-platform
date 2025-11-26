"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathName = usePathname();
    const headerItems = [
        {item: "All Events", path: "/dashboard/events"},
        {item: "ongoing events", path: "/dashboard/events/ongoing"},
        {item: "ended events", path: "/dashboard/events/ended"},
    ];
  return (
    <div>
        <div className='flex gap-3 items-center mb-10 border-b pb-4 border-gray-300'>
            {headerItems.map((menu, index) => (
                <p key={index} className={menu.path === pathName ? 'font-bold' : ''}>
                    <Link href={menu.path}>{menu.item}</Link>
                </p>
            ))}
        </div>
    </div>
  )
}

export default Header