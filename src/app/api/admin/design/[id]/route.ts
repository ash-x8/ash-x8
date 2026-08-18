import { NextResponse } from "next/server";
import { mutateDesign } from "@/lib/data";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updated = await mutateDesign("update", { ...data, id });
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Design update error:", error);
    return NextResponse.json({ error: "Failed to update design item" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await mutateDesign("delete", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Design delete error:", error);
    return NextResponse.json({ error: "Failed to delete design item" }, { status: 500 });
  }
}
