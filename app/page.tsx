"use client";

import { useSession } from "next-auth/react";
import AuthCard from "@/components/auth/AuthCard";
import AppHeader from "@/components/layout/AppHeader";
import ShortenForm from "@/components/shortener/ShortenForm";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <AuthCard />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="flex justify-center py-10">
        <ShortenForm />
      </div>
    </div>
  );
}
