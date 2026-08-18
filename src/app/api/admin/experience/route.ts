import { NextResponse } from "next/server";
import { getExperienceItems, mutateExperience } from "@/lib/data";

export async function GET() {
  const items = await getExperienceItems();
  return NextResponse.json({ success: true, items });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateExperience("create", data);
    return NextResponse.json({ success: true, item: created });
  } catch (error) {
    console.error("Experience create error:", error);
    return NextResponse.json({ error: "Failed to create experience item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updated = await mutateExperience("update", data);
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error("Experience update error:", error);
    return NextResponse.json({ error: "Failed to update experience item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await mutateExperience("delete", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Experience delete error:", error);
    return NextResponse.json({ error: "Failed to delete experience item" }, { status: 500 });
  }
}
