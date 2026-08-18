import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const item = await prisma.testimonial.create({
      data: {
        name: data.name,
        role: data.role || "Founder & CEO",
        company: data.company || null,
        quote: data.quote || "",
        photoUrl: data.photoUrl || null,
        website: data.website || null,
        displayOrder: Number(data.displayOrder || 0),
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await prisma.testimonial.update({
      where: { id: data.id },
      data: {
        name: data.name,
        role: data.role,
        company: data.company,
        quote: data.quote,
        photoUrl: data.photoUrl,
        website: data.website,
        displayOrder: Number(data.displayOrder || 0),
        isPublished: Boolean(data.isPublished),
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
