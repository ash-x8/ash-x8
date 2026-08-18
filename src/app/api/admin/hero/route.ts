import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const updated = await prisma.heroSection.upsert({
      where: { id: "1" },
      update: {
        heading: data.heading,
        subtitle: data.subtitle,
        description: data.description,
        primaryCtaText: data.primaryCtaText,
        primaryCtaLink: data.primaryCtaLink,
        secondaryCtaText: data.secondaryCtaText,
        secondaryCtaLink: data.secondaryCtaLink,
        statusBadge: data.statusBadge,
        smallText: data.smallText,
        heroImage: data.heroImage,
      },
      create: {
        id: "1",
        heading: data.heading,
        subtitle: data.subtitle,
        description: data.description,
        primaryCtaText: data.primaryCtaText,
        primaryCtaLink: data.primaryCtaLink,
        secondaryCtaText: data.secondaryCtaText,
        secondaryCtaLink: data.secondaryCtaLink,
        statusBadge: data.statusBadge,
        smallText: data.smallText,
        heroImage: data.heroImage,
      },
    });

    return NextResponse.json({ success: true, hero: updated });
  } catch (error) {
    console.error("Hero update error:", error);
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
  }
}
