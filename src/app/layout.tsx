import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090a0f",
};

export const metadata: Metadata = {
  title: "ASH-X8 — Kushan A Wickramasinghe | Photographer, Graphic Designer & Author",
  description: "Official portfolio and creative archive of Kushan A Wickramasinghe (Ash_x8 / Writer Ash / Writer Tizzy). Specializing in commercial photography, visual poster systems, academic certificates, social campaigns, and authored literature.",
  keywords: "Kushan A Wickramasinghe, ASH-X8, Ash_x8, Photographer, Graphic Designer, Author, Writer Ash, Writer Tizzy, Photography Portfolio, Poster Design, Certificate Systems, Sri Lanka Creative Studio, CINEXUS",
  authors: [{ name: "Kushan A Wickramasinghe" }],
  openGraph: {
    title: "ASH-X8 — Kushan A Wickramasinghe | Photographer, Graphic Designer & Author",
    description: "Multidisciplinary creative portfolio covering commercial photography, visual design systems, and published literature.",
    type: "website",
    siteName: "ASH-X8 Creative Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASH-X8 — Kushan A Wickramasinghe",
    description: "Commercial Photography • Graphic Design • Authored Works",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#090a0f] text-slate-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
