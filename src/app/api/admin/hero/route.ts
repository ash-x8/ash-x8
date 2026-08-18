import { NextResponse } from "next/server";
import { mutateHeroSection, getHeroSection } from "@/lib/data";

export async function GET() {
  const hero = await getHeroSection();
  return NextResponse.json({ success: true, hero });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const updated = await mutateHeroSection(data);
    return NextResponse.json({ success: true, hero: updated });
  } catch (error) {
    console.error("Hero update error:", error);
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
  }
}
