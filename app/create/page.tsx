"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import ShortenForm from "@/components/shortener/ShortenForm";

export default function CreatePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center app-bg px-6">
      <ShortenForm />
    </div>
  );
}
