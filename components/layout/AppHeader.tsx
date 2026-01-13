"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TinyLink
        </h1>

        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="outline">Dashboard</Button>
          </Link>

          <Button variant="ghost" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
