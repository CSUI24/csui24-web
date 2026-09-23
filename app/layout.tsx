import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

// import { SpeedInsights } from "@vercel/speed-insights/next"
// import { Analytics } from "@vercel/analytics/react"

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const sfPro = localFont({
  src: "./fonts/SF-Pro-Text-Bold.otf",
  variable: "--font-sfPro",
});
const sfReg = localFont({
  src: "./fonts/SF-Pro-Text-Regular.otf",
  variable: "--font-sfReg",
});
const monumentExt = localFont({
  src: "./fonts/Monument-Extended.otf",
  variable: "--font-monumentExt",
});
const UncialAntiqua = localFont({
  src: "./fonts/UncialAntiqua-Regular.ttf",
  variable: "--font-UncialAntiqua",
});
const PalanquinDark = localFont({
  src: "./fonts/PalanquinDark-Regular.ttf",
  variable: "--font-PalanquinDark",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://cosmic.csui.dev",
  ),
  title: "CSUI24: The Cosmic Connection",
  description:
    "Welcome to CSUI24 - the creative hub for the Cosmic generation at Fasilkom UI. Connect, innovate, and celebrate your unique journey at Fakultas Ilmu Komputer, Universitas Indonesia.",
  keywords: [
    "CSUI24",
    "CS UI 24",
    "Fasilkom",
    "Pacil",
    "Cosmic",
    "Fakultas Ilmu Komputer",
    "Universitas Indonesia",
    "Community",
    "Innovation",
    "Students",
  ],
  openGraph: {
    title: "CSUI24: The Cosmic Connection",
    description:
      "Dive into CSUI24 - the innovative space for the Cosmic generation at Fasilkom UI. Collaborate, create, and celebrate a journey of endless possibilities.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/customBanner.png`,
        width: 1200,
        height: 630,
        alt: "CSUI24: The Cosmic Connection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSUI24: The Cosmic Connection",
    description:
      "Experience CSUI24 - the creative space where the Cosmic generation at Fasilkom UI connects, innovates, and celebrates every milestone.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/customBanner.png`],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            src="https://umamir.nimby.fun/script.js"
            data-website-id="1857d05e-6ae5-41da-9456-2a1a0a7bf9ec"
          ></script>
        )}
      </head>
      <body
        className={`${monumentExt.variable} ${sfPro.variable}  ${sfReg.variable} ${UncialAntiqua.variable} ${PalanquinDark.variable}`}
      >
        <Navbar />
        <main className="overflow-hidden">{children}</main>
        <Footer />
        <Toaster />
        {/* <SpeedInsights/>
        <Analytics mode="production"/> */}
      </body>
    </html>
  );
}
