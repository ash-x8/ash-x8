import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { getSiteSettings, getServices } from "@/lib/data";
import { Sparkles, ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function ServicesPage() {
  const [siteSettings, services] = await Promise.all([
    getSiteSettings(),
    getServices(true),
  ]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>CREATIVE CAPABILITIES & SERVICES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Services & Production
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Tailored creative offerings across commercial photography, visual posters, certificate design, authored literary content, and multimedia production by Kushan A Wickramasinghe.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Detailed Offerings Breakdown */}
          {services.length > 0 && (
            <div className="space-y-10 pt-12 border-t border-[#222738]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  DETAILED SCOPE & DELIVERABLES
                </span>
                <h2 className="text-3xl font-bold text-white mt-1">Package Breakdown</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <div
                    id={service.slug}
                    key={service.id}
                    className="p-8 rounded-3xl bg-[#12151e] border border-[#222738] space-y-5 flex flex-col justify-between hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 font-semibold">
                          0{service.displayOrder}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {service.longDesc || service.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#222738] flex items-center justify-between gap-4">
                      <a
                        href={`https://wa.me/94752269410?text=${encodeURIComponent(
                          `Hi Kushan, I would like to book your service: "${service.title}".`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book on WhatsApp</span>
                      </a>

                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        <span>Send RFP Inquiry</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
