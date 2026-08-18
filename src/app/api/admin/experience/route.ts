import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.experienceItem.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const item = await prisma.experienceItem.create({
      data: {
        dateRange: data.dateRange || "2024 - Present",
        title: data.title,
        company: data.company || null,
        description: data.description || "",
        category: data.category || "Development",
        displayOrder: Number(data.displayOrder || 0),
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await prisma.experienceItem.update({
      where: { id: data.id },
      data: {
        dateRange: data.dateRange,
        title: data.title,
        company: data.company,
        description: data.description,
        category: data.category,
        displayOrder: Number(data.displayOrder || 0),
        isActive: Boolean(data.isActive),
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.experienceItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience item" }, { status: 500 });
  }
}
