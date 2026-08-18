import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export const revalidate = 0;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectSlugPage({ params }: CaseStudyPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [siteSettings, project] = await Promise.all([
    getSiteSettings(),
    getProjectBySlug(slug),
  ]);

  if (!project || !project.isPublished) {
    notFound();
  }

  let tools: string[] = [];
  try {
    if (project.tools) tools = JSON.parse(project.tools);
  } catch {
    if (project.tools) tools = project.tools.split(",").map((t: string) => t.trim());
  }

  let technologies: string[] = [];
  try {
    if (project.technologies) technologies = JSON.parse(project.technologies);
  } catch {
    if (project.technologies)
      technologies = project.technologies.split(",").map((t: string) => t.trim());
  }

  const caseStudySections = [
    { key: "overview", label: "Overview", content: project.overview },
    { key: "challenge", label: "Challenge", content: project.challenge },
    { key: "research", label: "Research & Strategy", content: project.research },
    { key: "concept", label: "Concept & Architecture", content: project.concept },
    { key: "design", label: "UI/UX & Visual Design", content: project.design },
    { key: "development", label: "Engineering & Tech", content: project.development },
    { key: "testing", label: "Testing & Quality Assurance", content: project.testing },
    { key: "finalProduct", label: "Final Product", content: project.finalProduct },
    { key: "results", label: "Impact & Results", content: project.results },
  ].filter((sec) => sec.content && sec.content.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400" />
            <span>Back to All Work</span>
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 font-semibold">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#12151e] border border-[#222738] text-slate-400">
                {project.year}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-slate-300 font-normal leading-relaxed">
              {project.shortDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#12151e] border border-[#222738] text-xs">
            {project.client && (
              <div className="space-y-1">
                <span className="text-slate-500 uppercase font-mono tracking-wider text-[10px]">Client</span>
                <div className="font-semibold text-white">{project.client}</div>
              </div>
            )}
            {project.role && (
              <div className="space-y-1">
                <span className="text-slate-500 uppercase font-mono tracking-wider text-[10px]">Role</span>
                <div className="font-semibold text-white">{project.role}</div>
              </div>
            )}
            {project.year && (
              <div className="space-y-1">
                <span className="text-slate-500 uppercase font-mono tracking-wider text-[10px]">Year</span>
                <div className="font-semibold text-white">{project.year}</div>
              </div>
            )}
            <div className="space-y-1">
              <span className="text-slate-500 uppercase font-mono tracking-wider text-[10px]">Links</span>
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>GitHub</span>
                    <GithubIcon className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {project.coverImage && (
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#12151e] border border-[#222738] shadow-2xl">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {(tools.length > 0 || technologies.length > 0) && (
            <div className="p-8 rounded-3xl bg-[#12151e] border border-[#222738] space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Technology Stack & Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.concat(technologies).map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-xs font-mono text-indigo-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-12">
            {project.fullDesc && (
              <div className="prose prose-invert max-w-none space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-[#222738] pb-3">
                  Project Deep Dive
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                  {project.fullDesc}
                </p>
              </div>
            )}

            {caseStudySections.map((sec) => (
              <div
                key={sec.key}
                className="p-8 rounded-3xl bg-[#12151e] border border-[#222738] space-y-4"
              >
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{sec.label}</span>
                </div>
                <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-[#222738]">
              <h2 className="text-2xl font-bold text-white">Visual Artifacts & Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((g: any) => (
                  <div
                    key={g.id}
                    className="space-y-2 bg-[#12151e] border border-[#222738] rounded-2xl p-3"
                  >
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#1a1e2c]">
                      <img
                        src={g.imageUrl}
                        alt={g.caption || project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {g.caption && (
                      <p className="text-xs text-slate-400 text-center font-mono py-1">
                        {g.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
