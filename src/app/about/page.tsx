import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getSiteSettings,
  getAboutSection,
  getSkillCategories,
  getExperienceItems,
  getTestimonials,
} from "@/lib/data";
import {
  Sparkles,
  MapPin,
  Briefcase,
  Camera,
  Palette,
  Feather,
  Globe,
  Quote,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AboutPage() {
  const [siteSettings, aboutSection, skillCategories, experienceItems, testimonials] =
    await Promise.all([
      getSiteSettings(),
      getAboutSection(),
      getSkillCategories(),
      getExperienceItems(),
      getTestimonials(),
    ]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Main Bio Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>ABOUT & BIOGRAPHY</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {aboutSection?.name || "Kushan A Wickramasinghe"}
              </h1>

              <div className="text-xl font-medium text-indigo-400 font-mono">
                {aboutSection?.title || "Photographer • Graphic Designer • Author (Ash_x8)"}
              </div>

              <p className="text-slate-300 text-lg leading-relaxed">
                {aboutSection?.longBio ||
                  "Kushan A Wickramasinghe (known as Ash_x8) is a versatile creative professional working across visual art, photography, graphic branding, and literature. He operates between commercial photography and published literature (under Writer Ash and Writer Tizzy)."}
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

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/94752269410"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-mono flex items-center gap-2 shadow-lg shadow-emerald-600/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp (0752269410)</span>
                </a>

                <a
                  href="https://cinexus-nine.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#12151e] hover:bg-[#1a1e2c] border border-[#222738] text-white font-semibold text-xs font-mono flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <span>CINEXUS Creative Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Profile Avatar / Art Card */}
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
                        X8
                      </div>
                      <span className="text-lg font-bold text-white">
                        {aboutSection?.name || "Kushan A Wickramasinghe"}
                      </span>
                      <span className="text-xs text-indigo-400 mt-1 font-mono font-semibold">
                        ASH_X8 CREATIVE STUDIO
                      </span>
                    </div>
                  )}
                </div>

                {aboutSection?.personalStatement && (
                  <div className="p-4 rounded-2xl bg-[#090a0f] border border-[#222738] text-xs space-y-2">
                    <div className="font-mono text-indigo-400 uppercase tracking-wider text-[10px] font-bold">
                      ARTIST STATEMENT
                    </div>
                    <div className="text-slate-200 font-medium italic">
                      "{aboutSection.personalStatement}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Core Disciplines Breakdown */}
          <section className="space-y-8 pt-10 border-t border-[#222738]">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                MULTIDISCIPLINARY SPECTRUM
              </span>
              <h2 className="text-3xl font-bold text-white">How I Create</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#12151e] border border-[#222738] space-y-3">
                <Camera className="w-6 h-6 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Visual Photography</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Portraiture, automotive, commercial branding, and event photography with meticulous color grading and raw retouching.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#12151e] border border-[#222738] space-y-3">
                <Palette className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Graphic & Poster Art</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Event posters, corporate certificates of excellence, typography-driven invitations, vector identity systems, and print assets.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#12151e] border border-[#222738] space-y-3">
                <Feather className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Authored Literature</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Writing and publishing thought pieces, poetry, and stories under Writer Ash and Writer Tizzy personas.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Skills Matrix */}
          {skillCategories.length > 0 && (
            <section className="space-y-10 pt-10 border-t border-[#222738]">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  CREATIVE & TECHNICAL TOOLKIT
                </span>
                <h2 className="text-3xl font-bold text-white">Skills Matrix</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-6 rounded-3xl bg-[#12151e] border border-[#222738] space-y-4"
                  >
                    <h3 className="text-base font-bold text-white flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1a1e2c] text-indigo-400">
                        {category.skills.length} tools
                      </span>
                    </h3>

                    <div className="space-y-3">
                      {category.skills.map((skill: { name: string; proficiency?: number }) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-medium">{skill.name}</span>
                            <span className="text-slate-500 font-mono">{skill.proficiency || 90}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-[#1a1e2c] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                              style={{ width: `${skill.proficiency || 90}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Career Journey Timeline */}
          {experienceItems.length > 0 && (
            <section className="space-y-10 pt-10 border-t border-[#222738]">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  CAREER & JOURNEY
                </span>
                <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
              </div>

              <div className="space-y-6">
                {experienceItems.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-3xl bg-[#12151e] border border-[#222738] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        {exp.isActive && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 text-[10px] font-mono font-semibold">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-indigo-400 font-mono">
                        {exp.company || exp.category || "Creative Practice"}
                      </div>
                      {exp.description && (
                        <p className="text-slate-400 text-xs pt-2 max-w-2xl leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>

                    <div className="text-xs font-mono text-slate-400 md:text-right flex-shrink-0">
                      {exp.dateRange}
                    </div>
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
