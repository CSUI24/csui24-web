"use client";
import { Albums, AlbumsType } from "../constant";
import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DocumentationCarousel = ({
  album,
  normal,
}: {
  album: AlbumsType;
  normal: boolean;
}) => {
  const [carouselRef, api] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div
      className={`flex ${normal ? "md:flex-row" : "md:flex-row-reverse"} flex-col-reverse items-stretch justify-center gap-8 my-28 lg:my-36 px-0 md:px-14 lg:px-20 max-w-160 md:max-w-336 mx-auto`}
    >
      <div className="flex-[0.8] flex flex-col justify-center items-center font-sfPro text-white max-md:mx-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 lg:mb-8">
          {album.title}
        </h1>
        <p className="text-lg lg:text-xl font-sfReg font-normal text-justify">
          {album.description}
        </p>
      </div>
      <div className="flex-1">
        <div className="px-14 lg:px-16 relative">
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-white"
            onClick={scrollPrev}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-white"
            onClick={scrollNext}
          >
            <ChevronRight />
          </button>
          <div className="w-full aspect-5/4 bg-white p-[2%] pb-[10%]">
            <div className="size-full overflow-hidden" ref={carouselRef}>
              <div className="flex h-full">
                {album.imageList.map((src, index) => {
                  return (
                    <div key={index} className="min-w-full min-h-full">
                      <div className="relative size-full">
                        <Image
                          src={`/${src}`}
                          alt={`image-${index}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentationAlbum = () => {
  return (
    <div id="album">
      {Albums.map((album, index) => {
        return (
          <DocumentationCarousel
            album={album}
            normal={index % 2 == 0}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default DocumentationAlbum;
