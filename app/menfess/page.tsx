import { Metadata } from "next";
import Menfess from "@/components/MenfessPage/Menfess";
import { MenfessType } from "@/components/MenfessPage/types";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Menfess | CSUI24",
  description:
    "Explore anonymous confessions and thoughts from the CSUI24 community. Join the conversation, share your story, or just enjoy the ride.",
  keywords: [
    "CSUI24",
    "Menfess",
    "Confessions",
    "Anonymous Messages",
    "Community",
    "Fasilkom UI",
    "Student Life",
    "Campus Culture",
  ],
  openGraph: {
    title: "Menfess | CSUI24",
    description:
      "Read and share anonymous messages from CSUI24 students. Menfess is your space for candid, honest, and sometimes hilarious thoughts from the Fasilkom UI community.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/menfess`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/customBanner.jpg`,
        width: 1200,
        height: 630,
        alt: "Menfess | CSUI24",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menfess | CSUI24",
    description:
      "Confessions, rants, and inside jokes — see what CSUI24 is talking about anonymously through Menfess.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/customBanner.jpg`],
  },
};

const MenfessPage = async () => {
  const data = await prisma.menfess.findMany({
    where: {
      isBlocked: false,
    },
    select: {
      id: true,
      to: true,
      from: true,
      message: true,
      createdAt: true,
      reactions: {
        select: { type: true, count: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: process.env.LIMIT_MENFESS
      ? parseInt(process.env.LIMIT_MENFESS)
      : undefined,
  });

  const menfess: MenfessType[] = data.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return <Menfess menfess={menfess} />;
};
export default MenfessPage;
