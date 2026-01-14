"use client";

import Link from "next/link";
import Loader404 from "@/components/ui/Loader404";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_60%)]" />

      <Loader404 />

      <p className="mt-6 text-gray-400 text-sm tracking-widest">
        LINK NOT FOUND
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        Return to TinyLink
      </Link>
    </div>
  );
}
