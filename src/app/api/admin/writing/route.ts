import { NextResponse } from "next/server";
import { getWritingItems, mutateWriting } from "@/lib/data";

export async function GET() {
  const items = await getWritingItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateWriting("create", data);
    return NextResponse.json({ success: true, item: created });
  } catch (error) {
    console.error("Writing create error:", error);
    return NextResponse.json({ error: "Failed to create writing item" }, { status: 500 });
  }
}
