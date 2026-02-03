import type { Metadata } from "next";
import { Sora } from "next/font/google";

import SessionProvider from "@/components/providers/session-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TinyLink - URL Shortener",
  description: "Create short, shareable links instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} bg-black text-white min-h-screen flex flex-col`}>
        <SessionProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
