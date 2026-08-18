import { NextResponse } from "next/server";
import { getSocialLinks, mutateSocialLinks } from "@/lib/data";

export async function GET() {
  const links = await getSocialLinks();
  return NextResponse.json({ success: true, links });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateSocialLinks("create", data);
    return NextResponse.json({ success: true, link: created });
  } catch (error) {
    console.error("Social link create error:", error);
    return NextResponse.json({ error: "Failed to create social link" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updated = await mutateSocialLinks("update", data);
    return NextResponse.json({ success: true, link: updated });
  } catch (error) {
    console.error("Social link update error:", error);
    return NextResponse.json({ error: "Failed to update social link" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await mutateSocialLinks("delete", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Social link delete error:", error);
    return NextResponse.json({ error: "Failed to delete social link" }, { status: 500 });
  }
}
