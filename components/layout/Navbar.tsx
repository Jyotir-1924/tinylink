"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)}>
          <span className="text-4xl md:text-5xl font-extrabold gradient-text">
            TinyLink
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-white/80">
          <Link href="/create">
            <span className="text-sm font-bold hover:text-white transition">
              Create
            </span>
          </Link>

          {session && (
            <Link href="/profile">
              <span className="text-sm font-bold hover:text-white transition">
                Profile
              </span>
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white text-2xl p-2"
          aria-label="Open menu"
        >
          <FiMenu />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-900 border-l border-white/10 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="text-xl font-bold text-white">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white text-xl"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 gap-6 text-white/80 bg-zinc-900">
          <Link href="/create" onClick={() => setOpen(false)}>
            <span className="font-semibold hover:text-white transition">
              Create
            </span>
          </Link>

          {session && (
            <Link href="/profile" onClick={() => setOpen(false)}>
              <span className="font-semibold hover:text-white transition">
                Profile
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
