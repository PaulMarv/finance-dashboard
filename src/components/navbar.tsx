"use client";

import {
    Menu,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { sideNav } from "../constants";

export const DesktopNav = () => {
    return (
        <div className="px-3 h-screen lg:w-[200px] bg-[#f6f4ff] font-medium  z-[1000] pt-[60px] hidden lg:flex flex-col fixed top-0 overflow-y-auto text-[14px]">
            <SideNav />
        </div>
    );
};

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="lg:hidden  bg-[#f6f4f] px-2">
            <button
                className="fixed top right-2 z-[100000] text-2xl  p-2 rounded"
                onClick={toggleNavbar}
            >
                {isOpen ? (
                    <X size={24} color="#8470FE" strokeWidth={3} />
                ) : (
                    <Menu size={24} color="#8470FE" strokeWidth={3} />
                )}
            </button>
            <div
                className={`fixed top-0 right-0 h-full w-64 shadow-sm bg-white transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 z-40`}
            >
                <nav className="mt-20 flex flex-col h-screen overflow-y-auto px-2">
                    <SideNav />
                </nav>
            </div>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${isOpen ? "block" : "hidden"
                    }`}
                onClick={toggleNavbar}
            ></div>
        </div>
    );
};

const SideNav = () => {
    const pathname = usePathname();

    return (
        <>
            <div className="w-full">
                <div className="">
                    {sideNav.map((item) => (
                        <Link
                            href={item.path}
                            className={`py-2 px-1 h-[45px] flex items-center ${pathname.includes(item.path) ? "bg-[#8470FE] rounded-full text-white" : ""
                                }`}
                            key={item.text}
                        >
                            <div className="flex gap-1 items-center">
                                <span className="rounded-md p-2">{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

