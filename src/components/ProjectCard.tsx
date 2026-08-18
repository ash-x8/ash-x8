import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles, Folder } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    shortDesc: string;
    category: string;
    year: string;
    coverImage?: string | null;
    tools?: string | null;
    technologies?: string | null;
    liveUrl?: string | null;
    githubUrl?: string | null;
    isFeatured?: boolean;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  let parsedTools: string[] = [];
  try {
    if (project.tools) {
      parsedTools = JSON.parse(project.tools);
    }
  } catch {
    if (project.tools) parsedTools = project.tools.split(",").map((t) => t.trim());
  }

  return (
    <div className="group relative bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-950/20">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] w-full bg-[#1a1e2c] overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 bg-gradient-to-br from-[#12151e] to-[#1a1e2c]">
            <Folder className="w-12 h-12 stroke-[1.5]" />
          </div>
        )}

        {/* Category & Year Tag */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-[#090a0f]/80 backdrop-blur-md border border-[#222738] text-indigo-400 font-semibold uppercase">
            {project.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#090a0f]/80 backdrop-blur-md border border-[#222738] text-slate-400">
            {project.year}
          </span>
        </div>

        {/* Action Link Overlay */}
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${project.title}`}
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <div className="p-2 rounded-full bg-[#1a1e2c] text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
            {project.shortDesc}
          </p>
        </div>

        {/* Tool Tags & External Links */}
        <div className="pt-4 border-t border-[#222738]/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            {parsedTools.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-[#1a1e2c] text-slate-300 font-mono text-[11px]"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 relative z-20">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="View Source Code"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-indigo-400 transition-colors"
                title="Visit Live Site"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
