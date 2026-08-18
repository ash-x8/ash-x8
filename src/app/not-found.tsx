import Link from "next/link";
import { HelpCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-md w-full bg-[#12151e] border border-[#222738] rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl glow-box">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
          <HelpCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-indigo-400 font-semibold tracking-wider">
            404 NOT FOUND
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Page Does Not Exist</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The requested page or project case study could not be located on this studio server.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
