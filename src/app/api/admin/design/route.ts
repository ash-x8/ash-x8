import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: items, error } = await supabase
      .from("design_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        category: i.category,
        description: i.description,
        imageUrl: i.image_url,
        year: i.year,
        isFeatured: i.is_featured,
        isPublished: i.is_published,
        displayOrder: i.display_order,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch design items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: item, error } = await supabase
      .from("design_items")
      .insert({
        title: data.title,
        category: data.category || "Logo",
        description: data.description || null,
        image_url: data.imageUrl,
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
        description: item.description,
        imageUrl: item.image_url,
        year: item.year,
        isFeatured: item.is_featured,
        isPublished: item.is_published,
        displayOrder: item.display_order,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create design item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("design_items")
      .update({
        title: data.title,
        category: data.category,
        description: data.description,
        image_url: data.imageUrl,
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
        description: updated.description,
        imageUrl: updated.image_url,
        year: updated.year,
        isFeatured: updated.is_featured,
        isPublished: updated.is_published,
        displayOrder: updated.display_order,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update design item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from("design_items").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete design item" }, { status: 500 });
  }
}
