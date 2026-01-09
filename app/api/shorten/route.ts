import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { shortenUrlSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = shortenUrlSchema.parse(body);
    
    const shortCode = nanoid(7);
    
    const shortUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    return NextResponse.json(
      {
        shortCode: shortUrl.shortCode,
        originalUrl: shortUrl.originalUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid URL format", details: error.issues },
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