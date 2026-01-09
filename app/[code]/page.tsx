import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = await params;
  
  if (!code || typeof code !== "string") {
    notFound();
  }

  const url = await prisma.url.update({
    where: { shortCode: code },
    data: {
      clickCount: { increment: 1 },
    },
  }).catch(() => null);

  if (!url) {
    notFound();
  }

  redirect(url.originalUrl);
}