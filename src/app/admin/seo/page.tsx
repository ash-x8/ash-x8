import { createClient } from "@/lib/supabase/server";
import SeoClient from "./SeoClient";

export const revalidate = 0;

export default async function AdminSeoPage() {
  const supabase = await createClient();
  const { data: list } = await supabase.from("seo_settings").select("*");

  const formatted = (list || []).map((s: any) => ({
    pagePath: s.page_path,
    metaTitle: s.meta_title,
    metaDescription: s.meta_description,
    keywords: s.keywords,
  }));

  return <SeoClient initialSeoList={formatted} />;
}
