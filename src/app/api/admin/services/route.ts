import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title || !data.shortDesc) {
      return NextResponse.json({ error: "Title and short description are required" }, { status: 400 });
    }

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const service = await prisma.service.create({
      data: {
        title: data.title,
        slug,
        shortDesc: data.shortDesc,
        longDesc: data.longDesc || null,
        icon: data.icon || "Briefcase",
        image: data.image || null,
        displayOrder: data.displayOrder ? Number(data.displayOrder) : 0,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
        isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : true,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "Service ID required" }, { status: 400 });

    const updated = await prisma.service.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug,
        shortDesc: data.shortDesc,
        longDesc: data.longDesc,
        icon: data.icon,
        image: data.image,
        displayOrder: Number(data.displayOrder || 0),
        isActive: Boolean(data.isActive),
        isFeatured: Boolean(data.isFeatured),
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
