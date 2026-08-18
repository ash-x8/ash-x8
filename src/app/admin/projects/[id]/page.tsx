import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectFormClient from "../ProjectFormClient";

export const revalidate = 0;

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!project) notFound();

  return <ProjectFormClient initialData={project} isEdit={true} />;
}
