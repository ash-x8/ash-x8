import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Sparkles, MapPin, Briefcase } from "lucide-react";

export const revalidate = 0;

export default async function AboutPage() {
  let siteSettings: any = null;
  let aboutSection: any = null;
  let skillCategories: any[] = [];
  let experienceItems: any[] = [];
  let testimonials: any[] = [];

  try {
    [siteSettings, aboutSection, skillCategories, experienceItems, testimonials] =
      await Promise.all([
        prisma.siteSettings.findUnique({ where: { id: "1" } }).catch(() => null),
        prisma.aboutSection.findUnique({ where: { id: "1" } }).catch(() => null),
        prisma.skillCategory.findMany({
          orderBy: { displayOrder: "asc" },
          include: {
            skills: {
              where: { isActive: true },
              orderBy: { displayOrder: "asc" },
            },
          },
        }).catch(() => []),
        prisma.experienceItem.findMany({
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        }).catch(() => []),
        prisma.testimonial.findMany({
          where: { isPublished: true },
          orderBy: { displayOrder: "asc" },
        }).catch(() => []),
      ]);
  } catch (error) {
    console.error("AboutPage data error:", error);
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Header & Bio */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>ABOUT & BACKGROUND</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {aboutSection?.name || "Alex Morgan"}
              </h1>

              <div className="text-xl font-medium text-indigo-400 font-mono">
                {aboutSection?.title || "Creative Developer & Digital Designer"}
              </div>

              <p className="text-slate-300 text-lg leading-relaxed">
                {aboutSection?.longBio ||
                  "Multidisciplinary digital creator working at the intersection of application development, modern visual design, and social media content."}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-400 font-mono">
                {aboutSection?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span>{aboutSection.location}</span>
                  </div>
                )}
                {aboutSection?.availability && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">{aboutSection.availability}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 glow-box relative space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1e2c] relative">
                  {aboutSection?.profileImage ? (
                    <img
                      src={aboutSection.profileImage}
                      alt={aboutSection.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-indigo-950/40 via-[#12151e] to-[#1a1e2c]">
                      <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-3xl mb-4 border border-indigo-500/30">
                        AM
                      </div>
                      <span className="text-lg font-bold text-white">{aboutSection?.name || "Alex Morgan"}</span>
                      <span className="text-xs text-slate-400 mt-1 font-mono">
                        DESIGN → DEVELOP → CREATE
                      </span>
                    </div>
                  )}
                </div>

                {aboutSection?.personalStatement && (
                  <div className="p-4 rounded-2xl bg-[#090a0f] border border-[#222738] text-xs space-y-2">
                    <div className="font-mono text-slate-400 uppercase tracking-wider text-[10px]">
                      PERSONAL STATEMENT
                    </div>
                    <div className="text-slate-200 font-medium italic">
                      "{aboutSection.personalStatement}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Skills Breakdown By Category */}
          {skillCategories.length > 0 && (
            <section className="space-y-10 pt-10 border-t border-[#222738]">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  TECHNICAL CAPABILITIES
                </span>
                <h2 className="text-3xl font-bold text-white">Skills & Specializations</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6"
                  >
                    <h3 className="text-xl font-bold text-white border-b border-[#222738] pb-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <span>{cat.name}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cat.skills?.map((sk: any) => (
                        <div
                          key={sk.id}
                          className="p-3.5 rounded-xl bg-[#1a1e2c] border border-[#222738] space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white">
                              {sk.name}
                            </span>
                            {sk.skillLevel && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                                {sk.skillLevel}
                              </span>
                            )}
                          </div>
                          {sk.description && (
                            <p className="text-slate-400 text-xs">{sk.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Timeline */}
          {experienceItems.length > 0 && (
            <section className="space-y-10 pt-10 border-t border-[#222738]">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  CAREER JOURNEY
                </span>
                <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
              </div>

              <div className="relative pl-6 border-l-2 border-[#222738] space-y-10 max-w-4xl">
                {experienceItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#12151e] border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors" />

                    <div className="bg-[#12151e] border border-[#222738] rounded-2xl p-6 space-y-3 hover:border-indigo-500/50 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                          {item.dateRange}
                        </span>
                        {item.category && (
                          <span className="text-xs text-slate-500 uppercase font-mono">
                            {item.category}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white">
                        {item.title} {item.company && <span className="text-indigo-400">@ {item.company}</span>}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Optional Testimonials */}
          {testimonials.length > 0 && (
            <section className="space-y-10 pt-10 border-t border-[#222738]">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  ENDORSEMENTS
                </span>
                <h2 className="text-3xl font-bold text-white">What Leaders Say</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6"
                  >
                    <p className="text-slate-300 text-base leading-relaxed italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-[#222738]">
                      <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center">
                        {t.name?.[0] || "A"}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{t.name}</div>
                        <div className="text-xs text-slate-400">
                          {t.role} {t.company && `• ${t.company}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
