import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import {
  YoutubeIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  TiktokIcon,
} from "@/components/SocialIcons";

interface FooterProps {
  siteName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  whatsappUrl?: string;
}

export default function Footer({
  siteName = "ASH-X8 — Kushan A Wickramasinghe",
  tagline = "Photographer • Graphic Designer • Author",
  email = "contact@ash-wickramasinghe.site",
  phone = "0752269410",
  whatsappUrl = "https://wa.me/94752269410",
}: FooterProps) {
  const socialChannels = [
    { platform: "YouTube", url: "https://www.youtube.com/@Ash-x8", icon: YoutubeIcon },
    { platform: "Facebook", url: "https://www.facebook.com/share/1UeTQSvLik/", icon: FacebookIcon },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/kushan-a-wickramasinghe-28b1aa2a0", icon: LinkedinIcon },
    { platform: "WhatsApp", url: whatsappUrl || "https://wa.me/94752269410", icon: WhatsappIcon },
    { platform: "Telegram", url: "https://t.me/kawickramasinghe", icon: TelegramIcon },
    { platform: "TikTok", url: "https://vm.tiktok.com/ZS9Ypfen3rcYL-KiVCP/", icon: TiktokIcon },
  ];

  return (
    <footer className="border-t border-[#222738] bg-[#090a0f] text-slate-400 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center font-extrabold text-white text-sm shadow-lg">
                X8
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  {siteName}
                </span>
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                  ASH-X8 CREATIVE STUDIO
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Multidisciplinary creative artist working across commercial photography, visual posters, certificate design, social campaigns, and published literature (Writer Ash / Writer Tizzy).
            </p>

            <div className="space-y-2 pt-1">
              <div className="text-xs uppercase tracking-widest text-indigo-400 font-mono">
                {tagline}
              </div>
              <div className="flex flex-col gap-1.5 text-sm">
                <a
                  href={`mailto:${email}`}
                  className="text-white hover:text-indigo-400 font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>{email}</span>
                </a>
                <a
                  href={`tel:${phone}`}
                  className="text-slate-300 hover:text-indigo-400 font-mono text-xs transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Direct: {phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Creative Disciplines */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/photography" className="hover:text-white transition-colors">
                  Photography & Portraits
                </Link>
              </li>
              <li>
                <Link href="/graphic-design" className="hover:text-white transition-colors">
                  Graphic & Poster Design
                </Link>
              </li>
              <li>
                <Link href="/writing" className="hover:text-white transition-colors">
                  Literature & Writing
                </Link>
              </li>
              <li>
                <Link href="/social-media" className="hover:text-white transition-colors">
                  Social Media Campaigns
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Featured Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Kushan (Bio)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Bookings
                </Link>
              </li>
              <li>
                <a
                  href="https://cinexus-nine.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1 text-indigo-300"
                >
                  <span>CINEXUS Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-slate-200 transition-colors inline-flex items-center gap-1 text-slate-500 hover:text-indigo-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin CMS</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Social Channels */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Official Channels
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {socialChannels.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.platform}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#12151e] border border-[#222738] text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-[#1a1e2c] transition-all group"
                    title={soc.platform}
                  >
                    <Icon className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono">{soc.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#222738] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 font-mono">
            © {new Date().getFullYear()} ASH-X8 (Kushan A Wickramasinghe). All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <a
              href="https://wa.me/94752269410"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-mono"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: 0752269410</span>
            </a>
            <span className="text-slate-700">•</span>
            <span className="font-mono">Colombo & Global Remote</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
