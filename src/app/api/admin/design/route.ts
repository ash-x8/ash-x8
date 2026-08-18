import { NextResponse } from "next/server";
import { getDesignItems, mutateDesign } from "@/lib/data";

export async function GET() {
  const items = await getDesignItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateDesign("create", data);
    return NextResponse.json({ success: true, item: created });
  } catch (error) {
    console.error("Design create error:", error);
    return NextResponse.json({ error: "Failed to create design item" }, { status: 500 });
  }
}
