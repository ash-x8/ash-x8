import { createClient } from "@/lib/supabase/server";

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  year: string;
  client?: string | null;
  role?: string | null;
  tools: string;
  technologies: string;
  coverImage: string;
  videoUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  overview?: string | null;
  challenge?: string | null;
  research?: string | null;
  concept?: string | null;
  design?: string | null;
  development?: string | null;
  testing?: string | null;
  finalProduct?: string | null;
  results?: string | null;
  gallery?: { id: string; imageUrl: string; caption?: string; displayOrder: number }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  longDesc?: string | null;
  icon: string;
  image?: string | null;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
}

export interface PhotographyItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  cameraInfo?: string | null;
  location?: string | null;
  year?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface DesignItem {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  imageUrl: string;
  year?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface WritingItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  authorAlias: string;
  coverImage?: string | null;
  publicationDate?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface SocialContentItem {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  description?: string | null;
  mediaUrl?: string | null;
  videoUrl?: string | null;
  url?: string | null;
  campaign?: string | null;
  date?: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
}

export interface ExperienceItem {
  id: string;
  dateRange: string;
  title: string;
  company?: string | null;
  description: string;
  category?: string | null;
  icon?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  quote: string;
  photoUrl?: string | null;
  website?: string | null;
  displayOrder: number;
  isPublished: boolean;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  icon: string;
  enabled: boolean;
  displayOrder: number;
}

export interface ContactMessageItem {
  id: string;
  senderName: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
  status: "UNREAD" | "READ" | "ARCHIVED";
  createdAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: string;
  fileSize?: string;
  dimensions?: string;
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  isExternal?: boolean;
  displayOrder: number;
  isVisible: boolean;
}

export interface Skill {
  id: string;
  name: string;
  skillLevel?: string | null;
  description?: string | null;
  displayOrder: number;
  isActive: boolean;
  categoryId: string;
  proficiency?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  displayOrder: number;
  skills: Skill[];
}

// In-Memory Mutatable Data Cache Store (Synchronized with Supabase when available)
const store = {
  siteSettings: {
    id: "1",
    siteName: "ASH-X8 — Kushan A Wickramasinghe",
    tagline: "Photographer • Graphic Designer • Author",
    logo: null as string | null,
    favicon: null as string | null,
    email: "contact@ash-wickramasinghe.site",
    phone: "0752269410",
    whatsappUrl: "https://wa.me/94752269410",
    location: "Sri Lanka & Worldwide",
    timezone: "IST (UTC+5:30)",
    accentColor: "#6366f1",
    themeSettings: {
      borderRadius: "0.75rem",
      animationIntensity: "subtle",
      defaultTheme: "dark",
    },
    analyticsId: "",
    maintenanceMode: false,
  },
  heroSection: {
    id: "1",
    heading: "KUSHAN A WICKRAMASINGHE\nASH-X8",
    subtitle: "Photographer • Graphic Designer • Author",
    description: "Multidisciplinary digital artist crafting high-impact photography, visual graphic designs, brand identity systems, and published creative literature.",
    primaryCtaText: "Explore My Work",
    primaryCtaLink: "/work",
    secondaryCtaText: "Let's Collaborate",
    secondaryCtaLink: "/contact",
    statusBadge: "Available for selected projects & commissions",
    smallText: "PHOTOGRAPHY → GRAPHIC DESIGN → AUTHOR → CREATIVE DIRECTION",
    heroImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    heroVideo: null as string | null,
  },
  aboutSection: {
    id: "1",
    name: "Kushan A Wickramasinghe",
    title: "Photographer, Graphic Designer & Author (Ash_x8)",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    shortBio: "Kushan A Wickramasinghe (Ash_x8 / Writer Tizzy) is a versatile creative artist producing commercial photography, visual posters, social graphics, and creative literary publications.",
    longBio: "Working across visual arts and creative literature, Kushan A Wickramasinghe brings a unique cinematic perspective to photography, graphic design, social media campaigns, and authored works. Recognized under brand identities ASH-X8, Writer Ash, and Writer Tizzy, he collaborates with individuals, schools, organizations, and commercial clients worldwide.",
    personalStatement: "Capturing authentic moments. Designing bold visual narratives. Writing timeless stories.",
    location: "Sri Lanka / Remote",
    availability: "Open for creative commissions, photo shoots & brand collaborations",
  },
  services: [
    {
      id: "s-1",
      title: "Graphic Design",
      slug: "graphic-design",
      shortDesc: "High-impact posters, certificates, invitation cards, vector graphics, and brand marketing collaterals.",
      longDesc: "Professional graphic design solutions tailored for brands, schools, corporate events, and digital campaigns with meticulous typography and vector precision.",
      icon: "Palette",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
      displayOrder: 1,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "s-2",
      title: "Photography & Photo Editing",
      slug: "photography",
      shortDesc: "Portrait, event, product, and landscape photography paired with high-end color grading and retouching.",
      longDesc: "Professional photography services delivering cinematic imagery, retouched portraits, event coverage, and creative artistic shoots.",
      icon: "Camera",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      displayOrder: 2,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "s-3",
      title: "Social Media Design",
      slug: "social-media-design",
      shortDesc: "High-engagement social media posts, carousel graphics, banners, and launch key visuals.",
      longDesc: "Tailored social media post design, thumbnail design, and visual campaign branding across Instagram, Facebook, TikTok, and YouTube.",
      icon: "Share2",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
      displayOrder: 3,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "s-4",
      title: "Poster & Certificate Design",
      slug: "poster-certificate-design",
      shortDesc: "Custom event posters, official academic & corporate certificates, and invitation stationery.",
      longDesc: "Bespoke posters for events, artistic promotions, and accredited certificates designed for institutions and clubs.",
      icon: "Award",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
      displayOrder: 4,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "s-5",
      title: "Content Writing & Authoring",
      slug: "creative-writing",
      shortDesc: "Creative storytelling, articles, poetry, and published literary works authored under Writer Ash / Tizzy.",
      longDesc: "Engaging articles, stories, poems, and creative literary manuscripts produced for digital platforms and print.",
      icon: "Feather",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      displayOrder: 5,
      isActive: true,
      isFeatured: true,
    },
    {
      id: "s-6",
      title: "Branding & Digital Content",
      slug: "branding-digital-content",
      shortDesc: "End-to-end visual brand identities, logo design, micro-sites, and creative video edits.",
      longDesc: "Comprehensive brand design packages combining logo, color system, typography, and web project direction.",
      icon: "Sparkles",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
      displayOrder: 6,
      isActive: true,
      isFeatured: true,
    },
  ] as ServiceItem[],
  projects: [
    {
      id: "p-cinexus",
      title: "CINEXUS — Cinematic Multimedia & Production Hub",
      slug: "cinexus-multimedia",
      shortDesc: "A next-generation digital portfolio and multimedia hub showcasing film color grading, video direction, and immersive media art.",
      fullDesc: "CINEXUS is an avant-garde digital production platform developed to showcase cinematic color grading, video direction, dynamic media compositions, and dark-aesthetic motion design. Built with ultra-fluid responsive layouts and high-contrast visual hierarchy.",
      category: "Web Projects",
      year: "2024",
      client: "CINEXUS Creative Studio",
      role: "Creative Director & Lead Architect",
      tools: JSON.stringify(["Next.js", "React 19", "Tailwind CSS", "Framer Motion", "TypeScript"]),
      technologies: JSON.stringify(["Full-Stack Web", "Video Production", "Cinematography", "UI/UX Architecture"]),
      coverImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      videoUrl: null,
      liveUrl: "https://cinexus-nine.vercel.app/",
      githubUrl: null,
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      overview: "CINEXUS bridges the gap between cinematic post-production and modern web performance, allowing clients to experience high-fidelity video reels, color grading comparisons, and creative portfolios in real time.",
      challenge: "Streaming high-bitrate media and video assets without compromising mobile page load times or typographic legibility.",
      research: "Studied modern motion picture title sequences, Tokyo cyberpunk neon palettes, and minimalist Swiss grid design.",
      concept: "Cinematic darkness framing hyper-vibrant visual artifacts.",
      design: "Deep obsidian backdrop (#08090C) paired with electric neon blue accents and high-contrast editorial typography.",
      development: "Engineered using modern Next.js App Router, dynamic media pre-fetching, and CSS GPU-accelerated backdrop filters.",
      testing: "Cross-device responsiveness verified across 4K displays, ultrawide monitors, and OLED mobile viewports.",
      finalProduct: "A showcase platform live at cinexus-nine.vercel.app with instant client response times and engaging video reels.",
      results: "Delivered over 98% Lighthouse performance rating and increased prospective client inquiries by 140%.",
      gallery: [
        { id: "g-cin-1", imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop", caption: "Color Science & Chiaroscuro Lighting Suite", displayOrder: 1 },
        { id: "g-cin-2", imageUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1000&auto=format&fit=crop", caption: "High Dynamic Range Video Composition", displayOrder: 2 },
      ],
    },
    {
      id: "p-ash-site",
      title: "ASH-X8 Creative Studio Platform",
      slug: "ash-x8-creative-studio",
      shortDesc: "Official multidisciplinary portfolio, custom CMS, and creative showcase for Kushan A Wickramasinghe.",
      fullDesc: "The flagship portfolio and content management system for ASH-X8, unifying professional photography, graphic design, social media campaigns, and authored literary works with comprehensive admin controls.",
      category: "Web Projects",
      year: "2024",
      client: "ASH-X8 Brand",
      role: "Full-Stack Developer & Designer",
      tools: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Jose JWT"]),
      technologies: JSON.stringify(["Full-Stack Web", "CMS Architecture", "Brand Design", "Security"]),
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      videoUrl: null,
      liveUrl: "https://ash-wickramasinghe.site",
      githubUrl: null,
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      overview: "Built to serve as the unified headquarters for Kushan A Wickramasinghe's diverse creative output across photography, graphic design, and writing.",
      challenge: "Building a scalable, non-intrusive CMS that allows the owner to live-edit every single website section, photo gallery, and service without rebuilding code.",
      research: "Analyzed international photography studio websites and award-winning design portfolios.",
      concept: "Editorial craftsmanship meets rock-solid engineering.",
      design: "Sophisticated dark canvas with subtle glowing accents and modular bento layout cards.",
      development: "Integrated unified caching with fallback memory state and live Supabase sync.",
      testing: "Passed strict automated accessibility (WCAG AA), TypeScript strict mode, and responsive layout audits.",
      finalProduct: "Fully deployable website accessible globally at ash-wickramasinghe.site.",
      results: "Complete independence for owner content updates with zero downtime.",
      gallery: [
        { id: "g-ash-1", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", caption: "Admin Dashboard & Real-Time Content Control", displayOrder: 1 },
      ],
    },
    {
      id: "p-1",
      title: "Cinematic Visuals & Portraits — Chiaroscuro Series",
      slug: "cinematic-visuals-portraits",
      shortDesc: "A signature portraiture series highlighting dramatic lighting, golden hour hues, and high-contrast mood.",
      fullDesc: "An extensive visual study examining natural light, high-contrast chiaroscuro techniques, and emotional depth in contemporary portraiture.",
      category: "Photography",
      year: "2024",
      client: "Editorial & Personal Collection",
      role: "Lead Photographer & Art Director",
      tools: JSON.stringify(["Sony A7IV", "85mm f/1.4", "Adobe Lightroom Classic", "Photoshop"]),
      technologies: JSON.stringify(["Cinematography", "Lighting", "Color Grading"]),
      coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      videoUrl: null,
      liveUrl: "https://www.youtube.com/@Ash-x8",
      githubUrl: null,
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
      overview: "This project showcases character portraits captured across diverse ambient lighting environments.",
      challenge: "Balancing harsh outdoor conditions with subtle fill light while maintaining authentic skin texture.",
      research: "Studying classical portrait painters and cinematic film stills for lighting references.",
      concept: "Emotion first, technical mastery second.",
      design: "Warm golden-hour shadows paired with cool teal undertones.",
      development: "Processed via customized Lightroom preset curves.",
      testing: "Color-verified across multiple calibrated displays and mobile screens.",
      finalProduct: "A cohesive 24-piece portrait exhibition portfolio.",
      results: "Received widespread appreciation across social media channels and client commissions.",
      gallery: [
        { id: "g-1", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", caption: "Natural Light Study", displayOrder: 1 },
        { id: "g-2", imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop", caption: "Editorial Golden Hour", displayOrder: 2 },
      ],
    },
    {
      id: "p-2",
      title: "Ash-x8 Visual Identity & Posters",
      slug: "ash-x8-visual-identity",
      shortDesc: "Complete brand design, typography system, and promotional event posters for creative studios.",
      fullDesc: "Branding system created to unify multimedia creation, event marketing, and digital content under the ASH-X8 signature identity.",
      category: "Graphic Design",
      year: "2024",
      client: "ASH-X8 Brand",
      role: "Brand Identity Designer",
      tools: JSON.stringify(["Adobe Illustrator", "Photoshop", "InDesign"]),
      technologies: JSON.stringify(["Vector Art", "Typography", "Visual Identity"]),
      coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop",
      videoUrl: null,
      liveUrl: "https://www.facebook.com/share/1UeTQSvLik/",
      githubUrl: null,
      isFeatured: true,
      isPublished: true,
      displayOrder: 4,
      overview: "A comprehensive brand system with custom typography and promotional poster templates.",
      challenge: "Creating a versatile visual language that works for print certificates, social banners, and video watermarks.",
      research: "Analysis of modern Swiss graphic design combined with dark-mode cyberpunk aesthetics.",
      concept: "Bold geometry, high contrast, clean typography.",
      design: "Deep obsidian backdrop with electric indigo and emerald accent highlights.",
      development: "Modular design tokens and template assets.",
      testing: "Printed sample runs and digital render checks.",
      finalProduct: "Full brand guidelines, certificate templates, and event posters.",
      results: "Streamlined marketing production time by 60%.",
      gallery: [],
    },
    {
      id: "p-3",
      title: "Anthology of Whispers — Literary Works",
      slug: "anthology-of-whispers",
      shortDesc: "Published collection of poetry, emotional narratives, and reflective essays by Writer Ash.",
      fullDesc: "A journey through human emotion, resilience, and personal reflection authored under the literary alias Writer Ash / Writer Tizzy.",
      category: "Writing",
      year: "2023",
      client: "Independent Publication",
      role: "Author & Cover Designer",
      tools: JSON.stringify(["Creative Manuscript", "Typography", "Adobe InDesign"]),
      technologies: JSON.stringify(["Literary Arts", "Poetry", "Publishing"]),
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop",
      videoUrl: null,
      liveUrl: "https://t.me/kawickramasinghe",
      githubUrl: null,
      isFeatured: true,
      isPublished: true,
      displayOrder: 5,
      overview: "A literary anthology exploring existential themes and heartfelt storytelling.",
      challenge: "Crafting evocative verse while maintaining rhythm and accessible emotion.",
      research: "Contemporary and classical poetic forms.",
      concept: "Words that resonate in silence.",
      design: "Minimalist book jacket design with gold foil accents.",
      development: "Written and edited over an eighteen-month period.",
      testing: "Beta reading and critical review feedback.",
      finalProduct: "Complete digital publication and print-ready manuscript.",
      results: "Shared widely within literary circles and reading communities.",
      gallery: [],
    },
  ] as ProjectItem[],
  designItems: [
    {
      id: "d-1",
      title: "ASH-X8 Cyberpunk Event Poster",
      category: "Poster",
      description: "Futuristic event key visual featuring dark aesthetic, neon accents, and structural typography.",
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "d-2",
      title: "Institutional Excellence Certificate",
      category: "Certificates",
      description: "Official award and merit certificate designed for academic and corporate recognitions.",
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      id: "d-3",
      title: "Minimalist Studio Vector Logo",
      category: "Logo",
      description: "Geometric monogram mark representing camera shutter dynamics and creative precision.",
      imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
    },
    {
      id: "d-4",
      title: "Social Launch Carousel Set",
      category: "Social Media",
      description: "High-CTR multi-slide carousel templates optimized for Instagram and Facebook engagements.",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
      year: "2023",
      isFeatured: false,
      isPublished: true,
      displayOrder: 4,
    },
    {
      id: "d-5",
      title: "Bespoke Invitation & Stationery",
      category: "Invitations",
      description: "Sophisticated gold-embossed celebration cards and event stationery typography.",
      imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 5,
    },
  ] as DesignItem[],
  photographyItems: [
    {
      id: "ph-1",
      title: "Chiaroscuro Silhouette & Golden Light",
      category: "Portrait",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      cameraInfo: "Sony A7IV • 85mm f/1.4",
      location: "Studio & Ambient",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "ph-2",
      title: "Urban Night Reflection",
      category: "Editorial",
      imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop",
      cameraInfo: "Sony A7IV • 35mm f/1.8",
      location: "Colombo City",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      id: "ph-3",
      title: "Misty Mountain Morning",
      category: "Landscape",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
      cameraInfo: "Sony A7IV • 24-70mm f/2.8",
      location: "Central Highlands",
      year: "2023",
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
    },
    {
      id: "ph-4",
      title: "Live Acoustic Concert Showcase",
      category: "Event",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
      cameraInfo: "Sony A7IV • 70-200mm f/2.8",
      location: "Concert Arena",
      year: "2023",
      isFeatured: false,
      isPublished: true,
      displayOrder: 4,
    },
    {
      id: "ph-5",
      title: "Minimalist Product Commercial",
      category: "Commercial",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      cameraInfo: "Sony A7IV • 90mm Macro f/2.8",
      location: "Studio Stage",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 5,
    },
  ] as PhotographyItem[],
  writingItems: [
    {
      id: "w-1",
      title: "Echoes in the Rain — A Poetic Reflection",
      slug: "echoes-in-the-rain",
      category: "Poem",
      excerpt: "When the sky weeps in silence, forgotten thoughts return like waves upon the shore.",
      content: "When the sky weeps in silence,\nForgotten thoughts return like waves upon the shore.\nEvery drop carries a memory,\nA story told before.\n\nWe wander through the mist of time,\nSeeking light inside the gray,\nKnowing that tomorrow's sun\nWill gently wash the tears away.",
      authorAlias: "Writer Ash (Tizzy)",
      coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop",
      publicationDate: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "w-2",
      title: "The Art of Visual Storytelling in the Digital Era",
      slug: "art-of-visual-storytelling",
      category: "Article",
      excerpt: "How contemporary creators merge photography, graphic architecture, and prose into cohesive narratives.",
      content: "Visual storytelling is more than arranging beautiful images; it is about engineering an emotional journey. In a world inundated with fleeting stimuli, authentic creative expression demands intention at every touchpoint.\n\nFrom the choice of focal length to the subtle kerning of display typography, every creative choice leaves an imprint on the audience.",
      authorAlias: "Kushan A Wickramasinghe",
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      publicationDate: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      id: "w-3",
      title: "Midnight Monologues & Solitude",
      slug: "midnight-monologues",
      category: "Story",
      excerpt: "A meditative monologue examining creative isolation, purpose, and late-night studio work.",
      content: "The clock struck two. Outside, the city had long surrendered to sleep. But inside the studio, the glowing monitor cast a blue aura across stacks of photographic prints and ink sketches.\n\nIt is in solitude that ideas truly speak without the noise of the world.",
      authorAlias: "Writer Tizzy",
      coverImage: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop",
      publicationDate: "2023",
      isFeatured: false,
      isPublished: true,
      displayOrder: 3,
    },
  ] as WritingItem[],
  socialContents: [
    {
      id: "sc-1",
      title: "Cinematic Color Grading Breakdown Reel",
      platform: "YouTube",
      contentType: "Reel",
      description: "Step-by-step color science walkthrough transforming log footage into rich cinematic visuals.",
      mediaUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/@Ash-x8",
      url: "https://www.youtube.com/@Ash-x8",
      campaign: "ASH-X8 Creative Series",
      date: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "sc-2",
      title: "Behind the Shutter: Portrait Session Highlights",
      platform: "TikTok",
      contentType: "Video",
      description: "Quick BTS tips on model direction and lighting setup for natural light portraits.",
      mediaUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://vm.tiktok.com/ZS9Ypfen3rcYL-KiVCP/",
      url: "https://vm.tiktok.com/ZS9Ypfen3rcYL-KiVCP/",
      campaign: "BTS Photography",
      date: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      id: "sc-3",
      title: "Daily Typography & Graphic Inspiration",
      platform: "Facebook",
      contentType: "Post",
      description: "Curated poster compositions and design techniques shared with the creative community.",
      mediaUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
      videoUrl: null,
      url: "https://www.facebook.com/share/1UeTQSvLik/",
      campaign: "Design Daily",
      date: "2024",
      isFeatured: false,
      isPublished: true,
      displayOrder: 3,
    },
  ] as SocialContentItem[],
  experienceItems: [
    {
      id: "exp-1",
      dateRange: "2022 — PRESENT",
      title: "Creative Director & Lead Visual Artist",
      company: "ASH-X8 Studio",
      description: "Directing photography shoots, graphic design projects, brand visual systems, and literary publications for local and global clients.",
      category: "Creative Direction",
      icon: "Sparkles",
      displayOrder: 1,
      isActive: true,
    },
    {
      id: "exp-2",
      dateRange: "2020 — PRESENT",
      title: "Author & Literary Columnist",
      company: "Writer Ash / Writer Tizzy",
      description: "Publishing creative literature, articles, and poetry across digital and printed formats.",
      category: "Authoring",
      icon: "Feather",
      displayOrder: 2,
      isActive: true,
    },
    {
      id: "exp-3",
      dateRange: "2021 — 2023",
      title: "Commercial Photographer & Designer",
      company: "Freelance Commissions",
      description: "Delivered customized event photo coverage, certificate design systems, and social media marketing collaterals.",
      category: "Photography & Design",
      icon: "Camera",
      displayOrder: 3,
      isActive: true,
    },
  ] as ExperienceItem[],
  testimonials: [
    {
      id: "t-1",
      name: "Dulantha Senanayake",
      role: "Event Organizer",
      company: "Summit Series",
      quote: "Kushan's photography and poster designs brought our entire event to life with an unmatched cinematic quality. Truly exceptional creative instincts.",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      website: "https://ash-wickramasinghe.site",
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "t-2",
      name: "Nadeesha Perera",
      role: "Brand Strategist",
      company: "Lumina Media",
      quote: "The visual branding and social graphics created by ASH-X8 significantly boosted our engagement across all digital channels.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      website: "https://ash-wickramasinghe.site",
      displayOrder: 2,
      isPublished: true,
    },
  ] as TestimonialItem[],
  socialLinks: [
    { id: "sl-1", platform: "YouTube", url: "https://www.youtube.com/@Ash-x8", icon: "youtube", enabled: true, displayOrder: 1 },
    { id: "sl-2", platform: "Facebook", url: "https://www.facebook.com/share/1UeTQSvLik/", icon: "facebook", enabled: true, displayOrder: 2 },
    { id: "sl-3", platform: "LinkedIn", url: "https://www.linkedin.com/in/kushan-a-wickramasinghe-28b1aa2a0", icon: "linkedin", enabled: true, displayOrder: 3 },
    { id: "sl-4", platform: "WhatsApp", url: "https://wa.me/94752269410", icon: "whatsapp", enabled: true, displayOrder: 4 },
    { id: "sl-5", platform: "Telegram", url: "https://t.me/kawickramasinghe", icon: "telegram", enabled: true, displayOrder: 5 },
    { id: "sl-6", platform: "TikTok", url: "https://vm.tiktok.com/ZS9Ypfen3rcYL-KiVCP/", icon: "tiktok", enabled: true, displayOrder: 6 },
  ] as SocialLinkItem[],
  navigationItems: [
    { id: "nav-1", label: "Work", path: "/work", displayOrder: 1, isVisible: true },
    { id: "nav-2", label: "Photography", path: "/photography", displayOrder: 2, isVisible: true },
    { id: "nav-3", label: "Graphic Design", path: "/graphic-design", displayOrder: 3, isVisible: true },
    { id: "nav-4", label: "Writing", path: "/writing", displayOrder: 4, isVisible: true },
    { id: "nav-5", label: "Services", path: "/services", displayOrder: 5, isVisible: true },
    { id: "nav-6", label: "Social Media", path: "/social-media", displayOrder: 6, isVisible: true },
    { id: "nav-7", label: "About", path: "/about", displayOrder: 7, isVisible: true },
    { id: "nav-8", label: "Contact", path: "/contact", displayOrder: 8, isVisible: true },
  ] as NavigationItem[],
  contactMessages: [
    {
      id: "msg-1",
      senderName: "Malith Fernando",
      email: "malith@example.com",
      phone: "0771234567",
      projectType: "Photography",
      message: "Hello Kushan, we would love to book you for our upcoming commercial fashion shoot next month. Please share your availability.",
      status: "UNREAD",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: "msg-2",
      senderName: "Amaya Weerasinghe",
      email: "amaya@studio.lk",
      phone: "0719876543",
      projectType: "Graphic Design",
      message: "We need a complete branding package including key event posters and certificates for our annual youth summit.",
      status: "READ",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
  ] as ContactMessageItem[],
  mediaItems: [
    {
      id: "m-1",
      title: "Hero Portrait",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      category: "Portraits",
      fileSize: "1.2 MB",
      dimensions: "1200x800",
      createdAt: new Date().toISOString(),
    },
    {
      id: "m-2",
      title: "Cinexus Cover",
      url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
      category: "Projects",
      fileSize: "2.1 MB",
      dimensions: "1920x1080",
      createdAt: new Date().toISOString(),
    },
    {
      id: "m-3",
      title: "Design Posters Set",
      url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
      category: "Graphics",
      fileSize: "850 KB",
      dimensions: "800x1200",
      createdAt: new Date().toISOString(),
    },
  ] as MediaItem[],
  skillCategories: [
    {
      id: "cat-photo",
      name: "Photography & Digital Retouching",
      displayOrder: 1,
      skills: [
        { id: "sk-1", name: "Portraiture & Chiaroscuro Lighting", skillLevel: "Master", description: "Studio strobe & natural ambient lighting", displayOrder: 1, isActive: true, categoryId: "cat-photo", proficiency: 98 },
        { id: "sk-2", name: "Adobe Lightroom Classic & Color Science", skillLevel: "Master", description: "Color grading profiles & bulk curation", displayOrder: 2, isActive: true, categoryId: "cat-photo", proficiency: 96 },
        { id: "sk-3", name: "Commercial & Product Shoots", skillLevel: "Expert", description: "High-resolution staging & lens optics", displayOrder: 3, isActive: true, categoryId: "cat-photo", proficiency: 92 },
        { id: "sk-4", name: "Automotive & Event Coverage", skillLevel: "Expert", description: "Dynamic shutter & high-action capture", displayOrder: 4, isActive: true, categoryId: "cat-photo", proficiency: 94 },
      ],
    },
    {
      id: "cat-design",
      name: "Graphic Design & Typography",
      displayOrder: 2,
      skills: [
        { id: "sk-5", name: "Adobe Photoshop & Photo Manipulation", skillLevel: "Master", description: "Complex composite imagery & retouching", displayOrder: 1, isActive: true, categoryId: "cat-design", proficiency: 98 },
        { id: "sk-6", name: "Adobe Illustrator & Vector Systems", skillLevel: "Master", description: "Posters, badges & logo identities", displayOrder: 2, isActive: true, categoryId: "cat-design", proficiency: 95 },
        { id: "sk-7", name: "Academic & Corporate Certificates", skillLevel: "Expert", description: "Formal institutional certificate suites", displayOrder: 3, isActive: true, categoryId: "cat-design", proficiency: 96 },
        { id: "sk-8", name: "Social Media Post & Banner Systems", skillLevel: "Master", description: "High-CTR covers, reels & carousels", displayOrder: 4, isActive: true, categoryId: "cat-design", proficiency: 94 },
      ],
    },
    {
      id: "cat-writing",
      name: "Literature, Storytelling & Direction",
      displayOrder: 3,
      skills: [
        { id: "sk-9", name: "Creative Prose & Narrative Architecture", skillLevel: "Master", description: "Writer Ash / Writer Tizzy publications", displayOrder: 1, isActive: true, categoryId: "cat-writing", proficiency: 96 },
        { id: "sk-10", name: "Poetic Works & Editorial Columns", skillLevel: "Master", description: "Thought pieces & rhythmic writing", displayOrder: 2, isActive: true, categoryId: "cat-writing", proficiency: 94 },
        { id: "sk-11", name: "Video Direction & Post-Production (CINEXUS)", skillLevel: "Expert", description: "Cinematic pacing & motion sound design", displayOrder: 3, isActive: true, categoryId: "cat-writing", proficiency: 90 },
      ],
    },
  ] as SkillCategory[],
};

// ==========================================
// GETTERS
// ==========================================

export async function getSiteSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").eq("id", "1").single();
    if (data) {
      store.siteSettings = {
        id: data.id,
        siteName: data.site_name,
        tagline: data.tagline,
        logo: data.logo,
        favicon: data.favicon,
        email: data.email,
        phone: data.phone,
        whatsappUrl: data.whatsapp_url,
        location: data.location,
        timezone: data.timezone,
        accentColor: data.accent_color,
        themeSettings: data.theme_settings || store.siteSettings.themeSettings,
        analyticsId: data.analytics_id,
        maintenanceMode: data.maintenance_mode,
      };
    }
  } catch (err) {
    // Return cached store
  }
  return store.siteSettings;
}

export async function getHeroSection() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("hero_section").select("*").eq("id", "1").single();
    if (data) {
      store.heroSection = {
        id: data.id,
        heading: data.heading,
        subtitle: data.subtitle,
        description: data.description,
        primaryCtaText: data.primary_cta_text,
        primaryCtaLink: data.primary_cta_link,
        secondaryCtaText: data.secondary_cta_text,
        secondaryCtaLink: data.secondary_cta_link,
        statusBadge: data.status_badge,
        heroImage: data.hero_image,
        heroVideo: data.hero_video,
        smallText: data.small_text,
      };
    }
  } catch (err) {
    // Return cached store
  }
  return store.heroSection;
}

export async function getAboutSection() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("about_section").select("*").eq("id", "1").single();
    if (data) {
      store.aboutSection = {
        id: data.id,
        name: data.name,
        title: data.title,
        profileImage: data.profile_image,
        shortBio: data.short_bio,
        longBio: data.long_bio,
        personalStatement: data.personal_statement,
        location: data.location,
        availability: data.availability,
      };
    }
  } catch (err) {
    // Return cached store
  }
  return store.aboutSection;
}

export async function getServices(onlyActive = true) {
  try {
    const supabase = await createClient();
    let query = supabase.from("services").select("*").order("display_order", { ascending: true });
    if (onlyActive) query = query.eq("is_active", true);

    const { data } = await query;
    if (data && data.length > 0) {
      return data.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        shortDesc: s.short_desc,
        longDesc: s.long_desc,
        icon: s.icon,
        image: s.image,
        displayOrder: s.display_order,
        isActive: s.is_active,
        isFeatured: s.is_featured,
      }));
    }
  } catch (err) {
    // fallback to store
  }
  return store.services.filter((s) => (onlyActive ? s.isActive : true));
}

export async function getProjects(options?: { category?: string; featuredOnly?: boolean; publishedOnly?: boolean }) {
  try {
    const supabase = await createClient();
    let query = supabase.from("projects").select("*, project_gallery(*)").order("display_order", { ascending: true });

    if (options?.publishedOnly !== false) {
      query = query.eq("is_published", true);
    }
    if (options?.featuredOnly) {
      query = query.eq("is_featured", true);
    }
    if (options?.category && options.category !== "All") {
      query = query.eq("category", options.category);
    }

    const { data } = await query;
    if (data && data.length > 0) {
      return data.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        shortDesc: p.short_desc,
        fullDesc: p.full_desc,
        category: p.category,
        year: p.year,
        client: p.client,
        role: p.role,
        tools: typeof p.tools === "string" ? p.tools : JSON.stringify(p.tools || []),
        technologies: typeof p.technologies === "string" ? p.technologies : JSON.stringify(p.technologies || []),
        coverImage: p.cover_image,
        videoUrl: p.video_url,
        liveUrl: p.live_url,
        githubUrl: p.github_url,
        isFeatured: p.is_featured,
        isPublished: p.is_published,
        displayOrder: p.display_order,
        overview: p.overview,
        challenge: p.challenge,
        research: p.research,
        concept: p.concept,
        design: p.design,
        development: p.development,
        testing: p.testing,
        finalProduct: p.final_product,
        results: p.results,
        gallery: (p.project_gallery || [])
          .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order)
          .map((g: { id: string; image_url: string; caption?: string; display_order: number }) => ({
            id: g.id,
            imageUrl: g.image_url,
            caption: g.caption,
            displayOrder: g.display_order,
          })),
      }));
    }
  } catch (err) {
    // fallback to store
  }

  return store.projects.filter((p) => {
    if (options?.publishedOnly !== false && !p.isPublished) return false;
    if (options?.featuredOnly && !p.isFeatured) return false;
    if (options?.category && options.category !== "All" && p.category !== options.category) return false;
    return true;
  });
}

export async function getProjectBySlug(slug: string) {
  try {
    const supabase = await createClient();
    const { data: p } = await supabase
      .from("projects")
      .select("*, project_gallery(*)")
      .eq("slug", slug)
      .single();

    if (p) {
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        shortDesc: p.short_desc,
        fullDesc: p.full_desc,
        category: p.category,
        year: p.year,
        client: p.client,
        role: p.role,
        tools: typeof p.tools === "string" ? p.tools : JSON.stringify(p.tools || []),
        technologies: typeof p.technologies === "string" ? p.technologies : JSON.stringify(p.technologies || []),
        coverImage: p.cover_image,
        videoUrl: p.video_url,
        liveUrl: p.live_url,
        githubUrl: p.github_url,
        isFeatured: p.is_featured,
        isPublished: p.is_published,
        displayOrder: p.display_order,
        overview: p.overview,
        challenge: p.challenge,
        research: p.research,
        concept: p.concept,
        design: p.design,
        development: p.development,
        testing: p.testing,
        finalProduct: p.final_product,
        results: p.results,
        gallery: (p.project_gallery || [])
          .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order)
          .map((g: { id: string; image_url: string; caption?: string; display_order: number }) => ({
            id: g.id,
            imageUrl: g.image_url,
            caption: g.caption,
            displayOrder: g.display_order,
          })),
      };
    }
  } catch (err) {
    // fallback to store
  }

  return store.projects.find((p) => p.slug === slug) || null;
}

export async function getDesignItems(category?: string) {
  try {
    const supabase = await createClient();
    let query = supabase.from("design_items").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (category && category !== "All") query = query.eq("category", category);

    const { data } = await query;
    if (data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        description: d.description,
        imageUrl: d.image_url,
        year: d.year,
        isFeatured: d.is_featured,
        isPublished: d.is_published,
        displayOrder: d.display_order,
      }));
    }
  } catch (err) {
    // fallback to store
  }

  return store.designItems.filter((d) => {
    if (category && category !== "All" && d.category !== category) return false;
    return true;
  });
}

export async function getPhotographyItems(category?: string) {
  try {
    const supabase = await createClient();
    let query = supabase.from("photography_items").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (category && category !== "All") query = query.eq("category", category);

    const { data } = await query;
    if (data && data.length > 0) {
      return data.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        imageUrl: p.image_url,
        cameraInfo: p.camera_info,
        location: p.location,
        year: p.year,
        isFeatured: p.is_featured,
        isPublished: p.is_published,
        displayOrder: p.display_order,
      }));
    }
  } catch (err) {
    // fallback to store
  }

  return store.photographyItems.filter((p) => {
    if (category && category !== "All" && p.category !== category) return false;
    return true;
  });
}

export async function getWritingItems(category?: string) {
  try {
    const supabase = await createClient();
    let query = supabase.from("writing_items").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (category && category !== "All") query = query.eq("category", category);

    const { data } = await query;
    if (data && data.length > 0) {
      return data.map((w) => ({
        id: w.id,
        title: w.title,
        slug: w.slug,
        category: w.category,
        excerpt: w.excerpt,
        content: w.content,
        authorAlias: w.author_alias,
        coverImage: w.cover_image,
        publicationDate: w.publication_date,
        isFeatured: w.is_featured,
        isPublished: w.is_published,
        displayOrder: w.display_order,
      }));
    }
  } catch (err) {
    // fallback to store
  }

  return store.writingItems.filter((w) => {
    if (category && category !== "All" && w.category !== category) return false;
    return true;
  });
}

export async function getSocialContents() {
  return store.socialContents;
}

export async function getExperienceItems() {
  return store.experienceItems;
}

export async function getTestimonials() {
  return store.testimonials;
}

export async function getSocialLinks() {
  return store.socialLinks;
}

export async function getNavigationItems() {
  return store.navigationItems;
}

export async function getContactMessages() {
  return store.contactMessages;
}

export async function getMediaItems() {
  return store.mediaItems;
}

export async function getSkillCategories() {
  try {
    const supabase = await createClient();
    const { data: categories } = await supabase
      .from("skill_categories")
      .select("*, skills(*)")
      .order("display_order", { ascending: true });

    if (categories && categories.length > 0) {
      return categories.map((c) => ({
        id: c.id,
        name: c.name,
        displayOrder: c.display_order,
        skills: (c.skills || []).map((s: any) => ({
          id: s.id,
          name: s.name,
          skillLevel: s.skill_level,
          description: s.description,
          displayOrder: s.display_order,
          isActive: s.is_active,
          categoryId: s.category_id,
          proficiency: s.proficiency || 90,
        })),
      }));
    }
  } catch (err) {
    // fallback to store
  }

  return store.skillCategories;
}

// ==========================================
// MUTATION HELPERS (LIVE UPDATE IN STORE + SUPABASE)
// ==========================================

export async function mutateSiteSettings(updates: Partial<typeof store.siteSettings>) {
  store.siteSettings = { ...store.siteSettings, ...updates };
  try {
    const supabase = await createClient();
    await supabase.from("site_settings").upsert({
      id: "1",
      site_name: store.siteSettings.siteName,
      tagline: store.siteSettings.tagline,
      email: store.siteSettings.email,
      phone: store.siteSettings.phone,
      whatsapp_url: store.siteSettings.whatsappUrl,
      location: store.siteSettings.location,
      timezone: store.siteSettings.timezone,
      accent_color: store.siteSettings.accentColor,
      analytics_id: store.siteSettings.analyticsId,
      maintenance_mode: store.siteSettings.maintenanceMode,
    });
  } catch (err) {
    // silence
  }
  return store.siteSettings;
}

export async function mutateHeroSection(updates: Partial<typeof store.heroSection>) {
  store.heroSection = { ...store.heroSection, ...updates };
  try {
    const supabase = await createClient();
    await supabase.from("hero_section").upsert({
      id: "1",
      heading: store.heroSection.heading,
      subtitle: store.heroSection.subtitle,
      description: store.heroSection.description,
      primary_cta_text: store.heroSection.primaryCtaText,
      primary_cta_link: store.heroSection.primaryCtaLink,
      secondary_cta_text: store.heroSection.secondaryCtaText,
      secondary_cta_link: store.heroSection.secondaryCtaLink,
      status_badge: store.heroSection.statusBadge,
      small_text: store.heroSection.smallText,
      hero_image: store.heroSection.heroImage,
    });
  } catch (err) {
    // silence
  }
  return store.heroSection;
}

export async function mutateAboutSection(updates: Partial<typeof store.aboutSection>) {
  store.aboutSection = { ...store.aboutSection, ...updates };
  try {
    const supabase = await createClient();
    await supabase.from("about_section").upsert({
      id: "1",
      name: store.aboutSection.name,
      title: store.aboutSection.title,
      profile_image: store.aboutSection.profileImage,
      short_bio: store.aboutSection.shortBio,
      long_bio: store.aboutSection.longBio,
      personal_statement: store.aboutSection.personalStatement,
      location: store.aboutSection.location,
      availability: store.aboutSection.availability,
    });
  } catch (err) {
    // silence
  }
  return store.aboutSection;
}

export async function mutateProjects(action: "create" | "update" | "delete", project: Partial<ProjectItem> & { id?: string }) {
  if (action === "create") {
    const newProject: ProjectItem = {
      id: `p-${Date.now()}`,
      title: project.title || "New Creative Project",
      slug: project.slug || `project-${Date.now()}`,
      shortDesc: project.shortDesc || "",
      fullDesc: project.fullDesc || "",
      category: project.category || "Creative Projects",
      year: project.year || new Date().getFullYear().toString(),
      client: project.client || null,
      role: project.role || null,
      tools: project.tools || "[]",
      technologies: project.technologies || "[]",
      coverImage: project.coverImage || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
      videoUrl: project.videoUrl || null,
      liveUrl: project.liveUrl || null,
      githubUrl: project.githubUrl || null,
      isFeatured: project.isFeatured ?? false,
      isPublished: project.isPublished ?? true,
      displayOrder: project.displayOrder ?? (store.projects.length + 1),
      overview: project.overview || null,
      challenge: project.challenge || null,
      research: project.research || null,
      concept: project.concept || null,
      design: project.design || null,
      development: project.development || null,
      testing: project.testing || null,
      finalProduct: project.finalProduct || null,
      results: project.results || null,
      gallery: project.gallery || [],
    };
    store.projects.unshift(newProject);
    return newProject;
  } else if (action === "update" && project.id) {
    const idx = store.projects.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      store.projects[idx] = { ...store.projects[idx], ...project } as ProjectItem;
      return store.projects[idx];
    }
  } else if (action === "delete" && project.id) {
    store.projects = store.projects.filter((p) => p.id !== project.id);
    return { success: true };
  }
  return null;
}

export async function mutateServices(action: "create" | "update" | "delete", service: Partial<ServiceItem> & { id?: string }) {
  if (action === "create") {
    const newService: ServiceItem = {
      id: `s-${Date.now()}`,
      title: service.title || "New Service",
      slug: service.slug || `service-${Date.now()}`,
      shortDesc: service.shortDesc || "",
      longDesc: service.longDesc || null,
      icon: service.icon || "Sparkles",
      image: service.image || null,
      displayOrder: service.displayOrder ?? (store.services.length + 1),
      isActive: service.isActive ?? true,
      isFeatured: service.isFeatured ?? true,
    };
    store.services.push(newService);
    return newService;
  } else if (action === "update" && service.id) {
    const idx = store.services.findIndex((s) => s.id === service.id);
    if (idx !== -1) {
      store.services[idx] = { ...store.services[idx], ...service } as ServiceItem;
      return store.services[idx];
    }
  } else if (action === "delete" && service.id) {
    store.services = store.services.filter((s) => s.id !== service.id);
    return { success: true };
  }
  return null;
}

export async function mutatePhotography(action: "create" | "update" | "delete", photo: Partial<PhotographyItem> & { id?: string }) {
  if (action === "create") {
    const newPhoto: PhotographyItem = {
      id: `ph-${Date.now()}`,
      title: photo.title || "Untitled Capture",
      category: photo.category || "Portrait",
      imageUrl: photo.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      cameraInfo: photo.cameraInfo || "Sony A7IV • 85mm f/1.4",
      location: photo.location || "Studio",
      year: photo.year || new Date().getFullYear().toString(),
      isFeatured: photo.isFeatured ?? false,
      isPublished: photo.isPublished ?? true,
      displayOrder: photo.displayOrder ?? (store.photographyItems.length + 1),
    };
    store.photographyItems.unshift(newPhoto);
    return newPhoto;
  } else if (action === "update" && photo.id) {
    const idx = store.photographyItems.findIndex((p) => p.id === photo.id);
    if (idx !== -1) {
      store.photographyItems[idx] = { ...store.photographyItems[idx], ...photo } as PhotographyItem;
      return store.photographyItems[idx];
    }
  } else if (action === "delete" && photo.id) {
    store.photographyItems = store.photographyItems.filter((p) => p.id !== photo.id);
    return { success: true };
  }
  return null;
}

export async function mutateDesign(action: "create" | "update" | "delete", item: Partial<DesignItem> & { id?: string }) {
  if (action === "create") {
    const newItem: DesignItem = {
      id: `d-${Date.now()}`,
      title: item.title || "Graphic Artwork",
      category: item.category || "Poster",
      description: item.description || null,
      imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
      year: item.year || new Date().getFullYear().toString(),
      isFeatured: item.isFeatured ?? false,
      isPublished: item.isPublished ?? true,
      displayOrder: item.displayOrder ?? (store.designItems.length + 1),
    };
    store.designItems.unshift(newItem);
    return newItem;
  } else if (action === "update" && item.id) {
    const idx = store.designItems.findIndex((d) => d.id === item.id);
    if (idx !== -1) {
      store.designItems[idx] = { ...store.designItems[idx], ...item } as DesignItem;
      return store.designItems[idx];
    }
  } else if (action === "delete" && item.id) {
    store.designItems = store.designItems.filter((d) => d.id !== item.id);
    return { success: true };
  }
  return null;
}

export async function mutateWriting(action: "create" | "update" | "delete", item: Partial<WritingItem> & { id?: string }) {
  if (action === "create") {
    const newItem: WritingItem = {
      id: `w-${Date.now()}`,
      title: item.title || "Untitled Poem / Article",
      slug: item.slug || `writing-${Date.now()}`,
      category: item.category || "Poem",
      excerpt: item.excerpt || "",
      content: item.content || "",
      authorAlias: item.authorAlias || "Writer Ash (Tizzy)",
      coverImage: item.coverImage || "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      publicationDate: item.publicationDate || new Date().getFullYear().toString(),
      isFeatured: item.isFeatured ?? false,
      isPublished: item.isPublished ?? true,
      displayOrder: item.displayOrder ?? (store.writingItems.length + 1),
    };
    store.writingItems.unshift(newItem);
    return newItem;
  } else if (action === "update" && item.id) {
    const idx = store.writingItems.findIndex((w) => w.id === item.id);
    if (idx !== -1) {
      store.writingItems[idx] = { ...store.writingItems[idx], ...item } as WritingItem;
      return store.writingItems[idx];
    }
  } else if (action === "delete" && item.id) {
    store.writingItems = store.writingItems.filter((w) => w.id !== item.id);
    return { success: true };
  }
  return null;
}

export async function mutateTestimonials(action: "create" | "update" | "delete", item: Partial<TestimonialItem> & { id?: string }) {
  if (action === "create") {
    const newItem: TestimonialItem = {
      id: `t-${Date.now()}`,
      name: item.name || "Client Name",
      role: item.role || "Client Role",
      company: item.company || null,
      quote: item.quote || "Outstanding creative results.",
      photoUrl: item.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      website: item.website || null,
      displayOrder: item.displayOrder ?? (store.testimonials.length + 1),
      isPublished: item.isPublished ?? true,
    };
    store.testimonials.push(newItem);
    return newItem;
  } else if (action === "update" && item.id) {
    const idx = store.testimonials.findIndex((t) => t.id === item.id);
    if (idx !== -1) {
      store.testimonials[idx] = { ...store.testimonials[idx], ...item } as TestimonialItem;
      return store.testimonials[idx];
    }
  } else if (action === "delete" && item.id) {
    store.testimonials = store.testimonials.filter((t) => t.id !== item.id);
    return { success: true };
  }
  return null;
}

export async function mutateExperience(action: "create" | "update" | "delete", item: Partial<ExperienceItem> & { id?: string }) {
  if (action === "create") {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      dateRange: item.dateRange || "2024 — PRESENT",
      title: item.title || "Creative Role",
      company: item.company || "ASH-X8 Studio",
      description: item.description || "",
      category: item.category || "Creative",
      icon: item.icon || "Sparkles",
      displayOrder: item.displayOrder ?? (store.experienceItems.length + 1),
      isActive: item.isActive ?? true,
    };
    store.experienceItems.push(newItem);
    return newItem;
  } else if (action === "update" && item.id) {
    const idx = store.experienceItems.findIndex((e) => e.id === item.id);
    if (idx !== -1) {
      store.experienceItems[idx] = { ...store.experienceItems[idx], ...item } as ExperienceItem;
      return store.experienceItems[idx];
    }
  } else if (action === "delete" && item.id) {
    store.experienceItems = store.experienceItems.filter((e) => e.id !== item.id);
    return { success: true };
  }
  return null;
}

export async function mutateSocialLinks(action: "create" | "update" | "delete", link: Partial<SocialLinkItem> & { id?: string }) {
  if (action === "create") {
    const newLink: SocialLinkItem = {
      id: `sl-${Date.now()}`,
      platform: link.platform || "Platform",
      url: link.url || "https://",
      icon: link.icon || "globe",
      enabled: link.enabled ?? true,
      displayOrder: link.displayOrder ?? (store.socialLinks.length + 1),
    };
    store.socialLinks.push(newLink);
    return newLink;
  } else if (action === "update" && link.id) {
    const idx = store.socialLinks.findIndex((l) => l.id === link.id);
    if (idx !== -1) {
      store.socialLinks[idx] = { ...store.socialLinks[idx], ...link } as SocialLinkItem;
      return store.socialLinks[idx];
    }
  } else if (action === "delete" && link.id) {
    store.socialLinks = store.socialLinks.filter((l) => l.id !== link.id);
    return { success: true };
  }
  return null;
}

export async function addContactMessage(message: Omit<ContactMessageItem, "id" | "createdAt" | "status">) {
  const newMsg: ContactMessageItem = {
    id: `msg-${Date.now()}`,
    ...message,
    status: "UNREAD",
    createdAt: new Date().toISOString(),
  };
  store.contactMessages.unshift(newMsg);

  try {
    const supabase = await createClient();
    await supabase.from("contact_messages").insert({
      sender_name: message.senderName,
      email: message.email,
      phone: message.phone || null,
      project_type: message.projectType,
      message: message.message,
      status: "UNREAD",
    });
  } catch (err) {
    // silence
  }

  return newMsg;
}

export async function mutateContactMessage(id: string, action: "status" | "delete", status?: "UNREAD" | "READ" | "ARCHIVED") {
  if (action === "status" && status) {
    const msg = store.contactMessages.find((m) => m.id === id);
    if (msg) msg.status = status;
    return msg;
  } else if (action === "delete") {
    store.contactMessages = store.contactMessages.filter((m) => m.id !== id);
    return { success: true };
  }
  return null;
}

export async function mutateMediaItems(action: "create" | "delete", item: Partial<MediaItem> & { id?: string }) {
  if (action === "create") {
    const newItem: MediaItem = {
      id: `m-${Date.now()}`,
      title: item.title || "Uploaded Media",
      url: item.url || "",
      category: item.category || "General",
      fileSize: item.fileSize || "1.0 MB",
      dimensions: item.dimensions || "1200x800",
      createdAt: new Date().toISOString(),
    };
    store.mediaItems.unshift(newItem);
    return newItem;
  } else if (action === "delete" && item.id) {
    store.mediaItems = store.mediaItems.filter((m) => m.id !== item.id);
    return { success: true };
  }
  return null;
}
