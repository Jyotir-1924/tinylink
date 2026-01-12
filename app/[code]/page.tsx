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

  const url = await prisma.url.findUnique({
    where: { shortCode: code },
  });

  if (!url) {
    notFound();
  }
  if (url.expiresAt && new Date() > url.expiresAt) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Link Expired</h1>
          <p className="text-gray-600">This short link has expired and is no longer available.</p>
        </div>
      </div>
    );
  }
  await prisma.url.update({
    where: { shortCode: code },
    data: {
      clickCount: { increment: 1 },
    },
  });

  redirect(url.originalUrl);
}