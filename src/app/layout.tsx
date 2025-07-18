import type { Metadata } from "next";
import Navbar from '@/app/components/navBar/index';
import { Geist, Geist_Mono } from "next/font/google";
import MainCanvas from "./components/mainCanvas";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D台灣電力與再生能源統計地圖(3D Taiwan Energy Map)",
  description: "3D Taiwan Energy Map built by Next.js + R3F + Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <Navbar />
        <MainCanvas />
        {children}
      </body>
    </html>
  );
}
