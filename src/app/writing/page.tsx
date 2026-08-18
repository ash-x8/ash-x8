import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getWritingItems } from "@/lib/data";
import { Feather, Sparkles, BookOpen } from "lucide-react";

export const revalidate = 0;

interface WritingPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function WritingPage({ searchParams }: WritingPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category;

  const [siteSettings, writings] = await Promise.all([
    getSiteSettings(),
    getWritingItems(currentCategory),
  ]);

  const categories = ["All", "Article", "Story", "Poem", "Publication", "Essay"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ASH-X8"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Feather className="w-3.5 h-3.5 text-indigo-400" />
              <span>AUTHOR & CREATIVE LITERATURE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Writing & Authored Works
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Published articles, creative stories, and poetry authored by Kushan A Wickramasinghe under literary personas Writer Ash & Writer Tizzy.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = (!currentCategory && cat === "All") || currentCategory === cat;
              const href = cat === "All" ? "/writing" : `/writing?category=${encodeURIComponent(cat)}`;

              return (
                <a
                  key={cat}
                  href={href}
                  className={`px-5 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                      : "bg-[#12151e] border border-[#222738] text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {cat}
                </a>
              );
            })}
          </div>

          {/* Writings Grid */}
          {writings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {writings.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 uppercase font-semibold">
                        {item.category}
                      </span>
                      <span className="text-slate-500">{item.authorAlias}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.excerpt}</p>
                  </div>

                  <div className="pt-4 border-t border-[#222738] font-mono text-xs text-slate-500 flex items-center justify-between">
                    <span>{item.publicationDate || "2024"}</span>
                    <span className="text-indigo-400 font-semibold flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Read
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white">No Writing Publications Listed</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Authored literary works will appear here soon.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ASH-X8"} />
    </div>
  );
}
