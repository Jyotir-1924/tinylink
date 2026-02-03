"use client";

import HomePage from "@/components/home/HomePage";
import AuthCard from "@/components/auth/AuthCard";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="app-bg min-h-screen">
      <div className="pt-24">
        {session ? <HomePage /> : <AuthCard />}
      </div>
    </div>
  );
}
