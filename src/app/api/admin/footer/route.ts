import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { displayOrder: "asc" },
    });
    const settings = await prisma.siteSettings.findUnique({ where: { id: "1" } });
    return NextResponse.json({ socialLinks, settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch footer settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (data.tagline) {
      await prisma.siteSettings.upsert({
        where: { id: "1" },
        update: { tagline: data.tagline },
        create: { id: "1", tagline: data.tagline },
      });
    }

    if (Array.isArray(data.socialLinks)) {
      for (const link of data.socialLinks) {
        if (link.platform && link.url) {
          await prisma.socialLink.upsert({
            where: { platform: link.platform },
            update: { url: link.url, enabled: link.enabled },
            create: { platform: link.platform, url: link.url, enabled: link.enabled },
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update footer settings" }, { status: 500 });
  }
}
