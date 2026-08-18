import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const revalidate = 0;

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category;

  let siteSettings: any = null;
  let projects: any[] = [];

  try {
    [siteSettings, projects] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "1" } }).catch(() => null),
      prisma.project.findMany({
        where: {
          isPublished: true,
          ...(currentCategory ? { category: { equals: currentCategory } } : {}),
        },
        orderBy: { displayOrder: "asc" },
      }).catch(() => []),
    ]);
  } catch (error) {
    console.error("WorkPage data fetching error:", error);
  }

  const categories = ["All", "Apps", "Web", "UI/UX", "Graphic Design", "Branding", "Social Media", "Content"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>PORTFOLIO ARCHIVE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Selected Work & Case Studies
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Explore cross-platform mobile apps, bespoke Next.js web systems, brand identities, and social media campaigns.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive =
                (!currentCategory && cat === "All") || currentCategory === cat;
              const href = cat === "All" ? "/work" : `/work?category=${encodeURIComponent(cat)}`;

              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-5 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                      : "bg-[#12151e] border border-[#222738] text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white">No Projects Found</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                There are currently no published projects under this category.
              </p>
              <Link
                href="/work"
                className="inline-block px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-mono"
              >
                View All Work
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
