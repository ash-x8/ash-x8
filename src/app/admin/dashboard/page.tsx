import AdminSidebar from "@/components/AdminSidebar";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  FolderKanban,
  Briefcase,
  Palette,
  Share2,
  MessageSquare,
  Plus,
  ArrowUpRight,
  Eye,
  FileText,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let totalProjects = 0;
  let publishedProjects = 0;
  let draftProjects = 0;
  let totalServices = 0;
  let totalDesignItems = 0;
  let totalSocialItems = 0;
  let unreadMessages = 0;
  let recentProjects: any[] = [];
  let recentMessages: any[] = [];

  try {
    const supabase = await createClient();

    const [
      { count: pTotal },
      { count: pPub },
      { count: pDraft },
      { count: sTotal },
      { count: dTotal },
      { count: socTotal },
      { count: mUnread },
      { data: rProjects },
      { data: rMessages },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }).eq("is_published", true),
      supabase.from("projects").select("*", { count: "exact", head: true }).eq("is_published", false),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("design_items").select("*", { count: "exact", head: true }),
      supabase.from("social_content").select("*", { count: "exact", head: true }),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "UNREAD"),
      supabase.from("projects").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    totalProjects = pTotal || 0;
    publishedProjects = pPub || 0;
    draftProjects = pDraft || 0;
    totalServices = sTotal || 0;
    totalDesignItems = dTotal || 0;
    totalSocialItems = socTotal || 0;
    unreadMessages = mUnread || 0;
    recentProjects = (rProjects || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      year: p.year,
      isPublished: p.is_published,
    }));
    recentMessages = (rMessages || []).map((m: any) => ({
      id: m.id,
      senderName: m.sender_name,
      message: m.message,
      projectType: m.project_type,
      status: m.status,
      createdAt: m.created_at,
    }));
  } catch (error) {
    console.error("Admin dashboard error:", error);
  }

  const stats = [
    { label: "Total Projects", value: totalProjects, sub: `${publishedProjects} published / ${draftProjects} draft`, icon: FolderKanban, color: "text-indigo-400" },
    { label: "Active Services", value: totalServices, sub: "Dynamic offerings", icon: Briefcase, color: "text-purple-400" },
    { label: "Design Items", value: totalDesignItems, sub: "Vector & branding", icon: Palette, color: "text-emerald-400" },
    { label: "Social Items", value: totalSocialItems, sub: "Reels & campaigns", icon: Share2, color: "text-amber-400" },
    { label: "Unread Messages", value: unreadMessages, sub: "Inbox proposals", icon: MessageSquare, color: "text-rose-400" },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222738]">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Studio Dashboard</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Overview & dynamic content management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#12151e] border border-[#222738] text-xs font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Preview Website</span>
            </a>

            <Link
              href="/admin/projects/new"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/projects/new"
            className="p-4 rounded-2xl bg-[#12151e] border border-[#222738] hover:border-indigo-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">Add Project</div>
              <div className="text-[10px] text-slate-500 font-mono">Create Case Study</div>
            </div>
          </Link>

          <Link
            href="/admin/hero"
            className="p-4 rounded-2xl bg-[#12151e] border border-[#222738] hover:border-indigo-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">Edit Homepage</div>
              <div className="text-[10px] text-slate-500 font-mono">Hero & Statement</div>
            </div>
          </Link>

          <Link
            href="/admin/design"
            className="p-4 rounded-2xl bg-[#12151e] border border-[#222738] hover:border-indigo-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Design Gallery</div>
              <div className="text-[10px] text-slate-500 font-mono">Logos & Graphics</div>
            </div>
          </Link>

          <Link
            href="/admin/services"
            className="p-4 rounded-2xl bg-[#12151e] border border-[#222738] hover:border-indigo-500/50 transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Services</div>
              <div className="text-[10px] text-slate-500 font-mono">Offerings & Order</div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="bg-[#12151e] border border-[#222738] rounded-2xl p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-400">
                    {s.label}
                  </span>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-[10px] text-slate-500 font-mono">{s.sub}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222738] pb-4">
              <h3 className="font-bold text-white text-base">Recent Projects</h3>
              <Link href="/admin/projects" className="text-xs font-mono text-indigo-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {recentProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-[#1a1e2c] border border-[#222738] flex items-center justify-between gap-4"
                >
                  <div className="overflow-hidden">
                    <div className="font-bold text-sm text-white truncate">{p.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {p.category} • {p.year}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        p.isPublished
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                          : "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="p-1.5 rounded-lg bg-[#12151e] text-slate-300 hover:text-white"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#222738] pb-4">
              <h3 className="font-bold text-white text-base">Recent Proposals & Messages</h3>
              <Link href="/admin/contact" className="text-xs font-mono text-indigo-400 hover:underline">
                View Inbox
              </Link>
            </div>

            <div className="space-y-3">
              {recentMessages.length > 0 ? (
                recentMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-[#1a1e2c] border border-[#222738] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{m.senderName}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          m.status === "UNREAD"
                            ? "bg-rose-950/60 text-rose-400 border border-rose-800/40"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 truncate">{m.message}</div>
                    <div className="text-[10px] text-indigo-400 font-mono">
                      Type: {m.projectType} • {new Date(m.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-500 font-mono">
                  No contact messages received yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
