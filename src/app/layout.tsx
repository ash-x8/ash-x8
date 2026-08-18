import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Morgan | Creative Developer & Digital Designer",
  description: "Creative developer, designer and digital creator building apps, websites, brands and digital content.",
  keywords: ["Creative Developer", "Digital Designer", "App Development", "Next.js", "UI/UX", "Brand Design", "Video Editing"],
  authors: [{ name: "Alex Morgan" }],
  openGraph: {
    title: "Alex Morgan | Creative Developer & Digital Designer",
    description: "Designing ideas. Building experiences. DESIGN → DEVELOP → CREATE → MANAGE",
    type: "website",
    siteName: "Alex Morgan Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Morgan | Creative Developer & Digital Designer",
    description: "Designing ideas. Building experiences.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090a0f] text-slate-100">{children}</body>
    </html>
  );
}
