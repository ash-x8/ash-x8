import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: { skills: { orderBy: { displayOrder: "asc" } } },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (data.type === "category") {
      const cat = await prisma.skillCategory.create({
        data: { name: data.name, displayOrder: Number(data.displayOrder || 0) },
      });
      return NextResponse.json({ success: true, category: cat });
    }

    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        skillLevel: data.skillLevel || null,
        description: data.description || null,
        displayOrder: Number(data.displayOrder || 0),
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return NextResponse.json({ success: true, skill });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    if (type === "category") {
      await prisma.skillCategory.delete({ where: { id } });
    } else {
      await prisma.skill.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
