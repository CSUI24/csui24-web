"use client";
import { useMemo, useState } from "react";
import { FamsDataType } from "@/modules/fams-data";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsLine } from "react-icons/bs";

export const SocialPaneDesktop = ({ person }: { person: FamsDataType }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const instagramUrl = useMemo(
    () => `https://instagram.com/${person["instagram-id"]}`,
    [person],
  );
  const linkedInUrl = useMemo(
    () => `https://linkedin.com/in/${person["linkedin-id"]}`,
    [person],
  );
  const twitterUrl = useMemo(
    () => `https://x.com/${person["twitter-x-id"]}`,
    [person],
  );

  const socmedIDs = useMemo(
    () => [
      person["instagram-id"],
      person["linkedin-id"],
      person["line-id"],
      person["twitter-x-id"],
    ],
    [person],
  );

  return (
    <div className="hidden md:block">
      <div className="flex text-white gap-4 items-end mb-4">
        {person["instagram-id"] !== null && person["instagram-id"] !== "-" && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
            href={instagramUrl}
            onMouseEnter={() => setHoveredIndex(0)}
            onClick={() => setHoveredIndex(0)}
          >
            <FaInstagram className="size-8 lg:size-9" />
          </a>
        )}
        {person["linkedin-id"] !== null && person["linkedin-id"] !== "-" && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
            href={linkedInUrl}
            onMouseEnter={() => setHoveredIndex(1)}
            onClick={() => setHoveredIndex(1)}
          >
            <FaLinkedin className="size-8 lg:size-9" />
          </a>
        )}
        {person["line-id"] !== null && person["line-id"] !== "-" && (
          <button
            className="block relative top-1"
            onMouseEnter={() => setHoveredIndex(2)}
            onClick={() => setHoveredIndex(2)}
          >
            <BsLine className="size-8 lg:size-9" />
          </button>
        )}
        {person["twitter-x-id"] !== null && person["twitter-x-id"] !== "-" && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block relative"
            href={twitterUrl}
            onMouseEnter={() => setHoveredIndex(3)}
            onClick={() => setHoveredIndex(3)}
          >
            <RiTwitterXLine className="size-7 lg:size-8" />
          </a>
        )}
      </div>
      <div className="relative font-sfReg font-normal text-base lg:text-lg h-10 w-full">
        {socmedIDs.map((username, index) => {
          return (
            <div
              className={`${index == hoveredIndex ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-300 absolute top-0 left-0 px-4 py-1 rounded-full bg-[#FFFFFFCD] text-black w-fit shadow-[0_4.3px_4.3px_0px_rgba(0,0,0,0.25)_inset] border-[#6C6C6CA6] border-solid border-[1px]`}
              key={"socmed-" + index}
            >
              {(index != 1 ? "@" : "") + username}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SocialPaneMobile = ({ person }: { person: FamsDataType }) => {
  const instagramUrl = useMemo(
    () => `https://instagram.com/${person["instagram-id"]}`,
    [person],
  );
  const linkedInUrl = useMemo(
    () => `https://linkedin.com/in/${person["linkedin-id"]}`,
    [person],
  );
  const twitterUrl = useMemo(
    () => `https://x.com/${person["twitter-x-id"]}`,
    [person],
  );

  return (
    <div className="flex md:hidden flex-wrap gap-x-2 sm:gap-x-3 gap-y-2 w-full">
      {person["instagram-id"] !== null && person["instagram-id"] !== "-" && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="flex px-2 sm:px-3 py-1 text-black bg-[#D9D9D9] rounded-full items-center gap-x-1 sm:gap-x-2 relative"
          href={instagramUrl}
        >
          <FaInstagram className="size-4 sm:size-5" />
          <h5 className="font-sfReg font-normal text-xs sm:text-sm">
            @{person["instagram-id"]}
          </h5>
        </a>
      )}
      {person["linkedin-id"] !== null && person["linkedin-id"] !== "-" && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="flex px-2 sm:px-3 py-1 text-black bg-[#D9D9D9] rounded-full items-center gap-x-1 sm:gap-x-2 relative"
          href={linkedInUrl}
        >
          <FaLinkedin className="size-4 sm:size-5" />
          <h5 className="font-sfReg font-normal text-xs sm:text-sm">
            {person["linkedin-id"]}
          </h5>
        </a>
      )}
      {person["line-id"] !== null && person["line-id"] !== "-" && (
        <div className="flex px-2 sm:px-3 py-1 text-black bg-[#D9D9D9] rounded-full items-center gap-x-1 sm:gap-x-2 relative">
          <BsLine className="size-4 sm:size-5 relative top-[1.5px]" />
          <h5 className="font-sfReg font-normal text-xs sm:text-sm">
            {person["line-id"]}
          </h5>
        </div>
      )}
      {person["twitter-x-id"] !== null && person["twitter-x-id"] !== "-" && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="flex px-2 sm:px-3 py-1 text-black bg-[#D9D9D9] rounded-full items-center gap-x-1 sm:gap-x-2 relative"
          href={twitterUrl}
        >
          <RiTwitterXLine className="size-4" />
          <h5 className="font-sfReg font-normal text-xs sm:text-sm">
            {person["twitter-x-id"]}
          </h5>
        </a>
      )}
    </div>
  );
};
