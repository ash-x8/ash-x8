import { NextResponse } from "next/server";
import { mutateWriting } from "@/lib/data";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updated = await mutateWriting("update", { ...data, id });
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Writing update error:", error);
    return NextResponse.json({ error: "Failed to update writing item" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await mutateWriting("delete", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Writing delete error:", error);
    return NextResponse.json({ error: "Failed to delete writing item" }, { status: 500 });
  }
}
