"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";


export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-5xl font-extrabold gradient-text ">
            TinyLink
          </span>
        </Link>

        <div className="flex items-center gap-15 text-white/80">
          <Link href="/create">
            <span className="text-m font-bold hover:text-white transition">
              Create
            </span>
          </Link>

          {session && 
            <Link href="/profile">
              <span className="text-m font-bold hover:text-white transition">
                Profile
              </span>
            </Link>
           }
        </div>
      </div>
    </nav>
  );
}
