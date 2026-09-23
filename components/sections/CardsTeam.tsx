'use client';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface CardsTeamProps {
    link: string;
    nickname: string;
    fullname: string;
    Divisi: string;
    image: string;
    image2: string;
    fontNickname: [string, string];
    fontDivisi: [string, string];  
}


const CardsTeam = (props: CardsTeamProps) => {  
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Link href={props.link}>

            <div className="w-[186px] h-[237px] max-md:w-[134px] max-md:h-[171px] bg-[#292929] rounded-[14.2px] customShadow relative overflow-hidden z-0 group">
                <Image
                    src="/elements/element1.svg"
                    alt="image"
                    width={162}
                    height={139}
                    className="transform rotate-[-131.061deg] absolute left-1/2 -translate-x-1/2 z-1 fill-[#17135B] scale-150"
                />
                <Image
                    src="/elements/element2.svg"
                    alt="image"
                    width={153}
                    height={132}
                    className="transform rotate-[164.592deg] absolute bottom-2 left-1/2 -translate-x-1/2 z-1 fill-custom-fill scale-150"
                />

                <div className="w-fit text-[#b3b3b3] text-center tracking-widest font-normal font-UncialAntiqua flex flex-col gap-20 items-center z-2 absolute top-[13px] left-1/2 -translate-x-1/2 opacity-70">
                    <p
                        className={`transition-opacity duration-500 group-hover:opacity-0 select-none ${isSmallScreen ? "leading-[30px]" : "leading-[37px]"}`}
                        style={{ fontSize: isSmallScreen ? props.fontNickname[1] : props.fontNickname[0] }}
                    >
                        {props.nickname}<br />{props.nickname}<br />{props.nickname}<br />{props.nickname}
                    </p>
                    <p
                        className={`w-max absolute top-[-5px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 select-none ${isSmallScreen ? "leading-[30px]" : "leading-[37px]"}`}
                        style={{ fontSize: isSmallScreen ? props.fontDivisi[1] : props.fontDivisi[0] }}
                    >
                        {props.Divisi}<br />{props.Divisi}<br />{props.Divisi}<br />{props.Divisi}<br />
                    </p>
                </div>

                <Image
                    src={props.image}
                    alt="image"
                    width={isSmallScreen ? 300 : 415}
                    height={isSmallScreen ? 355 : 495}
                    className="z-3 absolute bottom-[15%] left-1/2 -translate-x-1/2 transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                    src={props.image2}
                    alt="image"
                    width={isSmallScreen ? 300 : 415}
                    height={isSmallScreen ? 355 : 495}
                    className="z-3 absolute bottom-[15%] left-1/2 -translate-x-1/2 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />

                <div className="z-4 w-[110px] max-md:w-[80px] h-[23px] max-md:h-[16px] bg-[#1E1B4C] absolute bottom-[12%] flex flex-col items-center filter drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] opacity-95">
                    <p className="w-max text-[#D9D9D9] text-[12px] max-md:text-[8px] font-normal font-PalanquinDark absolute left-1/2 -translate-x-1/2">
                        {props.fullname}
                    </p>
                    <Image
                        src="/elements/triangle.svg"
                        alt="image"
                        width={isSmallScreen ? 16 : 23}
                        height={isSmallScreen ? 16 : 198}
                        className="absolute rotate-90 right-0 translate-x-[98%]"
                    />
                </div>

                <div className="z-4 w-[62px] max-md:w-[45px] h-[23px] max-md:h-[16px] bg-[#1E1B4C] absolute right-0 bottom-[7%] flex flex-col items-center filter drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] opacity-95">
                    <p className="w-max text-[#D9D9D9] text-[12px] max-md:text-[8px] font-normal font-PalanquinDark absolute left-1/2 -translate-x-1/2">
                        {props.Divisi}
                    </p>
                    <Image
                        src="/elements/triangle.svg"
                        alt="image"
                        width={isSmallScreen ? 16 : 23}
                        height={isSmallScreen ? 16 : 198}
                        className="absolute -rotate-90 left-0 -translate-x-full"
                    />
                </div>
            </div>
            </Link>
        </>
    );
};

export default CardsTeam;
