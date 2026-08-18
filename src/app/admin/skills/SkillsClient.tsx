"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Trash2, X, Layers } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  skillLevel?: string | null;
  description?: string | null;
  displayOrder: number;
  isActive: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  displayOrder: number;
  skills: Skill[];
}

export default function SkillsClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCatName, setNewCatName] = useState("");
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<string>("");
  const [skillForm, setSkillForm] = useState({ name: "", level: "Expert", desc: "" });

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "category", name: newCatName, displayOrder: categories.length + 1 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCategories([...categories, { ...data.category, skills: [] }]);
      setNewCatName("");
    } catch (err: any) {
      alert(err.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}" and all its skills?`)) return;

    try {
      const res = await fetch(`/api/admin/skills?id=${id}&type=category`, { method: "DELETE" });
      if (res.ok) setCategories(categories.filter((c) => c.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name || !selectedCatId) return;

    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "skill",
          name: skillForm.name,
          categoryId: selectedCatId,
          skillLevel: skillForm.level,
          description: skillForm.desc,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCategories(
        categories.map((cat) =>
          cat.id === selectedCatId ? { ...cat, skills: [...cat.skills, data.skill] } : cat
        )
      );

      setIsSkillModalOpen(false);
      setSkillForm({ name: "", level: "Expert", desc: "" });
    } catch (err: any) {
      alert(err.message || "Failed to add skill");
    }
  };

  const handleDeleteSkill = async (skillId: string, categoryId: string) => {
    try {
      const res = await fetch(`/api/admin/skills?id=${skillId}&type=skill`, { method: "DELETE" });
      if (res.ok) {
        setCategories(
          categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, skills: cat.skills.filter((s) => s.id !== skillId) }
              : cat
          )
        );
      }
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 lg:pl-64 p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222738]">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Skills & Tech Matrix</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Organize technical skills into distinct operational categories.
            </p>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="New Category Name..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="px-4 py-2 rounded-xl bg-[#12151e] border border-[#222738] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>
        </div>

        {/* Categories & Skills Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#222738] pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>{cat.name}</span>
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      setIsSkillModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-[#1a1e2c] border border-[#222738] text-indigo-400 hover:text-white text-xs font-mono flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Skill</span>
                  </button>

                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 rounded-lg bg-[#1a1e2c] border border-[#222738] text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {cat.skills.map((sk) => (
                  <div
                    key={sk.id}
                    className="p-3.5 rounded-xl bg-[#1a1e2c] border border-[#222738] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-sm text-white">{sk.name}</div>
                      {sk.skillLevel && (
                        <div className="text-[10px] text-indigo-400 font-mono">{sk.skillLevel}</div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteSkill(sk.id, cat.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal to Add Skill */}
        {isSkillModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <form
              onSubmit={handleAddSkill}
              className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95"
            >
              <div className="flex items-center justify-between border-b border-[#222738] pb-4">
                <h2 className="text-xl font-bold text-white">Add Skill to Category</h2>
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Skill Name *</label>
                  <input
                    type="text"
                    required
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    placeholder="e.g. Next.js 15"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">Proficiency Level</label>
                  <select
                    value={skillForm.level}
                    onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white text-sm focus:outline-none"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-[#1a1e2c] text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
