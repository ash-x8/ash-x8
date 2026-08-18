import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.socialContent.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch social items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const item = await prisma.socialContent.create({
      data: {
        title: data.title,
        platform: data.platform || "Instagram",
        contentType: data.contentType || "Post",
        description: data.description || null,
        mediaUrl: data.mediaUrl || null,
        videoUrl: data.videoUrl || null,
        url: data.url || null,
        campaign: data.campaign || null,
        date: data.date || null,
        isFeatured: Boolean(data.isFeatured),
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        displayOrder: Number(data.displayOrder || 0),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create social item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await prisma.socialContent.update({
      where: { id: data.id },
      data: {
        title: data.title,
        platform: data.platform,
        contentType: data.contentType,
        description: data.description,
        mediaUrl: data.mediaUrl,
        videoUrl: data.videoUrl,
        url: data.url,
        campaign: data.campaign,
        date: data.date,
        isFeatured: Boolean(data.isFeatured),
        isPublished: Boolean(data.isPublished),
        displayOrder: Number(data.displayOrder || 0),
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update social item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.socialContent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete social item" }, { status: 500 });
  }
}
