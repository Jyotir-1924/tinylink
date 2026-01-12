import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { shortenUrlSchema } from "@/lib/validators";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { url, customCode } = shortenUrlSchema.parse(body);
    const shortCode = customCode || nanoid(7);
    if (customCode) {
      const existing = await prisma.url.findUnique({
        where: { shortCode: customCode },
      });

      if (existing) {
        return NextResponse.json(
          { error: "This custom code is already taken. Please choose another." },
          { status: 409 }
        );
      }
    }
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);
    
    const shortUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
        customCode: !!customCode,
        expiresAt,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        shortCode: shortUrl.shortCode,
        originalUrl: shortUrl.originalUrl,
        expiresAt: shortUrl.expiresAt,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }
    
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: "Short code collision. Please try again." },
        { status: 500 }
      );
    }
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Failed to create short URL" },
      { status: 500 }
    );
  }
}