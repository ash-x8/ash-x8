import { getExperienceItems } from "@/lib/data";
import ExperienceClient from "./ExperienceClient";

export const revalidate = 0;

export default async function AdminExperiencePage() {
  const items = await getExperienceItems();

  return <ExperienceClient initialItems={items} />;
}
