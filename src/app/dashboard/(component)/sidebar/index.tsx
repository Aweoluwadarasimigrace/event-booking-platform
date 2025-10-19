"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

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

  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="flex">
      {/* side bar */}
      <div className="h-screen hidden lg:block border border-l border-gray-500 w-1/4 bg-red-500">
        <div>
          <h1 className="bg-amber-500">EVENTLOOP</h1>
        </div>

        <div className="flex flex-cols p-2 ">
          {menuBar.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              className={`block p-2 text-gray-700 hover:text-[#fc6435] ${
                pathName === menu.path
                  ? "border-l border-amber-500 border-2"
                  : ""
              }`}
            >
              {menu.item}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-red-500 lg:hidden w-full">
        <header>
          <nav className="flex items-center justify-between p-4 border border-gray-500">
            <h1>EVENTLOOP</h1>
            <button onClick={() => setisOpen(true)} className="text-2xl">
              <FiMenu />
            </button>
          </nav>
        </header>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 bg-pink-500 bg-opacity-50 z-50">
          <div className="w-full h-full bg-white p-4">
            <button onClick={() => setisOpen(false)} className="mb-4 text-xl">
             <FiX />
            </button>
            <div className="flex flex-col gap-4">
              {menuBar.map((menu, index) => (
                <Link
                  href={menu.path}
                  key={index}
                  className={`block p-2 text-gray-700 hover:text-[#fc6435] ${
                    pathName === menu.path
                      ? "border-l border-amber-500 border-2"
                      : ""
                  }`}
                >
                  {menu.item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
