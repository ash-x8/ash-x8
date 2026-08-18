import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings, getAboutSection, getSocialLinks } from "@/lib/data";
import { Sparkles, Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function ContactPage() {
  const [siteSettings, aboutSection, socialLinks] = await Promise.all([
    getSiteSettings(),
    getAboutSection(),
    getSocialLinks(),
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
              <span>START A CONVERSATION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Let's Create Something Memorable
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Have a commercial photography shoot, graphic poster commission, certificate system, or creative literature collaboration in mind? Reach out below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Direct Details Sidebar */}
            <div className="lg:col-span-5 space-y-8 bg-[#12151e] border border-[#222738] rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white">Direct Information</h2>

              <div className="space-y-6">
                {/* WhatsApp Quick Action */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
                  <div className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Chat</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Fastest response for photo shoot bookings and urgent graphic commissions.
                  </p>
                  <a
                    href="https://wa.me/94752269410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block pt-1 text-emerald-400 hover:text-emerald-300 font-mono font-bold text-sm underline underline-offset-4"
                  >
                    +94 75 226 9410 / 0752269410 →
                  </a>
                </div>

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
                    <span className="text-xs font-mono uppercase text-slate-500">Direct Contact</span>
                    <a
                      href={`tel:${siteSettings.phone}`}
                      className="text-white text-base font-semibold flex items-center gap-2 hover:text-indigo-400 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-indigo-400" />
                      <span>{siteSettings.phone}</span>
                    </a>
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

                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase text-slate-500">Availability</span>
                  <div className="text-emerald-400 text-sm font-semibold flex items-center gap-2 font-mono">
                    <Clock className="w-4 h-4" />
                    <span>{aboutSection?.availability || "Available for Commissions & Remote Work"}</span>
                  </div>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div className="pt-6 border-t border-[#222738] space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    Official Networks & Profiles
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

            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
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
