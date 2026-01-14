"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
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

          <Link href="/statistics">
            <span className="text-m font-bold hover:text-white transition">
              Statistics
            </span>
          </Link>

          {session ? (
            <Link href="/profile">
              <span className="text-m font-bold hover:text-white transition">
                Profile
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Sign in
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="bg-white text-black hover:bg-white/90">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
