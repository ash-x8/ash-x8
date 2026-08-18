import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";
import { Globe, Sparkles, Terminal } from "lucide-react";

export const revalidate = 0;

export default async function WebDevelopmentPage() {
  const [siteSettings, webProjects] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "1" } }),
    prisma.project.findMany({
      where: { isPublished: true, category: { equals: "Web" } },
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>WEB APPLICATIONS & INTERACTIVE PLATFORMS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Web Development & SaaS Architecture
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Ultra-fast Next.js applications, serverless telemetry dashboards, e-commerce platforms, and interactive brand micro-sites.
            </p>
          </div>

          {/* Grid */}
          {webProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white">No Web Projects Listed</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Check back soon or explore our general work archive.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
