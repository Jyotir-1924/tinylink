import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
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
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
