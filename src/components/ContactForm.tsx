"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactFormProps {
  projectTypes?: string[];
}

export default function ContactForm({
  projectTypes = [
    "App Development",
    "Web Development",
    "Graphic Design",
    "UI/UX",
    "Content Creation",
    "Social Media",
    "Other",
  ],
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    projectType: projectTypes[0] || "App Development",
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
        projectType: projectTypes[0] || "App Development",
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
          <h3 className="text-2xl font-bold text-white">Message Delivered</h3>
          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            Thank you for reaching out. Your project proposal has been received, and I will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 rounded-full bg-[#1a1e2c] border border-[#222738] text-xs font-mono text-slate-300 hover:text-white transition-all mt-4"
          >
            Send Another Message
          </button>
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
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
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
                placeholder="sarah@company.com"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Project Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {projectTypes.map((type) => {
                const selected = formData.projectType === type;
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setFormData({ ...formData, projectType: type })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-left ${
                      selected
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                        : "bg-[#1a1e2c] border-[#222738] text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Project Brief & Details *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project goals, timeline, and deliverables..."
              className="w-full px-4 py-3 rounded-xl bg-[#1a1e2c] border border-[#222738] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-600/30 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <span>Submitting Proposal...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Project Request</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
