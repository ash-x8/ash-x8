import { prisma } from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <ProjectsClient initialProjects={projects} />;
}
