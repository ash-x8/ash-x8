import { NextResponse } from "next/server";
import { getNavigationItems } from "@/lib/data";

export async function GET() {
  const items = await getNavigationItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    return NextResponse.json({ success: true, item: data });
  } catch (error) {
    console.error("Nav save error:", error);
    return NextResponse.json({ error: "Failed to save navigation" }, { status: 500 });
  }
}
