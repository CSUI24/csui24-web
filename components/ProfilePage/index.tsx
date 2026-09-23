import { FamsDataType } from "@/modules/fams-data";
import {
  X,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SocialPaneDesktop, SocialPaneMobile } from "./sections/SocialPanes";
import Image from "next/image";
import Link from "next/link";
import { blurhashToBase64 } from 'blurhash-base64';

const ProfilePage = ({
  person,
  prevID,
  nextID,
}: {
  person: FamsDataType;
  prevID: string | null;
  nextID: string | null;
}) => {
  return (
    <div className="px-[calc(9%-1.2rem)] sm:px-12 md:px-18 lg:px-24 text-white font-sfPro">
      <nav className="hidden sm:flex justify-between items-center mb-16">
        <Link
          href="/fams"
          className="p-3 rounded-full border-white border-solid border-[1.5px]"
        >
          <X className="size-6 lg:size-7" />
        </Link>
        <div className="p-3 flex items-center w-fit gap-x-8 rounded-full border-white border-solid border-[1.5px]">
          <Link href={`/fams/${prevID}`}>
            <ArrowLeft className="size-6 lg:size-7" />
          </Link>
          <h3 className="text-lg lg:text-xl font-sfReg font-semibold">
            {person["nick-name"]}
          </h3>
          <Link href={`/fams/${nextID}`}>
            <ArrowRight className="size-6 lg:size-7" />
          </Link>
        </div>
      </nav>
      <nav className="flex sm:hidden justify-between items-center mb-10">
        <Link href={`/fams/${prevID}`}>
          <ChevronLeft className="size-10" />
        </Link>
        <h3 className="text-xl font-sfReg font-semibold">{person["nick-name"]}</h3>
        <Link href={`/fams/${nextID}`}>
          <ChevronRight className="size-10" />
        </Link>
      </nav>
      <main className="w-full max-w-6xl mx-auto">
        <div className="flex flex-row gap-[6%] items-center mb-12">
          <div className="flex-[1.2] sm:flex-1 max-w-[24rem]">
            <div className="relative w-full aspect-square rounded-full overflow-hidden">
              <Image
                src={`/${person["image-filename"]}`}
                alt={`foto profil ${person["nick-name"]}`}
                fill
                blurDataURL={blurhashToBase64(person['blurhash'])}
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-2">
            <h2 className="font-sfReg font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 lg:mb-4">
              {person.major}
            </h2>
            <h1 className="font-sfPro font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3 lg:mb-4">
              {person["full-name"]}
            </h1>
            <h3 className="font-sfReg font-normal text-base sm:text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 lg:mb-6">
              {person["birth-date"]}
            </h3>
            <SocialPaneDesktop person={person} />
            <SocialPaneMobile person={person} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-[6%]">
          <div className="flex-1 md:max-w-[24rem]">
            <h2 className="font-sfPro font-bold text-lg sm:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4">
              Description
            </h2>
            <p className="font-sfReg font-normal text-base sm:text-lg lg:text-xl text-[#B3B3B3] mb-5">
              {person.description}
            </p>
          </div>
          <div className="flex-2">
            <h2 className="font-sfPro font-bold text-lg sm:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4">
              Message for CSUI {"'"}24
            </h2>
            <p className="font-sfReg font-normal text-base sm:text-lg lg:text-xl text-[#B3B3B3] mb-5 lg:mb-6">
              {person["message"]}
            </p>
            <h2 className="font-sfPro font-bold text-lg sm:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4">
              Interests
            </h2>
            <p className="font-sfReg font-normal text-base sm:text-lg lg:text-xl text-[#B3B3B3] mb-5 lg:mb-6">
              {person.interests.join(", ")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
