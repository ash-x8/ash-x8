import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getWritingItems } from "@/lib/data";
import { Feather } from "lucide-react";
import WritingReaderClient from "./WritingReaderClient";

export const revalidate = 0;

interface WritingPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function WritingPage({ searchParams }: WritingPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category || "All";

  const [siteSettings, writings] = await Promise.all([
    getSiteSettings(),
    getWritingItems(),
  ]);

  const categories = ["All", "Article", "Story", "Poem", "Publication", "Essay"];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              <Feather className="w-3.5 h-3.5 text-emerald-400" />
              <span>AUTHOR & CREATIVE LITERATURE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Writing & Authored Works
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Published articles, creative stories, and reflective poetry authored by Kushan A Wickramasinghe under literary personas Writer Ash & Writer Tizzy.
            </p>
          </div>

          {/* Interactive Reader Client */}
          <WritingReaderClient
            writings={writings}
            categories={categories}
            currentCategory={currentCategory}
          />
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
