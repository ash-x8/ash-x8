import { NextResponse } from "next/server";
import { getTestimonials, mutateTestimonials } from "@/lib/data";

export async function GET() {
  const testimonials = await getTestimonials();
  return NextResponse.json({ success: true, testimonials });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const created = await mutateTestimonials("create", data);
    return NextResponse.json({ success: true, testimonial: created });
  } catch (error) {
    console.error("Testimonials create error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updated = await mutateTestimonials("update", data);
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    console.error("Testimonials update error:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await mutateTestimonials("delete", { id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonials delete error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
