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
        <div className='flex justify-between items-center mb-10 border-b pb-4 border-gray-300'>
            {headerItems.map(({item, path}) => (
                <p key={path} className={path === pathName ? 'font-bold' : ''}>
                    <Link href={path}>{item}</Link>
                </p>
            ))}
        </div>
    </div>
  )
}

export default Header