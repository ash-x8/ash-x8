import { getPhotographyItems } from "@/lib/data";
import PhotographyClient from "./PhotographyClient";

export default async function AdminPhotographyPage() {
  const items = await getPhotographyItems();
  return <PhotographyClient initialItems={items} />;
}
