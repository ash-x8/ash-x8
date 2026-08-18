import { NextResponse } from "next/server";
import { getSiteSettings, mutateSiteSettings } from "@/lib/data";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const updated = await mutateSiteSettings(data);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
