import { NextResponse } from "next/server";
import { mutatePhotography } from "@/lib/data";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updated = await mutatePhotography("update", { ...data, id });
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Photography update error:", error);
    return NextResponse.json({ error: "Failed to update photo item" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await mutatePhotography("delete", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Photography delete error:", error);
    return NextResponse.json({ error: "Failed to delete photo item" }, { status: 500 });
  }
}
