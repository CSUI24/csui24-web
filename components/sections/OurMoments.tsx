"use client";
import React, { useEffect, useState } from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";
import { X } from "lucide-react";

import { HoverBorderGradient } from "../ui/hover-border-gradient";

// Di sini buat naro path gambar sama keterangannya
const slides = [
  [
    ["/memories/FirstMeetUpPacil 24.jpg", "First Meet Up"],
    ["/memories/FirstMeetUp2.jpg", "First Meet Up"],
    ["/memories/ParadeUI.jpg", "Parade UI"],
    ["/memories/ParadeUI1.jpg", "Parade UI"],
  ],
  [
    ["/memories/ParadeUI2.jpg", "Parade UI"],
    ["/memories/SosPro.jpeg", "Social Project PMB"],
    ["/memories/SabCer.jpg", "Sabtu Ceria"],
    ["/memories/Tumpeng.jpg", "Tumpengan"],
  ],
];

// IMAGE POPUP
interface ImageData {
  url: string;
  text: string;
}

interface ImagePopupProps {
  selectedImage: ImageData | null;
  setSelectedImage: (image: ImageData | null) => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({
  // Function untuk nampilin popup
  selectedImage,
  setSelectedImage,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      // Trigger animation
      requestAnimationFrame(() => {
        setIsShowing(true);
      });
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [selectedImage]);

  if (!selectedImage) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsShowing(false);
      // Wait for animation to finish before closing
      setTimeout(() => {
        setSelectedImage(null);
      }, 200);
    }
  };

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center p-4 z-50 transition-all duration-200 ease-out overflow-y-auto
        ${
          isShowing
            ? "bg-opacity-65 backdrop-blur-sm"
            : "bg-opacity-0 backdrop-blur-none"
        }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`rounded-xl lg:rounded-2xl border-solid border-2 border-white backdrop-blur-sm w-full max-w-[512px] lg:max-w-[50vw] overflow-hidden flex flex-col
          transition-all duration-200 ease-out
          ${isShowing ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="flex p-4 justify-center">
          <h2 className="font-semibold font-sfPro text-2xl text-white">
            {selectedImage.text}
          </h2>
        </div>

        <div className="w-full px-4 lg:px-8 flex-1">
          <div className="w-full h-full overflow-hidden">
            <Image
              src={selectedImage.url}
              alt={selectedImage.text}
              width={2000}
              height={2000}
              className="object-contain lg:max-h-[60vh]"
              priority
            />
          </div>
        </div>

        <div className="p-4 flex justify-end">
          <HoverBorderGradient
            onClick={handleClose}
            as="button"
            className="flex items-center justify-center gap-1"
          >
            <span className="text-sm tracking-widest">Close</span>
            <X className="w-4 h-4" />
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
};

// SLIDES
const SlideContent = ({
  // Function untuk nampilin sebuah slide
  image,
  text,
  onClick,
}: {
  image: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <div className="w-full h-full">
      <Image src={image} alt="Gallery image" fill className="object-cover" />
      <div
        className="absolute inset-0 bg-black bg-opacity-40 hidden group-hover:flex justify-center items-center transition duration-300 cursor-pointer"
        onClick={onClick}
      >
        <h1 className="font-sfPro text-white text-lg sm:text-xl lg:text-3xl xl:text-4xl text-center">
          {text}
        </h1>
      </div>
    </div>
  );
};

const OurMoments = () => {
  // Function untuk sliding image
  const [position, setPosition] = useState(0);
  const [isSlidesHovered, setIsSlidesHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const duplicatedSlides = [...slides, ...slides];

  useEffect(() => {
    const animate = () => {
      if (!isSlidesHovered && !selectedImage) {
        setPosition((prev) => {
          const totalSlideWidth = 70 + 1.5; // 70vw width + 1.5vs gap
          const totalWidth = slides.length * totalSlideWidth;

          if (prev <= -totalWidth) {
            return 0.1;
          }
          return prev - 0.1; // Buat ngatur speed
        });
      }
    };

    const animationFrame = setInterval(animate, 16);
    return () => clearInterval(animationFrame);
  }, [isSlidesHovered, selectedImage]);

  return (
    <>
      <div className="w-full mx-auto overflow-hidden py-4 md:py-10">
        <h1 className="text-white font-sfReg text-center text-4xl mb-8 sm:mb-10 lg:mb-15 xl:mb-20 tracking-wide">
          Our Memories
        </h1>
        <div
          onMouseOver={() => setIsSlidesHovered(true)}
          onMouseOut={() => setIsSlidesHovered(false)}
        >
          <div
            className={`grid grid-flow-col auto-cols-max gap-[1.5vw]`}
            style={{
              transform: `translateX(${position}vw)`,
              transition: "transform 0s linear",
            }}
          >
            {duplicatedSlides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className={`w-[100vw] max-w-[717px] lg:max-w-[70vw] aspect-[16/9] grid grid-cols-3 grid-rows-2 gap-[1.5vw]`}
              >
                <WobbleCard
                  containerClassName="col-span-2 group rounded-[1.5vw]"
                  className="relative flex justify-center items-center overflow-hidden"
                >
                  <SlideContent
                    image={slide[0][0]}
                    text={slide[0][1]}
                    onClick={() =>
                      setSelectedImage({ url: slide[0][0], text: slide[0][1] })
                    }
                  />
                </WobbleCard>
                <WobbleCard
                  containerClassName="group rounded-[1.5vw]"
                  className="relative flex justify-center items-center overflow-hidden"
                >
                  <SlideContent
                    image={slide[1][0]}
                    text={slide[1][1]}
                    onClick={() =>
                      setSelectedImage({ url: slide[1][0], text: slide[1][1] })
                    }
                  />
                </WobbleCard>
                <WobbleCard
                  containerClassName="group rounded-[1.5vw]"
                  className="relative flex justify-center items-center overflow-hidden"
                >
                  <SlideContent
                    image={slide[2][0]}
                    text={slide[2][1]}
                    onClick={() =>
                      setSelectedImage({ url: slide[2][0], text: slide[2][1] })
                    }
                  />
                </WobbleCard>
                <WobbleCard
                  containerClassName="col-span-2 group rounded-[1.5vw]"
                  className="relative flex justify-center items-center overflow-hidden"
                >
                  <SlideContent
                    image={slide[3][0]}
                    text={slide[3][1]}
                    onClick={() =>
                      setSelectedImage({ url: slide[3][0], text: slide[3][1] })
                    }
                  />
                </WobbleCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImagePopup
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  );
};

export default OurMoments;
