import { createClient } from "@/lib/supabase/server";
import DesignClient from "./DesignClient";

export const revalidate = 0;

export default async function AdminDesignPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("design_items")
    .select("*")
    .order("display_order", { ascending: true });

  const formattedItems = (items || []).map((i: any) => ({
    id: i.id,
    title: i.title,
    category: i.category,
    description: i.description,
    imageUrl: i.image_url,
    year: i.year,
    isFeatured: i.is_featured,
    isPublished: i.is_published,
    displayOrder: i.display_order,
  }));

  return <DesignClient initialItems={formattedItems} />;
}
