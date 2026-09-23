"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Earth,
  HardHat,
  Clapperboard,
  Menu,
  BookHeart,
} from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    { name: "Home", path: "/", icon: <Home size={15} /> },
    { name: "Fams", path: "/fams", icon: <Earth size={15} /> },
    { name: "CS Team", path: "/cs-team", icon: <HardHat size={15} /> },
    {
      name: "Documentation",
      path: "/documentation",
      icon: <Clapperboard size={15} />,
    },
    {
      name: "Menfess",
      path: "/menfess",
      icon: <BookHeart size={15} />,
    },
  ];

  const isActive = (path: string) =>
    pathname ? `/${pathname.split("/")[1]}` === path : false;

  // active item
  const activeItem =
    menuItems.find((item) => isActive(item.path)) || menuItems[0];

  // mobile
  const isMobile = () => window.innerWidth < 640; // sm

  useEffect(() => {
    // dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleResize = () => {
      if (!isMobile()) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
    }

    // cleanup
    return () => {
      if (dropdownOpen) {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [dropdownOpen]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop.current && currentScrollTop > 200) {
        // Scrolling down
        setIsNavbarVisible(false);
        if (isMobile()) {
          setDropdownOpen(false);
        }
      } else if (currentScrollTop + 20 < lastScrollTop.current) {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    const throttledHandleScroll = () => {
      if (scrollTimeout.current === null) {
        scrollTimeout.current = setTimeout(() => {
          handleScroll();
          scrollTimeout.current = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-14 inset-x-0 max-w-2xl mx-auto z-30 transition-all ease-in-out duration-500",
        isNavbarVisible ? "translate-y-0" : "-translate-y-[500px] ",
        className
      )}
    >
      <nav className="relative rounded-full bg-[#1D1D1D] bg-opacity-75 hover:bg-opacity-50 sm:hover:bg-opacity-75 cursor-pointer sm:cursor-default transition-all duration-300 border-2 border-[#717174] backdrop-blur-sm shadow-input w-fit mx-auto px-8 py-3 sm:py-6">
        {/* Mobile View */}
        <div className="block sm:hidden text-white">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-between gap-8 items-center cursor-pointer"
          >
            <div className="flex items-center space-x-2 font-sfPro font-extrabold">
              {activeItem.icon}
              <span>{activeItem.name}</span>
            </div>
            {/* Dropdown Toggle Button */}
            <button
              ref={toggleButtonRef}
              className="focus:outline-none"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Desktop View*/}
        <ul className="hidden gap-10 sm:flex justify-around w-full text-white transition-opacity text-xs md:text-sm font-sfPro font-extrabold">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={cn(
                  "hover:opacity-100 opacity-45 transition-opacity flex items-center space-x-2",
                  isActive(item.path) ? "opacity-100" : ""
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Dropdown Menu */}
      {
        <div
          ref={dropdownRef}
          className={`absolute left-0 right-0 top-15 ${
            dropdownOpen ? "scale-100" : "scale-0"
          } transition-all duration-300 mt-2 mx-auto w-fit rounded-2xl bg-[#1D1D1D] bg-opacity-75 border-2 border-[#717174] backdrop-blur-sm shadow-input py-5 px-4 gap-3 z-50`}
        >
          <ul className="font-sfPro font-extrabold text-white space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center space-x-2 text-sm hover:opacity-100 opacity-75 transition-opacity"
                  onClick={() => setDropdownOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}
