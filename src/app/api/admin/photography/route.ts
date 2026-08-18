import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: items, error } = await supabase
      .from("photography_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      items: items.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        imageUrl: p.image_url,
        cameraInfo: p.camera_info,
        location: p.location,
        year: p.year,
        isFeatured: p.is_featured,
        isPublished: p.is_published,
        displayOrder: p.display_order,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch photography items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: item, error } = await supabase
      .from("photography_items")
      .insert({
        title: data.title,
        category: data.category || "Portrait",
        image_url: data.imageUrl,
        camera_info: data.cameraInfo || null,
        location: data.location || null,
        year: data.year || new Date().getFullYear().toString(),
        is_featured: Boolean(data.isFeatured),
        is_published: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        display_order: Number(data.displayOrder || 0),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        title: item.title,
        category: item.category,
        imageUrl: item.image_url,
        cameraInfo: item.camera_info,
        location: item.location,
        year: item.year,
        isFeatured: item.is_featured,
        isPublished: item.is_published,
        displayOrder: item.display_order,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create photo item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("photography_items")
      .update({
        title: data.title,
        category: data.category,
        image_url: data.imageUrl,
        camera_info: data.cameraInfo,
        location: data.location,
        year: data.year,
        is_featured: Boolean(data.isFeatured),
        is_published: Boolean(data.isPublished),
        display_order: Number(data.displayOrder || 0),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: updated.id,
        title: updated.title,
        category: updated.category,
        imageUrl: updated.image_url,
        cameraInfo: updated.camera_info,
        location: updated.location,
        year: updated.year,
        isFeatured: updated.is_featured,
        isPublished: updated.is_published,
        displayOrder: updated.display_order,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update photo item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from("photography_items").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete photo item" }, { status: 500 });
  }
}
