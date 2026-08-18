import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Layout, Palette, Video, Share2 } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    slug: string;
    shortDesc: string;
    longDesc?: string | null;
    icon?: string | null;
    displayOrder: number;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getIcon = (iconName?: string | null) => {
    switch (iconName?.toLowerCase()) {
      case "smartphone":
        return <Smartphone className="w-6 h-6 text-indigo-400" />;
      case "globe":
        return <Globe className="w-6 h-6 text-indigo-400" />;
      case "layout":
        return <Layout className="w-6 h-6 text-indigo-400" />;
      case "palette":
        return <Palette className="w-6 h-6 text-indigo-400" />;
      case "video":
        return <Video className="w-6 h-6 text-indigo-400" />;
      case "share2":
      default:
        return <Share2 className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="group relative bg-[#12151e] border border-[#222738] rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-950/20">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#1a1e2c] border border-[#222738] flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600/10 group-hover:border-indigo-500/30 transition-all">
            {getIcon(service.icon)}
          </div>
          <span className="text-2xl font-mono font-bold text-slate-600 group-hover:text-indigo-500 transition-colors">
            0{service.displayOrder}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {service.shortDesc}
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-[#222738]/80 mt-6 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
          Explore Service
        </span>
        <div className="w-8 h-8 rounded-full bg-[#1a1e2c] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <Link
        href={`/services#${service.slug}`}
        className="absolute inset-0"
        aria-label={service.title}
      />
    </div>
  );
}
