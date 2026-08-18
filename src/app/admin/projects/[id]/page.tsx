import { getProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectFormClient from "../ProjectFormClient";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!project) notFound();

  return (
    <ProjectFormClient
      initialData={{
        id: project.id,
        title: project.title,
        slug: project.slug,
        category: project.category,
        year: project.year,
        client: project.client,
        role: project.role,
        shortDesc: project.short_desc,
        fullDesc: project.full_desc,
        tools: JSON.stringify(project.tools || []),
        technologies: JSON.stringify(project.technologies || []),
        coverImage: project.cover_image,
        videoUrl: project.video_url,
        liveUrl: project.live_url,
        githubUrl: project.github_url,
        isFeatured: project.is_featured,
        isPublished: project.is_published,
        displayOrder: project.display_order,
        overview: project.overview,
        challenge: project.challenge,
        research: project.research,
        concept: project.concept,
        design: project.design,
        development: project.development,
        testing: project.testing,
        finalProduct: project.final_product,
        results: project.results,
      }}
      isEdit={true}
    />
  );
}
