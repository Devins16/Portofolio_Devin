import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import MusicPlayer from "@/components/MusicPlayer"; 
   import NeonFlash from "@/components/NeonFlash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Devin Syafa | Portfolio",
  description: "Portfolio of Devin Syafa",
  applicationName: "Devin Syafa Portfolio",
   icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[#0b0416] text-white min-h-screen`}
      >
        <StarField />
        <MusicPlayer />
        <NeonFlash src="/images/gl.png" />
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
