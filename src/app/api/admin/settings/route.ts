import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const updated = await prisma.siteSettings.upsert({
      where: { id: "1" },
      update: {
        siteName: data.siteName,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        location: data.location,
        timezone: data.timezone,
        accentColor: data.accentColor,
        analyticsId: data.analyticsId,
        maintenanceMode: Boolean(data.maintenanceMode),
      },
      create: {
        id: "1",
        siteName: data.siteName,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        location: data.location,
        timezone: data.timezone,
        accentColor: data.accentColor,
        analyticsId: data.analyticsId,
        maintenanceMode: Boolean(data.maintenanceMode),
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
