"use client";

import HomePage from "@/components/home/HomePage";
import AuthCard from "@/components/auth/AuthCard";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="app-bg">
      <div className="app-content pt-20">
        {session ? <HomePage /> : <AuthCard />}
        </div>
    </div>
  );
}
