import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: items, error } = await supabase
      .from("experience_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      items: items.map((e) => ({
        id: e.id,
        dateRange: e.date_range,
        title: e.title,
        company: e.company,
        description: e.description,
        category: e.category,
        icon: e.icon,
        displayOrder: e.display_order,
        isActive: e.is_active,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: item, error } = await supabase
      .from("experience_items")
      .insert({
        date_range: data.dateRange || "2024 - Present",
        title: data.title,
        company: data.company || null,
        description: data.description || "",
        category: data.category || "Development",
        display_order: Number(data.displayOrder || 0),
        is_active: data.isActive !== undefined ? Boolean(data.isActive) : true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        dateRange: item.date_range,
        title: item.title,
        company: item.company,
        description: item.description,
        category: item.category,
        icon: item.icon,
        displayOrder: item.display_order,
        isActive: item.is_active,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("experience_items")
      .update({
        date_range: data.dateRange,
        title: data.title,
        company: data.company,
        description: data.description,
        category: data.category,
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
      item: {
        id: updated.id,
        dateRange: updated.date_range,
        title: updated.title,
        company: updated.company,
        description: updated.description,
        category: updated.category,
        icon: updated.icon,
        displayOrder: updated.display_order,
        isActive: updated.is_active,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from("experience_items").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience item" }, { status: 500 });
  }
}
