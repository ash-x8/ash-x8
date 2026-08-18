import { prisma } from "@/lib/prisma";
import SkillsClient from "./SkillsClient";

export const revalidate = 0;

export default async function AdminSkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { displayOrder: "asc" },
    include: { skills: { orderBy: { displayOrder: "asc" } } },
  });

  return <SkillsClient initialCategories={categories} />;
}
