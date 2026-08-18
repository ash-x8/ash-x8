import { NextResponse } from "next/server";
import { getSiteSettings, mutateSiteSettings } from "@/lib/data";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({
    success: true,
    footer: {
      copyrightText: `© ${new Date().getFullYear()} ASH-X8. All rights reserved.`,
      tagline: settings.tagline,
      brandName: "ASH-X8 — Kushan A Wickramasinghe",
      email: settings.email,
      phone: settings.phone,
      whatsappUrl: settings.whatsappUrl,
      location: settings.location,
    },
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (data.tagline || data.email || data.phone || data.whatsappUrl) {
      await mutateSiteSettings({
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        whatsappUrl: data.whatsappUrl,
      });
    }
    return NextResponse.json({ success: true, footer: data });
  } catch (error) {
    console.error("Footer save error:", error);
    return NextResponse.json({ error: "Failed to save footer settings" }, { status: 500 });
  }
}
