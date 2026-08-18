import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    const { data: updated, error } = await supabase
      .from("site_settings")
      .upsert({
        id: "1",
        site_name: data.siteName,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        location: data.location,
        timezone: data.timezone,
        accent_color: data.accentColor,
        analytics_id: data.analyticsId,
        maintenance_mode: Boolean(data.maintenanceMode),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 });
  }
}
