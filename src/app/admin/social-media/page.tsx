import { createClient } from "@/lib/supabase/server";
import SocialMediaClient from "./SocialMediaClient";

export const revalidate = 0;

export default async function AdminSocialMediaPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("social_content")
    .select("*")
    .order("display_order", { ascending: true });

  const formattedItems = (items || []).map((i: any) => ({
    id: i.id,
    title: i.title,
    platform: i.platform,
    contentType: i.content_type,
    description: i.description,
    mediaUrl: i.media_url,
    videoUrl: i.video_url,
    url: i.url,
    campaign: i.campaign,
    date: i.date,
    isFeatured: i.is_featured,
    isPublished: i.is_published,
    displayOrder: i.display_order,
  }));

  return <SocialMediaClient initialItems={formattedItems} />;
}
