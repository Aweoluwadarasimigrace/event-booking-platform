"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideBar = () => {
    const pathName = usePathname();
  const menuBar = [
    { item: "Event", path: "/dashboard/events" },
    { item: "Account", path: "/dashboard/profilepage" },
    { item: "Event", path: "/dashboard/events" },
  ];

//   const sidemenu = [
//      { item: "Event", path: "/dashboard/events" },
//     { item: "Event", path: "/dashboard/events" },
//     { item: "Event", path: "/dashboard/events" }
//   ];

 


//   const [isOpen, setisOpen] = useState(false)



  return (
    <div className="h-screen hidden lg:block border border-l border-gray-500 w-1/4 bg-red-500">
      <div>
        <h1 className="bg-amber-500">EVENTLOOP</h1>
      </div>

      <div className="flex flex-cols p-2 ">
        {menuBar.map((menu, index) => (
          <Link
            key={index}
            href={menu.path}
            className={`block p-2 text-gray-700 hover:text-[#fc6435] ${pathName === menu.path ? "border-l border-amber-500 border-2": ""}`}
          >
            {menu.item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
