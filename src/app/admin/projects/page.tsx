import { getProjects } from "@/lib/data";
import ProjectsClient from "./ProjectsClient";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await getProjects({ publishedOnly: false });

  return <ProjectsClient initialProjects={projects} />;
}
