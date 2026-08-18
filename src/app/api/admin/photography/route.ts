import { NextResponse } from "next/server";
import { getPhotographyItems, mutatePhotography } from "@/lib/data";

export async function GET() {
  const items = await getPhotographyItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutatePhotography("create", data);
    return NextResponse.json({ success: true, item: created });
  } catch (error) {
    console.error("Photography create error:", error);
    return NextResponse.json({ error: "Failed to create photo item" }, { status: 500 });
  }
}
