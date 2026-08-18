import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({
    success: true,
    seo: {
      siteTitle: settings.siteName,
      defaultDescription: "Official creative portfolio of Kushan A Wickramasinghe (ASH-X8) — Professional photographer, graphic designer, and author based in Sri Lanka.",
      keywords: "Kushan A Wickramasinghe, ASH-X8, photographer Sri Lanka, graphic designer, author, Writer Tizzy, Writer Ash, cinexus, poster design, certificate design, branding",
      canonicalUrl: "https://ash-wickramasinghe.site",
      ogImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      twitterHandle: "@Ash_x8",
    },
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    return NextResponse.json({ success: true, seo: data });
  } catch (error) {
    console.error("SEO save error:", error);
    return NextResponse.json({ error: "Failed to update SEO" }, { status: 500 });
  }
}
