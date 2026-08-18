import { NextResponse } from "next/server";
import { mutateAboutSection, getAboutSection } from "@/lib/data";

export async function GET() {
  const about = await getAboutSection();
  return NextResponse.json({ success: true, about });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const updated = await mutateAboutSection(data);
    return NextResponse.json({ success: true, about: updated });
  } catch (error) {
    console.error("About update error:", error);
    return NextResponse.json({ error: "Failed to update about section" }, { status: 500 });
  }
}
