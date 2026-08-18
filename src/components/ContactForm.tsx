"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";

interface ContactFormProps {
  projectTypes?: string[];
}

export default function ContactForm({
  projectTypes = [
    "Photography & Retouching",
    "Graphic Design & Posters",
    "Merit Certificates & Badges",
    "Authored Literature / Articles",
    "Social Media Campaign",
    "Web Platform / CINEXUS",
    "Other Creative Inquiry",
  ],
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    projectType: projectTypes[0] || "Photography & Retouching",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setSuccess(true);
      setFormData({
        senderName: "",
        email: "",
        projectType: projectTypes[0] || "Photography & Retouching",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#12151e] border border-[#222738] rounded-3xl p-8 sm:p-10 shadow-2xl relative">
      {success ? (
        <div className="py-12 text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Proposal Received</h3>
          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            Thank you for reaching out to ASH-X8 Studio. Kushan will review your inquiry and respond within 24 hours.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2.5 rounded-full bg-[#1a1e2c] border border-[#222738] text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Send Another Proposal
            </button>
            <a
              href="https://wa.me/94752269410"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp (0752269410)</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                placeholder="Jane Doe / Company"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Project Category
            </label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Project Details & Requirements *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project scope, timeline, goals, deliverables, or photo shoot location..."
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loading ? (
              <span className="font-mono text-xs">Sending proposal...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Creative Inquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
