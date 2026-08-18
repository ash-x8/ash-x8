import { getWritingItems } from "@/lib/data";
import WritingClient from "./WritingClient";

export default async function AdminWritingPage() {
  const items = await getWritingItems();
  return <WritingClient initialItems={items} />;
}
