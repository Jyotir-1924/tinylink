import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import SessionProvider from "@/components/providers/session-provider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
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
      <body className={manrope.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
