import { NextResponse } from "next/server";
import { getContactMessages, mutateContactMessage } from "@/lib/data";

export async function GET() {
  const messages = await getContactMessages();
  return NextResponse.json({ success: true, messages });
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    const updated = await mutateContactMessage(id, "status", status);
    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    console.error("Contact status update error:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await mutateContactMessage(id, "delete");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact delete error:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
