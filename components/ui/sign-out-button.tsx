"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="
        text-red-500
        font-bold
        bg-transparent
        px-4 py-2
        rounded-md
        transition-all
        hover:bg-red-500
        hover:text-white
      "
    >
      Sign Out
    </button>
  );
}
