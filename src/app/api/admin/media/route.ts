import { NextResponse } from "next/server";
import { getMediaItems, mutateMediaItems } from "@/lib/data";

export async function GET() {
  const items = await getMediaItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateMediaItems("create", data);
    return NextResponse.json({ success: true, item: created });
  } catch (error) {
    console.error("Media create error:", error);
    return NextResponse.json({ error: "Failed to create media entry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await mutateMediaItems("delete", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json({ error: "Failed to delete media entry" }, { status: 500 });
  }
}
