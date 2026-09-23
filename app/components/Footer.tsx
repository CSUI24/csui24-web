"use client";
import { cn } from "@/lib/utils";
import { Clapperboard, Copy, Earth, HardHat, Home } from "lucide-react";
import { AiFillInstagram } from "react-icons/ai";

import Link from "next/link";
import React from "react";

import Image from "next/image";
import { FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  const menuItems = [
    { name: "Home", path: "/", icon: <Home size={15} /> },
    { name: "Fams!", path: "/fams", icon: <Earth size={15} /> },
    { name: "CS Team", path: "/cs-team", icon: <HardHat size={15} /> },
    {
      name: "Documentation",
      path: "/documentation",
      icon: <Clapperboard size={15} />,
    },
  ];

  const socialItems = [
    { name: "Instagram", path: "/", icon: <AiFillInstagram size={20} /> },
    { name: "Twitter", path: "/", icon: <FaTwitter size={20} /> },
    { name: "YouTube", path: "/", icon: <FaYoutube size={20} /> },
    { name: "TikTok", path: "/", icon: <FaTiktok size={20} /> },
  ];

  return (
    <div className="flex flex-row w-full justify-around bgFoot px-0 md:px-11 py-14 overflow-hidden items-end">
      <div className="logo pointer-events-none max-w-24 sm:max-w-none">
        <Image
          src="/csfooter.png"
          alt=""
          width={150}
          height={150}
          className="h-auto w-full"
        />
      </div>
      <div className="hidden lg:flex">
        <ul className="flex flex-col gap-2  justify-around w-full text-white text-xs md:text-sm font-sfSemi font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={cn(
                  "opacity-100 hover:opacity-45 transition-opacity flex items-center space-x-2",
                )}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-10 lg:gap-32 text-xs sm:text-base">
        <div className="hidden flex-col gap-2 ">
          <h1 className="text-white font-sfPro font-bold">Our Social Media</h1>
          <ul className="flex gap-2  justify-around w-full text-white text-xs md:text-sm font-sfSemi font-medium">
            {socialItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={cn(
                    "opacity-100 hover:opacity-45 transition-opacity flex items-center space-x-2",
                  )}
                >
                  <div className="text-xs">{item.icon}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-white ">
          <h1 className="font-sfPro font-bold text-start">Contact Us</h1>
          <div className="flex justify-center items-center gap-2">
            <p className="font-sfSemi">fasilkomui2024@gmail.com</p>
            <Copy
              onClick={() =>
                navigator.clipboard.writeText("fasilkomui2024@gmail.com")
              }
              className="cursor-pointer hover:opacity-65"
              size={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
