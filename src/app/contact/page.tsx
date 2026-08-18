import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { prisma } from "@/lib/prisma";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export const revalidate = 0;

export default async function ContactPage() {
  let siteSettings: any = null;
  let aboutSection: any = null;
  let socialLinks: any[] = [];

  try {
    [siteSettings, aboutSection, socialLinks] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "1" } }).catch(() => null),
      prisma.aboutSection.findUnique({ where: { id: "1" } }).catch(() => null),
      prisma.socialLink.findMany({
        where: { enabled: true },
        orderBy: { displayOrder: "asc" },
      }).catch(() => []),
    ]);
  } catch (error) {
    console.error("ContactPage error:", error);
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <Navbar siteName={siteSettings?.siteName || "ALEX MORGAN"} />

      <main className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12151e] border border-[#222738] text-xs font-mono text-indigo-400 font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>START A CONVERSATION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Let's Build Something Exceptional
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Have a product concept, web project, branding initiative, or content campaign in mind? Fill out the proposal form below or reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-8 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white">Direct Information</h2>

              <div className="space-y-6">
                {siteSettings?.email && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-slate-500">Email Address</span>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-white hover:text-indigo-400 text-base font-semibold block transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-indigo-400" />
                      <span>{siteSettings.email}</span>
                    </a>
                  </div>
                )}

                {siteSettings?.phone && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-slate-500">Direct Phone</span>
                    <div className="text-white text-base font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-indigo-400" />
                      <span>{siteSettings.phone}</span>
                    </div>
                  </div>
                )}

                {siteSettings?.location && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-slate-500">Location</span>
                    <div className="text-white text-base font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span>{siteSettings.location}</span>
                    </div>
                  </div>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div className="pt-6 border-t border-[#222738] space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    Connect Across Networks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#1a1e2c] border border-[#222738] text-xs font-mono text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer siteName={siteSettings?.siteName || "ALEX MORGAN"} />
    </div>
  );
}
