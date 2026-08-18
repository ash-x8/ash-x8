import { getSkillCategories } from "@/lib/data";
import SkillsClient from "./SkillsClient";

export const revalidate = 0;

export default async function AdminSkillsPage() {
  const categories = await getSkillCategories();

  return <SkillsClient initialCategories={categories} />;
}
