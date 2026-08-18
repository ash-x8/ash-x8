import { createClient } from "@/lib/supabase/server";
import ContactClient from "./ContactClient";

export const revalidate = 0;

export default async function AdminContactPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  const formattedMsgs = (messages || []).map((m: any) => ({
    id: m.id,
    senderName: m.sender_name,
    email: m.email,
    projectType: m.project_type,
    message: m.message,
    status: m.status,
    createdAt: m.created_at,
  }));

  return <ContactClient initialMessages={formattedMsgs} />;
}
