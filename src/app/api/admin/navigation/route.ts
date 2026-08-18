import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: items, error } = await supabase
      .from("navigation_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({
      items: items.map((i) => ({
        id: i.id,
        label: i.label,
        href: i.href,
        category: i.category,
        displayOrder: i.display_order,
        enabled: i.enabled,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch navigation items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: item, error } = await supabase
      .from("navigation_items")
      .insert({
        label: data.label,
        href: data.href,
        category: data.category || "Main",
        display_order: Number(data.displayOrder || 0),
        enabled: data.enabled !== undefined ? Boolean(data.enabled) : true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        label: item.label,
        href: item.href,
        category: item.category,
        displayOrder: item.display_order,
        enabled: item.enabled,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create navigation item" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("navigation_items")
      .update({
        label: data.label,
        href: data.href,
        category: data.category,
        display_order: Number(data.displayOrder || 0),
        enabled: Boolean(data.enabled),
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: updated.id,
        label: updated.label,
        href: updated.href,
        category: updated.category,
        displayOrder: updated.display_order,
        enabled: updated.enabled,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update navigation item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from("navigation_items").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete navigation item" }, { status: 500 });
  }
}
