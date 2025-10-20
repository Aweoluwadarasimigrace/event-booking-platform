"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { MdEventNote } from "react-icons/md";
import { TbHelpOctagon, TbLogout2 } from "react-icons/tb";
import { useLogout } from "../../hooks/useLogout";

const SideBar = () => {
  const pathName = usePathname();
  const menuBar = [
    { item: "Event", path: "/dashboard/events" , icon: <MdEventNote />},
    { item: "Account", path: "/dashboard/profilepage" , icon: <FaRegUser />},
    { item: "Help", path: "/dashboard/help", icon: <TbHelpOctagon />},
  ];

const {handleLogout}=useLogout();
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="flex">
      {/* side bar */}
     <div className="h-screen hidden lg:block border-l border-gray-500 w-64 bg-red-500">
  <div className="p-4">
    <h1 className="text-amber-500 font-bold text-2xl">EVENTLOOP</h1>
  </div>

  <div className="flex flex-col p-2">
    {menuBar.map((menu, index) => (
      <div className="flex items-center gap-2" key={index}>
          <span>{menu.icon}</span>
      <Link
        href={menu.path}
        className={`block p-2 mb-6 text-gray-700 text-xl ${
          pathName === menu.path ? "text-amber-500 text-xl" : ""
        }`}
      >
        {menu.item}
      </Link>
      </div>
    ))}

    <div className="mt-auto text-xl flex items-center gap-2 text-gray-700 p-2 cursor-pointer hover:text-red-700">
        <TbLogout2 />
        <button className="text-md" onClick={handleLogout}>
            logout
        </button>
    </div>
  </div>
</div>


      <div className="bg-white lg:hidden w-full">
        <header>
          <nav className="flex items-center justify-between p-4 border border-gray-500">
            <h1 className="text-amber-500 font-bold text-xl">EVENTLOOP</h1>
            <button onClick={() => setisOpen(true)} className="text-2xl">
              <FiMenu />
            </button>
          </nav>
        </header>
      </div>

      {isOpen && (
        <div className="bg-opacity-50 z-50">
          <div className="w-full h-full bg-pink-500 p-4 fixed top-0 left-0">
            <button onClick={() => setisOpen(false)} className="mb-4 text-xl">
             <FiX />
            </button>
            <div className="flex flex-col gap-4 text-center">
              {menuBar.map((menu, index) => (
              <div className="flex items-center gap-2 text-center " key={index}>
                <span>{menu.icon}</span>
                  <Link
                  href={menu.path}
                  className={`block p-2 text-gray-700 text-xl mb-6 ${
                    pathName === menu.path
                      ? "text-amber-500 font-bold"
                      : ""
                  }`}
                >
                  {menu.item}
                </Link>
              </div>
              ))}
               <div className="mt-auto flex items-center gap-2 text-gray-700 p-2 cursor-pointer hover:text-red-700">
        <TbLogout2 />
        <button className="text-md" onClick={handleLogout}>
            logout
        </button>
    </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
