import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const urls = await prisma.url.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
      select: {
        shortCode: true,
        clickCount: true,
        createdAt: true,
      },
    });
    const clicksByDate: Record<string, number> = {};

    urls.forEach((url) => {
      const date = url.createdAt.toISOString().split("T")[0];
      clicksByDate[date] =
        (clicksByDate[date] || 0) + url.clickCount;
    });

    const clicksOverTime = Object.entries(clicksByDate).map(
      ([date, clicks]) => ({
        date,
        clicks,
      })
    );
    const topLinks = urls
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, 5)
      .map((u) => ({
        link: u.shortCode,
        clicks: u.clickCount,
      }));

    return NextResponse.json({
      clicksOverTime,
      topLinks,
    });
  } catch (error) {
    console.error("STATISTICS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load statistics" },
      { status: 500 }
    );
  }
}
