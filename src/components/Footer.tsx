import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, YoutubeIcon, TwitterIcon } from "@/components/SocialIcons";

interface FooterProps {
  siteName?: string;
  tagline?: string;
  email?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

export default function Footer({
  siteName = "ALEX MORGAN",
  tagline = "Design. Develop. Create. Manage.",
  email = "alex@morgan.studio",
  socialLinks = [],
}: FooterProps) {
  const defaultSocials = [
    { platform: "GitHub", url: "https://github.com", icon: GithubIcon },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: LinkedinIcon },
    { platform: "Instagram", url: "https://instagram.com", icon: InstagramIcon },
    { platform: "YouTube", url: "https://youtube.com", icon: YoutubeIcon },
    { platform: "X", url: "https://x.com", icon: TwitterIcon },
  ];

  return (
    <footer className="border-t border-[#222738] bg-[#090a0f] text-slate-400 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                AM
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {siteName}
              </span>
            </Link>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Creative developer and digital designer crafting high-performance applications, immersive web platforms, and strategic brand experiences.
            </p>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-widest text-indigo-400 font-mono mb-2">
                {tagline}
              </div>
              <a
                href={`mailto:${email}`}
                className="text-white hover:text-indigo-400 text-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "About", "Work", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Work Disciplines */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/apps" className="hover:text-white transition-colors">
                  App Development
                </Link>
              </li>
              <li>
                <Link href="/web-development" className="hover:text-white transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="/graphic-design" className="hover:text-white transition-colors">
                  Graphic & Brand Design
                </Link>
              </li>
              <li>
                <Link href="/social-media" className="hover:text-white transition-colors">
                  Social Media & Content
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Admin Portal Access */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Platform CMS
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Authorized admin management workspace for dynamic content control.
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#12151e] border border-[#222738] text-xs font-mono text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
            >
              <span>Admin Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#222738]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {defaultSocials.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.platform}
                  className="w-9 h-9 rounded-lg bg-[#12151e] border border-[#222738] flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-[#1a1e2c] transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
