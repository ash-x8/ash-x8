import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import {
  getSiteSettings,
  getHeroSection,
  getAboutSection,
  getServices,
  getProjects,
  getDesignItems,
  getSocialContents,
  getTestimonials,
} from "@/lib/data";
import {
  ArrowUpRight,
  Sparkles,
  Smartphone,
  Globe,
  Palette,
  Share2,
  Terminal,
  ArrowRight,
} from "lucide-react";

export const revalidate = 0; // Dynamic rendering

export default async function HomePage() {
  const [
    siteSettings,
    heroSection,
    aboutSection,
    services,
    featuredProjects,
    designItems,
    socialContents,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroSection(),
    getAboutSection(),
    getServices(true),
    getProjects({ featuredOnly: true, publishedOnly: true }),
    getDesignItems(),
    getSocialContents(),
    getTestimonials(),
  ]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar
        siteName={siteSettings?.siteName || "ALEX MORGAN"}
        statusBadge={heroSection?.statusBadge || "Available for selected projects"}
      />

      <main className="flex-grow pt-28">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-[#222738]/80">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>{heroSection?.smallText || "DESIGN → DEVELOP → CREATE → MANAGE"}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white whitespace-pre-line">
                  {heroSection?.heading || "Designing ideas.\nBuilding experiences."}
                </h1>

                <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
                  {heroSection?.description ||
                    "Creative developer, designer and digital creator building apps, websites, brands and digital content."}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={heroSection?.primaryCtaLink || "/work"}
                    className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-600/25 flex items-center gap-2 active:scale-95"
                  >
                    <span>{heroSection?.primaryCtaText || "Explore My Work"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={heroSection?.secondaryCtaLink || "/contact"}
                    className="px-7 py-3.5 rounded-full bg-[#12151e] hover:bg-[#1a1e2c] border border-[#222738] text-white font-semibold text-sm transition-all flex items-center gap-2 active:scale-95"
                  >
                    <span>{heroSection?.secondaryCtaText || "Let's Collaborate"}</span>
                    <ArrowUpRight className="w-4 h-4 text-indigo-400" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="relative bg-[#12151e] border border-[#222738] rounded-3xl p-6 shadow-2xl space-y-6 glow-box">
                    <div className="flex items-center justify-between border-b border-[#222738] pb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                        DIGITAL STUDIO CORE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2">
                        <Smartphone className="w-5 h-5 text-indigo-400" />
                        <div className="text-xs font-bold text-white">App Engineering</div>
                        <div className="text-[10px] font-mono text-slate-400">iOS / Android / UI</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2">
                        <Globe className="w-5 h-5 text-purple-400" />
                        <div className="text-xs font-bold text-white">Web Platforms</div>
                        <div className="text-[10px] font-mono text-slate-400">Next.js / TypeScript</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2">
                        <Palette className="w-5 h-5 text-emerald-400" />
                        <div className="text-xs font-bold text-white">Graphic & Brand</div>
                        <div className="text-[10px] font-mono text-slate-400">Logos / Visuals</div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2">
                        <Share2 className="w-5 h-5 text-amber-400" />
                        <div className="text-xs font-bold text-white">Social Media</div>
                        <div className="text-[10px] font-mono text-slate-400">Content & Reels</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090a0f] border border-[#222738] font-mono text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-[#222738]">
                        <span className="flex items-center gap-1.5 text-xs text-indigo-400">
                          <Terminal className="w-3.5 h-3.5" /> studio.config.ts
                        </span>
                        <span className="text-[10px]">READY</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-purple-400">const</span> identity = &#123;
                      </div>
                      <div className="pl-4">
                        design: <span className="text-emerald-400">"Pixel-perfect UI/UX"</span>,
                      </div>
                      <div className="pl-4">
                        develop: <span className="text-emerald-400">"Full-stack Next.js"</span>,
                      </div>
                      <div className="pl-4">
                        create: <span className="text-emerald-400">"Viral Social Media"</span>
                      </div>
                      <div>&#125;;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="py-20 border-b border-[#222738]/80 bg-[#0c0e15] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              CORE PHILOSOPHY
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              "{aboutSection?.personalStatement || "I work at the intersection of design, technology and digital content."}"
            </h2>

            <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {aboutSection?.shortBio || "Multidisciplinary digital creator working across design, development, and digital content creation."}
            </p>
          </div>
        </section>

        {/* SERVICES SECTION */}
        {services.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    DISCIPLINES & CAPABILITIES
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Services Built For Scale
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>View All Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURED PROJECTS SHOWCASE */}
        {featuredProjects.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    SELECTED WORKS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Featured Applications & Web Platforms
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GRAPHIC DESIGN & VISUAL SHOWCASE */}
        {designItems.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80 bg-[#0c0e15]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    GRAPHIC & VISUAL DESIGN
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Logos, Branding & Art Direction
                  </h2>
                </div>
                <Link
                  href="/graphic-design"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>View Graphic Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {designItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#090a0f]/80 backdrop-blur-md border border-[#222738] text-indigo-400 font-semibold uppercase">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SOCIAL MEDIA SHOWCASE */}
        {socialContents.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    DIGITAL CONTENT & SOCIAL MEDIA
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Short-Form Video & Content Campaigns
                  </h2>
                </div>
                <Link
                  href="/social-media"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>Explore Social Content</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {socialContents.map((content) => (
                  <div
                    key={content.id}
                    className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-4 hover:border-indigo-500/50 transition-all"
                  >
                    {content.mediaUrl && (
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#1a1e2c]">
                        <img
                          src={content.mediaUrl}
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-md bg-[#1a1e2c] text-indigo-400">
                        {content.platform}
                      </span>
                      <span className="text-slate-500">{content.contentType}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {content.title}
                    </h3>
                    {content.description && (
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                        {content.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TESTIMONIALS */}
        {testimonials.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80 bg-[#0c0e15]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  CLIENT ENDORSEMENTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Trusted by Founders & Innovators
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6 flex flex-col justify-between"
                  >
                    <p className="text-slate-300 text-base leading-relaxed italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-[#222738]">
                      {t.photoUrl ? (
                        <img
                          src={t.photoUrl}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-lg">
                          {t.name?.[0] || "A"}
                        </div>
                      )}
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
            </div>
          </section>
        )}

        {/* CALL TO ACTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              START A PROJECT
            </span>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Ready to elevate your digital presence?
            </h2>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Let's collaborate to build high-performance mobile applications, Next.js web applications, and compelling visual brand collateral.
            </p>

            <div className="pt-4 flex justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-base hover:bg-slate-200 transition-all shadow-xl inline-flex items-center gap-2 active:scale-95"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-5 h-5 text-indigo-600" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        siteName={siteSettings?.siteName || "ALEX MORGAN"}
        tagline={siteSettings?.tagline || "Design. Develop. Create. Manage."}
        email={siteSettings?.email || "alex@morgan.studio"}
      />
    </div>
  );
}
