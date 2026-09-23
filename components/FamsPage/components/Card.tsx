import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CardProps } from "./types";

export const Card = ({ entry, className = "" }: CardProps) => {
  return (
    <Link
      href={`/fams/${entry.id}`}
      className={cn(
        "col-span-1 sm:p-6 sm:pt-9 max-sm:pt-6 max-sm:pb-5 max-sm:px-[26px] sm:w-[185px] max-sm:w-[135px] sm:h-[237px] max-sm:h-[170px] bg-[#292929] sm:rounded-[14px] max-sm:rounded-[10px] shadow-sm shadow-[#082F49] flex flex-col items-center sm:gap-5 max-sm:gap-3",
        className
      )}
      data-umami-event="fams-profile-visit"
      data-umami-event-profile-id={entry.id}
    >
      <Image
        src={`/${entry["image-filename"]}`}
        alt={`${entry["displayed-name"]}s Picture`}
        width={100}
        height={100}
        className={`rounded-full max-sm:w-[77px] max-sm:h-[77px]`}
      />
      <div className="h-full flex flex-row items-center justify-center">
        <p className="flex-1 text-white font-sfSemi text-center max-sm:text-xs">
          {entry["displayed-name"]}
        </p>
      </div>
    </Link>
  );
};
