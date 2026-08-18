"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, ChevronDown, MessageCircle, Sparkles } from "lucide-react";

interface NavbarProps {
  siteName?: string;
  statusBadge?: string;
}

export default function Navbar({
  siteName = "KUSHAN A WICKRAMASINGHE",
  statusBadge = "Available for selected projects & commissions",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work", hasDropdown: true },
    { label: "Photography", href: "/photography" },
    { label: "Writing", href: "/writing" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  const workCategories = [
    { label: "All Work", href: "/work" },
    { label: "Graphic Design", href: "/graphic-design" },
    { label: "Photography", href: "/photography" },
    { label: "Writing & Author", href: "/writing" },
    { label: "Social Media", href: "/social-media" },
    { label: "Apps & Web", href: "/web-development" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090a0f]/90 backdrop-blur-md border-b border-[#222738]/80 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center font-extrabold text-white tracking-widest text-sm shadow-lg group-hover:scale-105 transition-transform">
            X8
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors text-base">
              KUSHAN A WICKRAMASINGHE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-mono font-semibold">
              ASH-X8 STUDIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#12151e]/80 border border-[#222738] rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setWorkDropdownOpen(true)}
                  onMouseLeave={() => setWorkDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                      isActive || pathname.startsWith("/projects") || pathname.startsWith("/graphic-design") || pathname.startsWith("/social-media") || pathname.startsWith("/web-development")
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-[#1a1e2c]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </Link>

                  {workDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-[#12151e] border border-[#222738] rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                      {workCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                            pathname === cat.href
                              ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                              : "text-slate-300 hover:text-white hover:bg-[#1a1e2c]"
                          }`}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#1a1e2c]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA & WhatsApp Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://wa.me/94752269410"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/60 text-xs font-semibold transition-all font-mono"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-slate-950 font-semibold text-xs hover:bg-slate-200 transition-all shadow-md active:scale-95"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="xl:hidden p-2.5 rounded-xl bg-[#12151e] border border-[#222738] text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#222738] bg-[#090a0f]/98 backdrop-blur-2xl px-4 pt-4 pb-6 mt-2 space-y-3 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-[#12151e]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#222738] flex flex-col gap-2">
            <a
              href="https://wa.me/94752269410"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-semibold text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact via WhatsApp (0752269410)</span>
            </a>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Let's Work Together</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
