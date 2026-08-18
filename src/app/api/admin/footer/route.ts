import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: socialLinks } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    const { data: settings } = await supabase
      .from("site_settings")
      .select("tagline")
      .eq("id", "1")
      .single();

    return NextResponse.json({
      socialLinks: (socialLinks || []).map((l) => ({
        id: l.id,
        platform: l.platform,
        url: l.url,
        enabled: l.enabled,
      })),
      settings,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch footer settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    if (data.tagline) {
      await supabase.from("site_settings").upsert({ id: "1", tagline: data.tagline });
    }

    if (Array.isArray(data.socialLinks)) {
      for (const link of data.socialLinks) {
        if (link.platform && link.url) {
          await supabase.from("social_links").upsert({
            platform: link.platform,
            url: link.url,
            enabled: Boolean(link.enabled),
          }, { onConflict: "platform" });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update footer settings" }, { status: 500 });
  }
}
