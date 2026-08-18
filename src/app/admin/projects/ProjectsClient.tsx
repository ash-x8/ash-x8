"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  Star,
  ExternalLink,
  Eye,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  coverImage?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  shortDesc: string;
}

export default function ProjectsClient({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Apps", "Web", "UI/UX", "Graphic Design", "Branding", "Social Media", "Content"];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch {
      alert("Failed to delete project");
    }
  };

  const handleToggleFeatured = async (p: ProjectItem) => {
    try {
      const updated = { ...p, isFeatured: !p.isFeatured };
      const res = await fetch(`/api/admin/projects/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setProjects(projects.map((item) => (item.id === p.id ? updated : item)));
      }
    } catch {
      alert("Failed to toggle featured status");
    }
  };

  const handleTogglePublished = async (p: ProjectItem) => {
    try {
      const updated = { ...p, isPublished: !p.isPublished };
      const res = await fetch(`/api/admin/projects/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setProjects(projects.map((item) => (item.id === p.id ? updated : item)));
      }
    } catch {
      alert("Failed to toggle published status");
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222738]">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Project Portfolio</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Manage case studies, app showcases, web systems, and publications.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12151e] border border-[#222738] p-4 rounded-2xl">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1a1e2c] border border-[#222738] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  filterCategory === cat
                    ? "bg-indigo-600 text-white font-semibold"
                    : "bg-[#1a1e2c] text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List Table */}
        <div className="bg-[#12151e] border border-[#222738] rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1a1e2c] border-b border-[#222738] text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-4">Project</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222738]">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[#181d2a] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg bg-[#1a1e2c] overflow-hidden flex-shrink-0 border border-[#222738]">
                          {p.coverImage ? (
                            <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold">
                              P
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{p.title}</div>
                          <div className="text-[11px] text-indigo-400 font-mono">/projects/{p.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#1a1e2c] text-indigo-300 font-mono">
                        {p.category}
                      </span>
                    </td>

                    <td className="p-4 font-mono text-slate-400">{p.year}</td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          p.isFeatured
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-[#1a1e2c] border-[#222738] text-slate-600 hover:text-slate-400"
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublished(p)}
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold flex items-center gap-1 border ${
                          p.isPublished
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40"
                            : "bg-rose-950/60 text-rose-400 border-rose-800/40"
                        }`}
                      >
                        {p.isPublished ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-[#1a1e2c] border border-[#222738] text-slate-400 hover:text-white"
                          title="Preview Public Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/admin/projects/${p.id}`}
                          className="p-2 rounded-lg bg-[#1a1e2c] border border-[#222738] text-slate-400 hover:text-indigo-400"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-2 rounded-lg bg-[#1a1e2c] border border-[#222738] text-slate-400 hover:text-rose-400"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
