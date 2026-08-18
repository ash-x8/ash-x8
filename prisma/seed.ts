import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Admin User
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@example.com" },
    update: { passwordHash, name: "Admin Creator" },
    create: {
      email: "admin@example.com",
      name: "Admin Creator",
      passwordHash,
    },
  });

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      siteName: "Alex Morgan Studio",
      tagline: "Design. Develop. Create. Manage.",
      logo: "/logo.svg",
      email: "alex@morgan.studio",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA & Remote",
      timezone: "PST (UTC-8)",
      accentColor: "#6366f1",
      analyticsId: "G-STUDIO2025",
      maintenanceMode: false,
    },
  });

  // 3. Hero Section
  await prisma.heroSection.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      heading: "Designing ideas.\nBuilding experiences.",
      subtitle: "Creative Developer & Digital Designer",
      description: "Creative developer, designer and digital creator building apps, websites, brands and digital content.",
      primaryCtaText: "Explore My Work",
      primaryCtaLink: "/work",
      secondaryCtaText: "Let's Collaborate",
      secondaryCtaLink: "/contact",
      statusBadge: "Available for selected projects",
      smallText: "DESIGN → DEVELOP → CREATE → MANAGE",
    },
  });

  // 4. About Section
  await prisma.aboutSection.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      name: "Alex Morgan",
      title: "Creative Developer & Digital Designer",
      shortBio: "Multidisciplinary digital creator working at the intersection of application development, modern visual design, and social media content.",
      longBio: "I specialize in turning complex technological concepts into elegant, human-centered digital products. Over the past 8+ years, I've partnered with startups, high-growth technology companies, and global brands to build cross-platform mobile apps, bespoke web platforms, cohesive visual identities, and viral digital marketing campaigns.",
      personalStatement: "I work at the intersection of design, technology and digital content.",
      location: "San Francisco, CA / Remote",
      availability: "Open for selected client work & advisory roles",
    },
  });

  // 5. Services
  const services = [
    {
      title: "App Development",
      slug: "app-development",
      shortDesc: "Native and cross-platform mobile & desktop app interfaces engineered for peak performance and intuition.",
      longDesc: "Full-cycle app architecture, custom mobile UI/UX, React Native / iOS / Android development, and seamless backend API integration.",
      icon: "Smartphone",
      displayOrder: 1,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Web Development",
      slug: "web-development",
      shortDesc: "Ultra-fast Next.js web applications, digital product dashboards, interactive micro-sites, and e-commerce.",
      longDesc: "Production-ready, highly interactive web applications built with TypeScript, modern frameworks, tailwind animations, and optimized SEO.",
      icon: "Globe",
      displayOrder: 2,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "UI/UX Design",
      slug: "ui-ux-design",
      shortDesc: "User research, wireframing, high-fidelity UI design systems, and interactive product prototypes.",
      longDesc: "Human-centric design systems, component libraries, conversion-focused wireframes, and design tokens built for seamless developer handoff.",
      icon: "Layout",
      displayOrder: 3,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Graphic Design",
      slug: "graphic-design",
      shortDesc: "Visual art direction, editorial layouts, marketing collaterals, and digital creative assets.",
      longDesc: "Precision vector illustrations, poster design, key visual creative direction, and high-impact digital graphics.",
      icon: "Palette",
      displayOrder: 4,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Content Creation",
      slug: "content-creation",
      shortDesc: "High-retention short-form video editing, motion graphics, and creative assets for modern platforms.",
      longDesc: "Editing Reels, TikToks, Shorts, YouTube thumbnails, launch motion graphics, and social campaign visual packages.",
      icon: "Video",
      displayOrder: 5,
      isActive: true,
      isFeatured: true,
    },
    {
      title: "Social Media Management",
      slug: "social-media-management",
      shortDesc: "End-to-end content calendar strategy, creative campaign production, analytics, and growth execution.",
      longDesc: "Strategic content pipeline from audience research to strategy, planning, design, editing, publishing, analysis, and continuous optimization.",
      icon: "Share2",
      displayOrder: 6,
      isActive: true,
      isFeatured: true,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 6. Skill Categories & Skills
  const devCategory = await prisma.skillCategory.upsert({
    where: { name: "Development" },
    update: { displayOrder: 1 },
    create: { name: "Development", displayOrder: 1 },
  });

  const designCategory = await prisma.skillCategory.upsert({
    where: { name: "Design" },
    update: { displayOrder: 2 },
    create: { name: "Design", displayOrder: 2 },
  });

  const contentCategory = await prisma.skillCategory.upsert({
    where: { name: "Content Creation" },
    update: { displayOrder: 3 },
    create: { name: "Content Creation", displayOrder: 3 },
  });

  const socialCategory = await prisma.skillCategory.upsert({
    where: { name: "Social Media Strategy" },
    update: { displayOrder: 4 },
    create: { name: "Social Media Strategy", displayOrder: 4 },
  });

  const skills = [
    { name: "Next.js & React", categoryId: devCategory.id, level: "Expert", displayOrder: 1 },
    { name: "TypeScript & JavaScript", categoryId: devCategory.id, level: "Expert", displayOrder: 2 },
    { name: "Tailwind CSS & Framer Motion", categoryId: devCategory.id, level: "Expert", displayOrder: 3 },
    { name: "Node.js & Express / NestJS", categoryId: devCategory.id, level: "Advanced", displayOrder: 4 },
    { name: "PostgreSQL & Prisma SQL", categoryId: devCategory.id, level: "Advanced", displayOrder: 5 },
    { name: "UI/UX Systems & Figma", categoryId: designCategory.id, level: "Expert", displayOrder: 1 },
    { name: "Logo & Brand Identity", categoryId: designCategory.id, level: "Expert", displayOrder: 2 },
    { name: "Adobe Illustrator & Photoshop", categoryId: designCategory.id, level: "Expert", displayOrder: 3 },
    { name: "Editorial & Layout Design", categoryId: designCategory.id, level: "Advanced", displayOrder: 4 },
    { name: "Short-form Video Editing", categoryId: contentCategory.id, level: "Expert", displayOrder: 1 },
    { name: "Premiere Pro & After Effects", categoryId: contentCategory.id, level: "Expert", displayOrder: 2 },
    { name: "YouTube Thumbnail Design", categoryId: contentCategory.id, level: "Expert", displayOrder: 3 },
    { name: "Content Pipeline Planning", categoryId: socialCategory.id, level: "Expert", displayOrder: 1 },
    { name: "Campaign Performance Analytics", categoryId: socialCategory.id, level: "Advanced", displayOrder: 2 },
  ];

  for (const sk of skills) {
    const existing = await prisma.skill.findFirst({
      where: { name: sk.name, categoryId: sk.categoryId },
    });
    if (!existing) {
      await prisma.skill.create({
        data: {
          name: sk.name,
          categoryId: sk.categoryId,
          skillLevel: sk.level,
          displayOrder: sk.displayOrder,
          isActive: true,
        },
      });
    }
  }

  // 7. Projects & Case Studies
  const project1 = await prisma.project.upsert({
    where: { slug: "pulse-fitness-app" },
    update: {},
    create: {
      title: "Pulse Mobile - Next-Gen Health Tracking",
      slug: "pulse-fitness-app",
      category: "Apps",
      year: "2024",
      client: "Pulse Health Inc.",
      role: "Lead Product Designer & iOS Developer",
      tools: JSON.stringify(["Figma", "SwiftUI", "React Native", "Tailwind"]),
      technologies: JSON.stringify(["React Native", "TypeScript", "Node.js", "GraphQL", "PostgreSQL"]),
      shortDesc: "AI-powered wearable companion and health telemetry mobile application.",
      fullDesc: "Pulse Mobile is a high-performance wellness monitoring application engineered for real-time biometrics tracking, custom workflow routines, and instant sync with smart wearable hardware.",
      coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
      liveUrl: "https://example.com/pulse",
      githubUrl: "https://github.com/example/pulse-app",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      overview: "Pulse needed a unified mobile experience to present complex biometrics (HRV, sleep stages, metabolic load) in an accessible, highly engaging dark visual system.",
      challenge: "Processing high-frequency Bluetooth telemetry without causing battery drain or UI lag on mobile devices.",
      research: "Conducted interviews with 40 active athletes and health enthusiasts to identify friction points in existing health apps.",
      concept: "Minimalist dark dashboard with ambient gradient meters, tactile haptic feedback, and fluid card interactions.",
      design: "Created a dark micro-component system in Figma with contrast-checked colors, variable font typography, and glassmorphic telemetry cards.",
      development: "Implemented using React Native with custom C++ native modules for real-time sensor processing and offline SQLite synchronization.",
      testing: "Field-tested across 120 beta users over 8 weeks, reducing latency by 45% and achieving 99.8% crash-free session stability.",
      finalProduct: "Successfully launched on iOS App Store and Google Play Store with 4.9 star rating.",
      results: "Reached 50,000 active monthly subscribers within 90 days of launch and featured as 'App of the Day'.",
      sectionsConfig: JSON.stringify([
        { id: "overview", label: "Overview", enabled: true },
        { id: "challenge", label: "Challenge", enabled: true },
        { id: "research", label: "Research", enabled: true },
        { id: "concept", label: "Concept", enabled: true },
        { id: "design", label: "Design", enabled: true },
        { id: "development", label: "Development", enabled: true },
        { id: "testing", label: "Testing", enabled: true },
        { id: "finalProduct", label: "Final Product", enabled: true },
        { id: "results", label: "Results", enabled: true },
      ]),
      gallery: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop", caption: "Pulse Dashboard & Biometrics Interface", displayOrder: 1 },
          { imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop", caption: "Custom Activity Goal Rings & Dark System", displayOrder: 2 },
        ],
      },
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: "hyperion-cloud-platform" },
    update: {},
    create: {
      title: "Hyperion Cloud - Enterprise Analytics Dashboard",
      slug: "hyperion-cloud-platform",
      category: "Web",
      year: "2024",
      client: "Hyperion Tech",
      role: "Full-Stack Architect & UI Designer",
      tools: JSON.stringify(["Figma", "Next.js", "Tailwind CSS", "Prisma"]),
      technologies: JSON.stringify(["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL", "Recharts"]),
      shortDesc: "Real-time infrastructure intelligence and serverless telemetry monitoring web application.",
      fullDesc: "Hyperion Cloud delivers ultra-fast infrastructure monitoring and instant anomaly detection for server fleets across multi-region cloud providers.",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      liveUrl: "https://example.com/hyperion",
      githubUrl: "https://github.com/example/hyperion-cloud",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      overview: "Built an enterprise SaaS web portal handling high-volume telemetry streaming with zero lag.",
      challenge: "Rendering 10,000+ data points per second in interactive charts without blocking the main UI thread.",
      design: "High-density editorial grid layout with custom dark mode charts and collapsible command palette.",
      development: "Next.js App Router with WebSockets streaming and Server Actions for real-time infrastructure commands.",
      results: "Adopted by 30+ engineering organizations within 4 months.",
      sectionsConfig: JSON.stringify([
        { id: "overview", label: "Overview", enabled: true },
        { id: "challenge", label: "Challenge", enabled: true },
        { id: "design", label: "Design", enabled: true },
        { id: "development", label: "Development", enabled: true },
        { id: "results", label: "Results", enabled: true },
      ]),
      gallery: {
        create: [
          { imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", caption: "Real-time Metrics Dashboard", displayOrder: 1 },
        ],
      },
    },
  });

  const project3 = await prisma.project.upsert({
    where: { slug: "solaris-brand-system" },
    update: {},
    create: {
      title: "Solaris - AI Renewable Energy Visual Identity",
      slug: "solaris-brand-system",
      category: "Branding",
      year: "2023",
      client: "Solaris Energy",
      role: "Brand Strategist & Lead Graphic Designer",
      tools: JSON.stringify(["Adobe Illustrator", "Photoshop", "Figma"]),
      technologies: JSON.stringify(["Vector Graphics", "Brand Guidelines", "3D Rendering"]),
      shortDesc: "Complete brand visual identity system, logo design, and brand launch campaign.",
      fullDesc: "A futuristic visual brand system crafted for an innovative clean-tech venture utilizing machine learning for solar energy grid optimization.",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
      overview: "Crafted logo, brand architecture, typography standards, and marketing graphics for Solaris.",
      concept: "Dynamic geometric mark symbolizing clean energy flow and algorithmic intelligence.",
      results: "Helped client secure $12M Series A funding round.",
      sectionsConfig: JSON.stringify([
        { id: "overview", label: "Overview", enabled: true },
        { id: "concept", label: "Concept", enabled: true },
        { id: "results", label: "Results", enabled: true },
      ]),
    },
  });

  // 8. Graphic Design Items
  const designItems = [
    {
      title: "Vortex Cyberpunk Event Key Visual",
      category: "Poster",
      description: "Editorial poster art direction blending neon typography and dark architectural structures.",
      imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      title: "Aura Luxury Skincare Packaging",
      category: "Branding",
      description: "Minimalist dark monochrome cosmetic packaging and typography system.",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
      year: "2024",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      title: "Krypton Web3 Brandmark",
      category: "Logo",
      description: "Geometric vector brandmark for decentralized exchange.",
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
      year: "2023",
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
    },
  ];

  for (const item of designItems) {
    const existing = await prisma.designItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.designItem.create({ data: item });
    }
  }

  // 9. Social Content Items
  const socialItems = [
    {
      title: "Building a SaaS Platform in 7 Days (Reel)",
      platform: "Instagram",
      contentType: "Reel",
      description: "Viral 60-second time-lapse breakdown of full-stack engineering workflow.",
      mediaUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
      url: "https://instagram.com",
      campaign: "Dev Content Series",
      date: "2024-11-15",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      title: "Top 5 UX Design Mistakes in 2025 (Carousel)",
      platform: "Instagram",
      contentType: "Post",
      description: "10-slide high-retention instructional graphic design carousel.",
      mediaUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop",
      url: "https://instagram.com",
      campaign: "UI/UX Education",
      date: "2024-12-01",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      title: "Next.js Server Actions Complete Masterclass",
      platform: "YouTube",
      contentType: "Thumbnail",
      description: "Custom dark high-CTR YouTube thumbnail & banner graphics.",
      mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      url: "https://youtube.com",
      campaign: "Tech Tutorials",
      date: "2024-10-20",
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
    },
  ];

  for (const item of socialItems) {
    const existing = await prisma.socialContent.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.socialContent.create({ data: item });
    }
  }

  // 10. Experience Timeline
  const experienceItems = [
    {
      dateRange: "2022 - Present",
      title: "Founder & Creative Director",
      company: "Morgan Digital Studio",
      description: "Leading multidisciplinary design, full-stack web engineering, and content creation campaigns for global clients.",
      category: "Leadership",
      displayOrder: 1,
      isActive: true,
    },
    {
      dateRange: "2020 - 2022",
      title: "Senior UI/UX & Frontend Engineer",
      company: "Apex Tech Inc.",
      description: "Architected enterprise Next.js micro-frontends and spearheaded internal dark mode design system.",
      category: "Development",
      displayOrder: 2,
      isActive: true,
    },
    {
      dateRange: "2018 - 2020",
      title: "Brand Designer & Visual Specialist",
      company: "Vanguard Creative Agency",
      description: "Designed brand identities, vector graphics, and social campaign assets for fortune 500 tech clients.",
      category: "Design",
      displayOrder: 3,
      isActive: true,
    },
  ];

  for (const item of experienceItems) {
    const existing = await prisma.experienceItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.experienceItem.create({ data: item });
    }
  }

  // 11. Testimonials
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "CEO & Co-founder",
      company: "Pulse Health Inc.",
      quote: "Alex transformed our product vision into a world-class mobile app. The combination of technical mastery and design precision is exceptionally rare.",
      website: "https://example.com",
      displayOrder: 1,
      isPublished: true,
    },
    {
      name: "Elena Rostova",
      role: "VP of Product",
      company: "Hyperion Cloud",
      quote: "Working with Alex felt like having an entire elite agency inside one person. Our dashboard load times dropped by 70% while our visual user retention soared.",
      website: "https://example.com",
      displayOrder: 2,
      isPublished: true,
    },
  ];

  for (const item of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: item.name } });
    if (!existing) {
      await prisma.testimonial.create({ data: item });
    }
  }

  // 12. Social Links
  const socialLinks = [
    { platform: "GitHub", url: "https://github.com", enabled: true, displayOrder: 1 },
    { platform: "LinkedIn", url: "https://linkedin.com", enabled: true, displayOrder: 2 },
    { platform: "X", url: "https://x.com", enabled: true, displayOrder: 3 },
    { platform: "Instagram", url: "https://instagram.com", enabled: true, displayOrder: 4 },
    { platform: "YouTube", url: "https://youtube.com", enabled: true, displayOrder: 5 },
    { platform: "Behance", url: "https://behance.net", enabled: true, displayOrder: 6 },
    { platform: "Dribbble", url: "https://dribbble.com", enabled: true, displayOrder: 7 },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.upsert({
      where: { platform: link.platform },
      update: link,
      create: link,
    });
  }

  // 13. Navigation Items
  const navItems = [
    { label: "Home", href: "/", category: "Main", displayOrder: 1, enabled: true },
    { label: "About", href: "/about", category: "Main", displayOrder: 2, enabled: true },
    { label: "Work", href: "/work", category: "Main", displayOrder: 3, enabled: true },
    { label: "Services", href: "/services", category: "Main", displayOrder: 4, enabled: true },
    { label: "Contact", href: "/contact", category: "Main", displayOrder: 5, enabled: true },
    { label: "Apps", href: "/apps", category: "Work", displayOrder: 1, enabled: true },
    { label: "Web", href: "/web-development", category: "Work", displayOrder: 2, enabled: true },
    { label: "Graphic Design", href: "/graphic-design", category: "Work", displayOrder: 3, enabled: true },
    { label: "Social Media", href: "/social-media", category: "Work", displayOrder: 4, enabled: true },
  ];

  for (const nav of navItems) {
    const existing = await prisma.navigationItem.findFirst({ where: { label: nav.label } });
    if (!existing) {
      await prisma.navigationItem.create({ data: nav });
    }
  }

  // 14. SEO Settings
  const pagesSeo = [
    { pagePath: "/", metaTitle: "Alex Morgan | Creative Developer & Digital Designer", metaDescription: "Creative developer, designer and digital creator building apps, websites, brands and digital content." },
    { pagePath: "/about", metaTitle: "About | Alex Morgan Studio", metaDescription: "Learn more about my background, technical skill set, and creative journey." },
    { pagePath: "/work", metaTitle: "Selected Work | Alex Morgan Studio", metaDescription: "Explore featured projects across mobile apps, web applications, branding, and graphic design." },
    { pagePath: "/apps", metaTitle: "App Development | Alex Morgan Studio", metaDescription: "Mobile app interfaces, native applications, and digital product designs." },
    { pagePath: "/web-development", metaTitle: "Web Development | Alex Morgan Studio", metaDescription: "High-performance Next.js websites, web apps, and modern digital interfaces." },
    { pagePath: "/graphic-design", metaTitle: "Graphic Design | Alex Morgan Studio", metaDescription: "Visual brand identities, poster designs, key visuals, and vector illustrations." },
    { pagePath: "/social-media", metaTitle: "Social Media & Content | Alex Morgan Studio", metaDescription: "Short-form video editing, content strategy, and social campaign visual assets." },
    { pagePath: "/services", metaTitle: "Services Offered | Alex Morgan Studio", metaDescription: "App development, web development, UI/UX design, graphic design, content creation, and social media management." },
    { pagePath: "/contact", metaTitle: "Contact & Collaboration | Alex Morgan Studio", metaDescription: "Get in touch for app development, web design, creative content, or branding projects." },
  ];

  for (const seo of pagesSeo) {
    await prisma.seoSetting.upsert({
      where: { pagePath: seo.pagePath },
      update: seo,
      create: seo,
    });
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
