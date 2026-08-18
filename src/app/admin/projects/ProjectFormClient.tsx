"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Save, ArrowLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ProjectFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProjectFormClient({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Apps",
    year: initialData?.year || new Date().getFullYear().toString(),
    client: initialData?.client || "",
    role: initialData?.role || "",
    shortDesc: initialData?.shortDesc || "",
    fullDesc: initialData?.fullDesc || "",
    tools: initialData?.tools ? (typeof initialData.tools === "string" ? initialData.tools : JSON.stringify(initialData.tools)) : "[\"Figma\", \"Next.js\"]",
    technologies: initialData?.technologies ? (typeof initialData.technologies === "string" ? initialData.technologies : JSON.stringify(initialData.technologies)) : "[\"TypeScript\", \"Tailwind CSS\"]",
    coverImage: initialData?.coverImage || "",
    videoUrl: initialData?.videoUrl || "",
    liveUrl: initialData?.liveUrl || "",
    githubUrl: initialData?.githubUrl || "",
    isFeatured: initialData?.isFeatured ?? false,
    isPublished: initialData?.isPublished ?? true,
    displayOrder: initialData?.displayOrder || 0,
    overview: initialData?.overview || "",
    challenge: initialData?.challenge || "",
    research: initialData?.research || "",
    concept: initialData?.concept || "",
    design: initialData?.design || "",
    development: initialData?.development || "",
    testing: initialData?.testing || "",
    finalProduct: initialData?.finalProduct || "",
    results: initialData?.results || "",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const categories = ["Apps", "Web", "UI/UX", "Graphic Design", "Branding", "Social Media", "Content"];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormData((prev) => ({ ...prev, coverImage: data.url }));
    } catch (err: any) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const url = isEdit ? `/api/admin/projects/${initialData.id}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");

      setStatus({ type: "success", message: `Project ${isEdit ? "updated" : "created"} successfully!` });
      if (!isEdit) {
        setTimeout(() => router.push("/admin/projects"), 1000);
      }
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Save error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8 max-w-5xl">
        <div className="flex items-center justify-between pb-6 border-b border-[#222738]">
          <div className="space-y-1">
            <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white">
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span>Back to Projects</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isEdit ? `Edit: ${formData.title}` : "Create New Project"}
            </h1>
          </div>
        </div>

        {status && (
          <div
            className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold ${
              status.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
          >
            {status.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-[#222738] pb-3">Basic Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Pulse Fitness Companion"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">URL Slug (Auto-generated if empty)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="pulse-fitness-companion"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Year *</label>
                <input
                  type="text"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Client Name</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Pulse Health Inc."
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Lead Product Designer & Developer"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Short Description *</label>
              <textarea
                required
                rows={2}
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Full Overview Description</label>
              <textarea
                rows={4}
                value={formData.fullDesc}
                onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Media & URLs */}
          <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-[#222738] pb-3">Media Assets & External Links</h2>

            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Cover Image URL</label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
                />
                <label className="px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] hover:border-indigo-500 text-xs font-mono text-indigo-400 cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? "Uploading..." : "Upload Image"}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Live App URL</label>
                <input
                  type="text"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-400 font-semibold">GitHub Repo URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Detailed Case Study Sections */}
          <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-[#222738] pb-3">Detailed Case Study Sections</h2>

            {[
              { id: "overview", label: "Overview" },
              { id: "challenge", label: "Challenge" },
              { id: "research", label: "Research & Strategy" },
              { id: "concept", label: "Concept & Architecture" },
              { id: "design", label: "Design System & UI" },
              { id: "development", label: "Development & Engineering" },
              { id: "testing", label: "Testing & QA" },
              { id: "finalProduct", label: "Final Product Delivery" },
              { id: "results", label: "Results & Metrics" },
            ].map((sec) => (
              <div key={sec.id} className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-indigo-400 font-semibold">{sec.label}</label>
                <textarea
                  rows={2}
                  value={(formData as any)[sec.id]}
                  onChange={(e) => setFormData({ ...formData, [sec.id]: e.target.value })}
                  placeholder={`Describe ${sec.label.toLowerCase()}...`}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            ))}
          </div>

          {/* Toggles & Actions */}
          <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 rounded bg-[#1a1e2c] border-[#222738] text-indigo-600 focus:ring-0"
                />
                <span className="text-sm font-semibold text-white">Mark as Featured Project</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-5 h-5 rounded bg-[#1a1e2c] border-[#222738] text-indigo-600 focus:ring-0"
                />
                <span className="text-sm font-semibold text-white">Publish Directly</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Project..." : isEdit ? "Update Project" : "Publish Project"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
