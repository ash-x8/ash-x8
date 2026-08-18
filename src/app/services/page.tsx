import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { prisma } from "@/lib/prisma";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function ServicesPage() {
  let siteSettings: any = null;
  let services: any[] = [];

  try {
    [siteSettings, services] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "1" } }).catch(() => null),
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      }).catch(() => []),
    ]);
  } catch (error) {
    console.error("ServicesPage error:", error);
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Services & Digital Solutions
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Comprehensive multidisciplinary services covering application engineering, Next.js web platforms, UI/UX systems, visual branding, and social video editing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {services.length > 0 && (
            <div className="space-y-12 pt-12 border-t border-[#222738]">
              <h2 className="text-3xl font-bold text-white">Detailed Offerings</h2>
              <div className="space-y-8">
                {services.map((service) => (
                  <div
                    id={service.slug}
                    key={service.id}
                    className="p-8 rounded-3xl bg-[#12151e] border border-[#222738] space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                        0{service.displayOrder}
                      </span>
                    </div>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {service.longDesc || service.shortDesc}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        <span>Request Proposal for {service.title}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
