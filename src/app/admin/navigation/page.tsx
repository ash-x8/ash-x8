import { createClient } from "@/lib/supabase/server";
import NavigationClient from "./NavigationClient";

export const revalidate = 0;

export default async function AdminNavigationPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("navigation_items")
    .select("*")
    .order("display_order", { ascending: true });

  const formattedItems = (items || []).map((i: any) => ({
    id: i.id,
    label: i.label,
    href: i.href,
    category: i.category,
    displayOrder: i.display_order,
    enabled: i.enabled,
  }));

  return <NavigationClient initialItems={formattedItems} />;
}
