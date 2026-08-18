import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const payload = {
      id: "1",
      heading: data.heading,
      subtitle: data.subtitle,
      description: data.description,
      primary_cta_text: data.primaryCtaText,
      primary_cta_link: data.primaryCtaLink,
      secondary_cta_text: data.secondaryCtaText,
      secondary_cta_link: data.secondaryCtaLink,
      status_badge: data.statusBadge,
      small_text: data.smallText,
      hero_image: data.heroImage,
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error } = await supabase
      .from("hero_section")
      .upsert(payload)
      .select()
      .single();

    if (error) {
      console.error("Supabase hero update error:", error);
      return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
    }

    return NextResponse.json({ success: true, hero: updated });
  } catch (error) {
    console.error("Hero update error:", error);
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
  }
}
