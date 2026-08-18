import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: services, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      services: services.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        shortDesc: s.short_desc,
        longDesc: s.long_desc,
        icon: s.icon,
        image: s.image,
        displayOrder: s.display_order,
        isActive: s.is_active,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    if (!data.title || !data.shortDesc) {
      return NextResponse.json({ error: "Title and short description are required" }, { status: 400 });
    }

    const slug =
      data.slug?.trim() ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const { data: service, error } = await supabase
      .from("services")
      .insert({
        title: data.title,
        slug,
        short_desc: data.shortDesc,
        long_desc: data.longDesc || null,
        icon: data.icon || "Briefcase",
        image: data.image || null,
        display_order: data.displayOrder ? Number(data.displayOrder) : 0,
        is_active: data.isActive !== undefined ? Boolean(data.isActive) : true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      service: {
        id: service.id,
        title: service.title,
        slug: service.slug,
        shortDesc: service.short_desc,
        longDesc: service.long_desc,
        icon: service.icon,
        image: service.image,
        displayOrder: service.display_order,
        isActive: service.is_active,
      },
    });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "Service ID required" }, { status: 400 });

    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("services")
      .update({
        title: data.title,
        slug: data.slug,
        short_desc: data.shortDesc,
        long_desc: data.longDesc,
        icon: data.icon,
        image: data.image,
        display_order: Number(data.displayOrder || 0),
        is_active: Boolean(data.isActive),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      service: {
        id: updated.id,
        title: updated.title,
        slug: updated.slug,
        shortDesc: updated.short_desc,
        longDesc: updated.long_desc,
        icon: updated.icon,
        image: updated.image,
        displayOrder: updated.display_order,
        isActive: updated.is_active,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
