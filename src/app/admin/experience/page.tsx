import { prisma } from "@/lib/prisma";
import ExperienceClient from "./ExperienceClient";

export const revalidate = 0;

export default async function AdminExperiencePage() {
  const items = await prisma.experienceItem.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <ExperienceClient initialItems={items} />;
}
