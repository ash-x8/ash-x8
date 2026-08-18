import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Share2, Play } from "lucide-react";

export const revalidate = 0;

export default async function SocialMediaPage() {
  let siteSettings: any = null;
  let socialItems: any[] = [];

  try {
    [siteSettings, socialItems] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "1" } }).catch(() => null),
      prisma.socialContent.findMany({
        where: { isPublished: true },
        orderBy: { displayOrder: "asc" },
      }).catch(() => []),
    ]);
  } catch (error) {
    console.error("SocialMediaPage error:", error);
  }

  const workflowSteps = [
    { step: "01", name: "Research", desc: "Audience demographics, trending formats, competitor benchmark." },
    { step: "02", name: "Strategy", desc: "Content pillars, platform matrix, tone of voice, KPI mapping." },
    { step: "03", name: "Planning", desc: "Editorial calendar, storyboards, scripting, shotlists." },
    { step: "04", name: "Design", desc: "High-CTR thumbnails, visual carousels, key campaign graphics." },
    { step: "05", name: "Editing", desc: "High-retention short-form video, motion typography, sound design." },
    { step: "06", name: "Publishing", desc: "Optimal scheduling, tagging, automated distribution." },
    { step: "07", name: "Analysis", desc: "Watch time, engagement rates, click-through conversions." },
    { step: "08", name: "Optimization", desc: "Iterative hooks testing, A/B thumbnail trials, continuous growth." },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>CONTENT CREATION & SOCIAL STRATEGY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Social Media & Video Editing
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Viral short-form video editing (Reels, TikToks, Shorts), high-CTR YouTube thumbnails, social carousels, and end-to-end campaign execution.
            </p>
          </div>

          <section className="space-y-8 p-8 sm:p-10 rounded-3xl bg-[#12151e] border border-[#222738]">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                SERVICE PRESENTATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Social Media Management Process
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 pt-4">
              {workflowSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2 relative"
                >
                  <div className="text-xs font-mono font-bold text-indigo-400">
                    {s.step}
                  </div>
                  <div className="text-sm font-bold text-white">{s.name}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                CONTENT SHOWCASE
              </span>
              <h2 className="text-3xl font-bold text-white">Featured Campaign Assets & Reels</h2>
            </div>

            {socialItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {socialItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {item.mediaUrl && (
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#1a1e2c] relative group">
                          <img
                            src={item.mediaUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {item.contentType?.toLowerCase().includes("video") || item.contentType?.toLowerCase().includes("reel") ? (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 fill-white ml-0.5" />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="px-2.5 py-1 rounded-md bg-[#1a1e2c] text-indigo-400 font-semibold">
                          {item.platform}
                        </span>
                        <span className="text-slate-400">{item.contentType}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.campaign && (
                      <div className="pt-4 border-t border-[#222738] text-[11px] font-mono text-slate-500 flex items-center justify-between">
                        <span>Campaign: {item.campaign}</span>
                        {item.date && <span>{item.date}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white">No Content Available</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  There are currently no published social media content items.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
