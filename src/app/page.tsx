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
  getPhotographyItems,
  getWritingItems,
  getTestimonials,
} from "@/lib/data";
import {
  ArrowUpRight,
  Sparkles,
  Camera,
  Palette,
  Feather,
  Globe,
  ArrowRight,
  MessageCircle,
  Quote,
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
    photographyItems,
    writingItems,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroSection(),
    getAboutSection(),
    getServices(true),
    getProjects({ featuredOnly: true, publishedOnly: true }),
    getDesignItems(),
    getPhotographyItems(),
    getWritingItems(),
    getTestimonials(),
  ]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar
        siteName={siteSettings?.siteName || "ASH-X8 — Kushan A Wickramasinghe"}
        statusBadge={heroSection?.statusBadge || "Available for selected projects & commissions"}
      />

      <main className="flex-grow pt-28">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-[#222738]/80">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/15 blur-[160px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>{heroSection?.smallText || "PHOTOGRAPHY → GRAPHIC DESIGN → AUTHOR → CREATIVE DIRECTION"}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-medium">
                    KUSHAN A WICKRAMASINGHE
                  </span>
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.06] text-white">
                    {heroSection?.heading || "Visual Artistry.\nCinematic Vision.\nTimeless Words."}
                  </h1>
                </div>

                <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
                  {heroSection?.description ||
                    "Multidisciplinary digital artist crafting high-impact photography, visual graphic designs, brand identity systems, and published creative literature."}
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={heroSection?.primaryCtaLink || "/work"}
                    className="px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-600/25 flex items-center gap-2 active:scale-95 group"
                  >
                    <span>{heroSection?.primaryCtaText || "Explore My Work"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href="https://wa.me/94752269410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-400 font-semibold text-sm transition-all flex items-center gap-2 active:scale-95 font-mono"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp: 0752269410</span>
                  </a>

                  <Link
                    href="/about"
                    className="px-6 py-3.5 rounded-full bg-[#12151e] hover:bg-[#1a1e2c] border border-[#222738] text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
                  >
                    <span>Read Biography</span>
                    <ArrowUpRight className="w-4 h-4 text-indigo-400" />
                  </Link>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#222738]/80 max-w-lg">
                  <div>
                    <div className="text-2xl font-extrabold text-white font-mono">120+</div>
                    <div className="text-xs text-slate-400">Creative Works</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-indigo-400 font-mono">5+ Yrs</div>
                    <div className="text-xs text-slate-400">Industry Practice</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white font-mono">100%</div>
                    <div className="text-xs text-slate-400">Client Delivery</div>
                  </div>
                </div>
              </div>

              {/* Visual Spotlight Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="relative bg-[#12151e] border border-[#222738] rounded-3xl p-6 shadow-2xl space-y-6 glow-box">
                    <div className="flex items-center justify-between border-b border-[#222738] pb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                        ASH_X8 CREATIVE SUITE
                      </span>
                    </div>

                    {/* Discipline Blocks */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/photography"
                        className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2 hover:border-indigo-500/50 hover:bg-[#222738] transition-all group"
                      >
                        <Camera className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">Photography</div>
                        <div className="text-[10px] font-mono text-slate-400">Sony A7IV • Retouching</div>
                      </Link>

                      <Link
                        href="/graphic-design"
                        className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2 hover:border-purple-500/50 hover:bg-[#222738] transition-all group"
                      >
                        <Palette className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">Graphic Design</div>
                        <div className="text-[10px] font-mono text-slate-400">Posters • Certificates</div>
                      </Link>

                      <Link
                        href="/writing"
                        className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2 hover:border-emerald-500/50 hover:bg-[#222738] transition-all group"
                      >
                        <Feather className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">Author & Literature</div>
                        <div className="text-[10px] font-mono text-slate-400">Writer Ash • Tizzy</div>
                      </Link>

                      <a
                        href="https://cinexus-nine.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-[#1a1e2c] border border-[#222738] space-y-2 hover:border-amber-500/50 hover:bg-[#222738] transition-all group"
                      >
                        <Globe className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span>CINEXUS Hub</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">Color Grading Studio</div>
                      </a>
                    </div>

                    {/* Signature Quote Terminal */}
                    <div className="p-4 rounded-2xl bg-[#090a0f] border border-[#222738] font-mono text-[11px] text-slate-300 space-y-1.5">
                      <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-[#222738]">
                        <span className="flex items-center gap-1.5 text-xs text-indigo-400">
                          <Sparkles className="w-3.5 h-3.5" /> artist.statement
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">ONLINE</span>
                      </div>
                      <p className="text-slate-400 pt-1 leading-relaxed text-xs italic font-sans">
                        "{aboutSection?.personalStatement || "Capturing authentic moments. Designing bold visual narratives. Writing timeless stories."}"
                      </p>
                      <div className="text-[10px] text-slate-500 pt-1 font-mono">
                        — Kushan A Wickramasinghe (Ash_x8)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION & PHILOSOPHY */}
        <section className="py-20 border-b border-[#222738]/80 bg-[#0c0e15] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              ARTISTIC PERSPECTIVE
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              "{aboutSection?.personalStatement || "Capturing authentic moments. Designing bold visual narratives. Writing timeless stories."}"
            </h2>

            <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {aboutSection?.longBio ||
                "Working across visual arts and creative literature, Kushan A Wickramasinghe brings a unique cinematic perspective to photography, graphic design, social media campaigns, and authored works."}
            </p>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                href="/about"
                className="px-6 py-2.5 rounded-full bg-[#1a1e2c] hover:bg-[#222738] border border-[#222738] text-xs font-semibold text-white transition-all inline-flex items-center gap-2"
              >
                <span>Read Full Biography & Career Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              </Link>
            </div>
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
                    Services Built With Creative Precision
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                >
                  <span>View All Capabilities & Packages</span>
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

        {/* FEATURED CASE STUDIES & PROJECTS */}
        {featuredProjects.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80 bg-[#0c0e15]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    SELECTED WORKS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Featured Case Studies & Creative Platforms
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                >
                  <span>Explore Full Portfolio Archive</span>
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

        {/* PHOTOGRAPHY SPOTLIGHT */}
        {photographyItems.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    VISUAL GALLERY
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Photography & Portraiture
                  </h2>
                </div>
                <Link
                  href="/photography"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                >
                  <span>View All Photos & EXIF</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photographyItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-3xl bg-[#12151e] border border-[#222738] shadow-2xl transition-all duration-300 hover:border-indigo-500/50"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent opacity-80" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#090a0f]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-indigo-300 font-semibold">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 space-y-1">
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </h3>
                        {item.cameraInfo && (
                          <p className="text-xs font-mono text-slate-400">{item.cameraInfo}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GRAPHIC DESIGN SHOWCASE */}
        {designItems.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80 bg-[#0c0e15]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    GRAPHIC & POSTER ART
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Posters, Certificates & Brand Collaterals
                  </h2>
                </div>
                <Link
                  href="/graphic-design"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                >
                  <span>Explore Design Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-3xl bg-[#12151e] border border-[#222738] shadow-2xl transition-all duration-300 hover:border-purple-500/50"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent opacity-80" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-[#090a0f]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-purple-300 font-semibold">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 space-y-1">
                        <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* AUTHOR & WRITING SPOTLIGHT */}
        {writingItems.length > 0 && (
          <section className="py-24 border-b border-[#222738]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                    LITERATURE & ESSAYS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Authored by Writer Ash / Tizzy
                  </h2>
                </div>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                >
                  <span>Read All Articles & Poems</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {writingItems.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="p-8 rounded-3xl bg-[#12151e] border border-[#222738] space-y-5 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-mono text-xs font-semibold">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{item.authorAlias}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>

                      <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-emerald-500/40 pl-4">
                        "{item.excerpt}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#222738] flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500">{item.publicationDate || "2024"}</span>
                      <Link
                        href="/writing"
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                      >
                        <span>Read Full Text</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  CLIENT & COLLABORATOR FEEDBACK
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Trusted By Creators & Institutions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-8 rounded-3xl bg-[#12151e] border border-[#222738] space-y-6 relative"
                  >
                    <Quote className="w-8 h-8 text-indigo-500/20" />
                    <p className="text-base text-slate-300 leading-relaxed">"{t.quote}"</p>

                    <div className="flex items-center gap-4 pt-2 border-t border-[#222738]">
                      {t.photoUrl && (
                        <img
                          src={t.photoUrl}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#222738]"
                        />
                      )}
                      <div>
                        <div className="font-bold text-white text-sm">{t.name}</div>
                        <div className="text-xs text-indigo-400 font-mono">
                          {t.role} {t.company ? `• ${t.company}` : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM CTA BANNER */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              START A PROJECT
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Have a Creative Vision in Mind?
            </h2>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              Whether you need commercial photography, bespoke event posters, official certificates, or brand creative direction, let's bring it to life.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/94752269410"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-xl shadow-emerald-600/25 flex items-center gap-2 font-mono active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (0752269410)</span>
              </a>

              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-[#12151e] hover:bg-[#1a1e2c] border border-[#222738] text-white font-semibold text-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Send Contact Inquiry</span>
                <ArrowRight className="w-4 h-4 text-indigo-400" />
              </Link>
            </div>
          </div>
        </section>
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
