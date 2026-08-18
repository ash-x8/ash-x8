import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.designItem.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch design items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const item = await prisma.designItem.create({
      data: {
        title: data.title,
        category: data.category || "Logo",
        description: data.description || null,
        imageUrl: data.imageUrl,
        year: data.year || new Date().getFullYear().toString(),
        isFeatured: Boolean(data.isFeatured),
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        displayOrder: Number(data.displayOrder || 0),
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create design item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await prisma.designItem.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        imageUrl: data.imageUrl,
        year: data.year,
        isFeatured: Boolean(data.isFeatured),
        isPublished: Boolean(data.isPublished),
        displayOrder: Number(data.displayOrder || 0),
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update design item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.designItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete design item" }, { status: 500 });
  }
}
