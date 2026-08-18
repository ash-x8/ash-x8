import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ assets });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.mediaAsset.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete asset" }, { status: 500 });
  }
}
