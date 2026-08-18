import { createClient } from "@/lib/supabase/server";
import MediaClient from "./MediaClient";

export const revalidate = 0;

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const { data: assets } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  const formattedAssets = (assets || []).map((a: any) => ({
    id: a.id,
    filename: a.filename,
    filepath: a.filepath,
    filetype: a.filetype,
    filesize: a.filesize,
    createdAt: a.created_at,
  }));

  return <MediaClient initialAssets={formattedAssets} />;
}
