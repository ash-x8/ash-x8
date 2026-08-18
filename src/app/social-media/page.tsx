import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getSocialContents } from "@/lib/data";
import { Share2, Play, ArrowUpRight } from "lucide-react";
import {
  YoutubeIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  TiktokIcon,
} from "@/components/SocialIcons";

export const revalidate = 0;

export default async function SocialMediaPage() {
  const [siteSettings, socialItems] = await Promise.all([
    getSiteSettings(),
    getSocialContents(),
  ]);

  const channels = [
    { name: "TikTok", handle: "@Ash_x8", url: "https://vm.tiktok.com/ZS9Ypfen3rcYL-KiVCP/", icon: TiktokIcon, desc: "Shorts, creative video clips & cinematic edits" },
    { name: "YouTube", handle: "@Ash-x8", url: "https://www.youtube.com/@Ash-x8", icon: YoutubeIcon, desc: "Video projects, creative vlogs & tutorials" },
    { name: "Facebook", handle: "Kushan A Wickramasinghe", url: "https://www.facebook.com/share/1UeTQSvLik/", icon: FacebookIcon, desc: "Photo releases, community updates & artwork" },
    { name: "LinkedIn", handle: "Kushan A Wickramasinghe", url: "https://www.linkedin.com/in/kushan-a-wickramasinghe-28b1aa2a0", icon: LinkedinIcon, desc: "Professional network & creative collaborations" },
    { name: "Telegram", handle: "@kawickramasinghe", url: "https://t.me/kawickramasinghe", icon: TelegramIcon, desc: "Direct communications & project inquiries" },
    { name: "WhatsApp", handle: "0752269410", url: "https://wa.me/94752269410", icon: WhatsappIcon, desc: "Fastest project booking & photo shoot scheduling" },
  ];

  const workflowSteps = [
    { step: "01", name: "Concept", desc: "Audience insights, viral hook ideation, theme exploration." },
    { step: "02", name: "Scripting", desc: "Short-form narration, shotlists, rhythm & storytelling." },
    { step: "03", name: "Capture", desc: "4K cinematography, lighting setups, dynamic B-roll." },
    { step: "04", name: "Edit", desc: "Pacing, cinematic color grading, sound design & SFX." },
    { step: "05", name: "Graphics", desc: "High-CTR cover thumbnails, motion kinetic typography." },
    { step: "06", name: "Distribution", desc: "Multi-platform publishing (TikTok, Reels, YouTube Shorts)." },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>DIGITAL CAMPAIGNS & REELS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Social Media & Video Production
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Engaging short-form videos (TikToks, Reels, YouTube Shorts), eye-catching thumbnails, and multi-channel creative storytelling by Kushan A Wickramasinghe (Ash_x8).
            </p>
          </div>

          {/* Official Channels Grid */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                DIRECT PLATFORMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Official Channels & Profiles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.name}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 rounded-3xl bg-[#12151e] border border-[#222738] hover:border-indigo-500/50 hover:bg-[#1a1e2c] transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-[#090a0f] border border-[#222738] text-indigo-400 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-base">{ch.name}</div>
                          <div className="text-xs text-indigo-400 font-mono">{ch.handle}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{ch.desc}</p>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Production Workflow */}
          <section className="space-y-8 p-8 sm:p-10 rounded-3xl bg-[#12151e] border border-[#222738]">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                CREATIVE PIPELINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Short-Form Video & Reel Production Process
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
              {workflowSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2"
                >
                  <div className="text-xs font-mono font-bold text-indigo-400">{s.step}</div>
                  <div className="text-sm font-bold text-white">{s.name}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Social Showcase List */}
          {socialItems.length > 0 && (
            <section className="space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  CONTENT SHOWCASE
                </span>
                <h2 className="text-3xl font-bold text-white">Featured Campaign Assets</h2>
              </div>

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
                          {item.contentType?.toLowerCase().includes("video") ||
                          item.contentType?.toLowerCase().includes("reel") ? (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 fill-white ml-0.5" />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                            {item.platform}
                          </span>
                          <span className="text-slate-500">{item.contentType}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        {item.description && (
                          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {(item.url || item.videoUrl) && (
                      <div className="pt-4 border-t border-[#222738]">
                        <a
                          href={item.url || item.videoUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          <span>View on {item.platform}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer
        siteName={siteSettings?.siteName}
        tagline={siteSettings?.tagline}
        email={siteSettings?.email}
        phone={siteSettings?.phone}
        whatsappUrl={siteSettings?.whatsappUrl}
      />
    </div>
  );
}
