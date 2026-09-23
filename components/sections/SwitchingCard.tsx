"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

const Leader = [
  // gambar harus 1:1 dan gambar jangan yang terlalu kontras dengan item (pilih tone gelap), atau lebih baik gambarnya di edit filter biru dlu
  // Message Optimal di maksimal 350an karakter, karakter bukan kata
  // Name optimal di maksimal 40 karakter
  {
    image: "/leader/leader1.jpg",
    name: "Ketua PMB 2024 - Adrasa Cantya Salaka",
    message:
      "Halo, Cosmic. Welcome to Fasilkom UI! Selamat karena kalian telah secara resmi bergabung di keluarga besar Fakultas Ilmu Komputer Universitas Indonesia. Kami selaku panitia PMB 2024 mengucapkan terima kasih sebanyak-banyaknya atas kerjasama kalian selama rangkaian kegiatan PMB 2024, sehingga pada akhirnya kalian berhasil menjadi sebuah angkatan yang utuh. Ke depannya, terus jadikan angkatan kalian sebagai rumah kalian, saling dukung dan saling membantu hingga garis akhir. Gunakan privilese kalian sebagai mahasiswa/i Fasilkom UI dengan sebaik-baiknya. Gali ilmu sebanyak-banyaknya dari orang-orang di sekitar kalian (baik dosen, elemen, kakak tingkat, atau bahkan teman sebaya), cari pengalaman baru dengan mengikuti organisasi atau kepanitiaan yang sesuai, dan juga perluas koneksi kalian. Semangat terus untuk segala hal di depan! Greater and bigger things are ahead of you!"       },
  {
    image: "/leader/leader2.jpg",
    name: "Koor Angkatan 24 - Tirta Rendy Siahaan",
    message:
      "Selamat atas pencapaian kalian hingga saat ini! Di tengah tantangan dan perjalanan panjang yang telah kalian lalui bersama, ingatlah bahwa kalian adalah angkatan yang luar biasa—berkumpul dari latar belakang dan pengalaman yang beragam namun dipersatukan oleh tujuan dan semangat yang sama. Ingatlah bahwa perjalanan ini bukan hanya tentang meraih prestasi akademik, tetapi juga tentang membentuk diri, membangun jejaring yang kuat, dan saling mendukung dalam mencapai mimpi. Tetaplah rendah hati, terbuka untuk belajar dari pengalaman, dan jangan pernah berhenti mengejar potensi terbaik diri kalian. Jadikan masa-masa ini kenangan berharga yang selalu bisa kalian lihat kembali dengan senyum. Apa pun jalan yang kalian ambil setelah ini, ingatlah bahwa kalian tidak pernah berjalan sendiri—ada dukungan dari teman, mentor, dan semua orang yang percaya pada kalian. Selamat melangkah ke masa depan yang cerah. Teruslah menjadi versi terbaik dari diri kalian. Angkatan 24, kalian luar biasa!",
  },
];

const SwitchingCard = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  const handleClick = (index: number) => {
    if (!isSmallScreen && !isMediumScreen) {
      setActiveCard(activeCard === index ? null : index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col gap-8 py-36">
      <div className="flex justify-center">
        <div className="text-white font-sfReg text-center text-lg sm:text-4xl mb-12 ">
          Messages
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div
          className={`w-[80%] sm:w-[90%] flex gap-7 ${isMediumScreen || isSmallScreen ? "flex-col" : "justify-center"}`}
        >
          {Leader.map((leader, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`${isMediumScreen || isSmallScreen ? "" : "cursor-pointer"} rounded-[35px] p-[2px] bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 transition-all duration-500 ease-in-out overflow-hidden ${
                isSmallScreen
                  ? "max-w-[350px]"
                  : isMediumScreen
                    ? "max-w-[500px]"
                    : activeCard === index
                      ? "max-w-[740px]"
                      : "max-w-[260px]"
              } ${(isSmallScreen || isMediumScreen) && index === 1 ? "self-end" : ""}`}
            >
              <div
                className={`w-fit ${isMediumScreen || isSmallScreen ? "py-[40px] px-[15px]" : "py-[81px] px-[30px]"} ${
                  isSmallScreen || isMediumScreen
                    ? "max-h-[220px]"
                    : "max-h-[350px]"
                } bg-black bg-custom-gradient rounded-[35px] flex ${
                  index === 1 ? "flex-row-reverse" : "flex-row"
                } justify-center items-center transition-all duration-500 ease-in-out ${
                  isSmallScreen || isMediumScreen || activeCard === index
                    ? "lg:gap-6 gap-3"
                    : "gap-0"
                } `}
              >
                <Image
                  src={leader.image}
                  alt={`${leader.name}'s profile picture`}
                  width={isSmallScreen ? 80 : isMediumScreen ? 100 : 200}
                  height={isSmallScreen || isMediumScreen ? 100 : 200}
                  className="rounded-[50%] opacity-80"
                  priority
                />
                <div
                  className={`text-justify font-[400] ${isSmallScreen || isMediumScreen ? "text-[10px]" : "text-base"} text-white font-sfSemi transition-all duration-500 ease-in-out ${
                    isSmallScreen || isMediumScreen || activeCard === index
                      ? "opacity-100 w-[80%] max-md:w-[60%] max-sm:w-[70%]"
                      : "opacity-0 w-0"
                  }  `}
                >
                  <ScrollArea
                    className={`transition-opacity font-sfReg py-2 px-3 lg:h-[300px] h-[200px] ${
                      isSmallScreen || isMediumScreen || activeCard === index
                        ? "duration-[2000ms] opacity-100"
                        : "duration-75 opacity-0"
                    } `}
                  >
                    {leader.message}
                    <br /> <br />{" "}
                    <span className="font-sfReg font-[650]">{leader.name}</span>
                  </ScrollArea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwitchingCard;
