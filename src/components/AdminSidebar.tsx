"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Home,
  User,
  Menu,
  FileText,
  FolderKanban,
  Smartphone,
  Laptop,
  Palette,
  Share2,
  Briefcase,
  Layers,
  Award,
  MessageSquare,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  X,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface AdminSidebarProps {
  userEmail?: string;
  userName?: string;
}

export default function AdminSidebar({
  userEmail = "admin@example.com",
  userName = "Admin Creator",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navSections = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "WEBSITE PAGES",
      items: [
        { label: "Homepage Editor", href: "/admin/hero", icon: Home },
        { label: "About Page", href: "/admin/about", icon: User },
        { label: "Navigation Menu", href: "/admin/navigation", icon: Menu },
        { label: "Footer Content", href: "/admin/footer", icon: FileText },
      ],
    },
    {
      title: "PORTFOLIO & WORK",
      items: [
        { label: "All Projects", href: "/admin/projects", icon: FolderKanban },
        { label: "Design Gallery", href: "/admin/design", icon: Palette },
        { label: "Social Media Items", href: "/admin/social-media", icon: Share2 },
      ],
    },
    {
      title: "CONTENT & SKILLS",
      items: [
        { label: "Services", href: "/admin/services", icon: Briefcase },
        { label: "Skills Matrix", href: "/admin/skills", icon: Layers },
        { label: "Experience Journey", href: "/admin/experience", icon: Award },
        { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
      ],
    },
    {
      title: "INBOX & ASSETS",
      items: [
        { label: "Contact Messages", href: "/admin/contact", icon: MessageSquare },
        { label: "Media Library", href: "/admin/media", icon: ImageIcon },
      ],
    },
    {
      title: "SYSTEM & SEO",
      items: [
        { label: "SEO Settings", href: "/admin/seo", icon: Search },
        { label: "Site Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-[#181d2a] border border-slate-700 text-slate-200 shadow-xl"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#11141f] border-r border-[#222738] z-40 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Admin Header */}
          <div className="p-6 border-b border-[#222738] flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg text-sm">
                CMS
              </div>
              <div>
                <span className="font-bold text-sm text-white block">STUDIO CMS</span>
                <span className="text-[10px] text-indigo-400 font-mono uppercase">
                  Admin Panel
                </span>
              </div>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#181d2a] text-slate-400 hover:text-white transition-colors"
              title="View Live Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Nav Sections Scroll Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-6 scrollbar-thin">
            {navSections.map((sec) => (
              <div key={sec.title} className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-semibold uppercase text-slate-500 tracking-wider">
                  {sec.title}
                </div>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md font-semibold"
                          : "text-slate-400 hover:text-white hover:bg-[#181d2a]"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-[#222738] bg-[#0d0f17]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center text-xs flex-shrink-0 border border-indigo-800/40">
                  {userName[0] || "A"}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold text-white truncate">{userName}</div>
                  <div className="text-[10px] text-slate-500 truncate">{userEmail}</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
