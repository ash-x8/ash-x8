import { createClient } from "@/lib/supabase/server";

export async function getSiteSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").eq("id", "1").single();
    if (data) {
      return {
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
        analyticsId: data.analytics_id,
        maintenanceMode: data.maintenance_mode,
      };
    }
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }

  return {
    id: "1",
    siteName: "ASH-X8 — Kushan A Wickramasinghe",
    tagline: "Photographer • Graphic Designer • Author",
    logo: null,
    favicon: null,
    email: "contact@ash-wickramasinghe.site",
    phone: "0752269410",
    whatsappUrl: "https://wa.me/94752269410",
    location: "Sri Lanka & Worldwide",
    timezone: "IST (UTC+5:30)",
    accentColor: "#6366f1",
    analyticsId: "",
    maintenanceMode: false,
  };
}

export async function getHeroSection() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("hero_section").select("*").eq("id", "1").single();
    if (data) {
      return {
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
  } catch (error) {
    console.error("Error fetching hero section:", error);
  }

  return {
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
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    heroVideo: null,
  };
}

export async function getAboutSection() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("about_section").select("*").eq("id", "1").single();
    if (data) {
      return {
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
  } catch (error) {
    console.error("Error fetching about section:", error);
  }

  return {
    id: "1",
    name: "Kushan A Wickramasinghe",
    title: "Photographer, Graphic Designer & Author (Ash_x8)",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    shortBio: "Kushan A Wickramasinghe (Ash_x8 / Writer Tizzy) is a versatile creative artist producing commercial photography, visual posters, social graphics, and creative literary publications.",
    longBio: "Working across visual arts and creative literature, Kushan A Wickramasinghe brings a unique cinematic perspective to photography, graphic design, social media campaigns, and authored works. Recognized under brand identities ASH-X8, Writer Ash, and Writer Tizzy, he collaborates with individuals, schools, organizations, and commercial clients worldwide.",
    personalStatement: "Capturing authentic moments. Designing bold visual narratives. Writing timeless stories.",
    location: "Sri Lanka / Remote",
    availability: "Open for creative commissions, photo shoots & brand collaborations",
  };
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
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return [];
}

export async function getSkillCategories() {
  try {
    const supabase = await createClient();
    const { data: categories } = await supabase
      .from("skill_categories")
      .select("*, skills(*)")
      .order("display_order", { ascending: true });

    if (categories && categories.length > 0) {
      return categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        displayOrder: cat.display_order,
        skills: (cat.skills || [])
          .filter((sk: any) => sk.is_active)
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((sk: any) => ({
            id: sk.id,
            name: sk.name,
            icon: sk.icon,
            skillLevel: sk.skill_level,
            description: sk.description,
            displayOrder: sk.display_order,
            isActive: sk.is_active,
          })),
      }));
    }
  } catch (error) {
    console.error("Error fetching skills:", error);
  }

  return [];
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
    if (data) {
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
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((g: any) => ({
            id: g.id,
            imageUrl: g.image_url,
            caption: g.caption,
            displayOrder: g.display_order,
          })),
      }));
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return [];
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
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((g: any) => ({
            id: g.id,
            imageUrl: g.image_url,
            caption: g.caption,
            displayOrder: g.display_order,
          })),
      };
    }
  } catch (error) {
    console.error("Error fetching project by slug:", error);
  }

  return null;
}

export async function getDesignItems(category?: string) {
  try {
    const supabase = await createClient();
    let query = supabase.from("design_items").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (category && category !== "All") query = query.eq("category", category);

    const { data } = await query;
    if (data) {
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
  } catch (error) {
    console.error("Error fetching design items:", error);
  }

  return [];
}

export async function getPhotographyItems(category?: string) {
  try {
    const supabase = await createClient();
    let query = supabase.from("photography_items").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (category && category !== "All") query = query.eq("category", category);

    const { data } = await query;
    if (data) {
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
  } catch (error) {
    console.error("Error fetching photography items:", error);
  }

  return [];
}

export async function getWritingItems(category?: string) {
  try {
    const supabase = await createClient();
    let query = supabase.from("writing_items").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (category && category !== "All") query = query.eq("category", category);

    const { data } = await query;
    if (data) {
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
  } catch (error) {
    console.error("Error fetching writing items:", error);
  }

  return [];
}

export async function getSocialContents() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("social_content")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (data) {
      return data.map((s) => ({
        id: s.id,
        title: s.title,
        platform: s.platform,
        contentType: s.content_type,
        description: s.description,
        mediaUrl: s.media_url,
        videoUrl: s.video_url,
        url: s.url,
        campaign: s.campaign,
        date: s.date,
        isFeatured: s.is_featured,
        isPublished: s.is_published,
        displayOrder: s.display_order,
      }));
    }
  } catch (error) {
    console.error("Error fetching social content:", error);
  }

  return [];
}

export async function getExperienceItems() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("experience_items")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (data) {
      return data.map((e) => ({
        id: e.id,
        dateRange: e.date_range,
        title: e.title,
        company: e.company,
        description: e.description,
        category: e.category,
        icon: e.icon,
        displayOrder: e.display_order,
        isActive: e.is_active,
      }));
    }
  } catch (error) {
    console.error("Error fetching experience items:", error);
  }

  return [];
}

export async function getTestimonials() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (data) {
      return data.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        company: t.company,
        quote: t.quote,
        photoUrl: t.photo_url,
        website: t.website,
        displayOrder: t.display_order,
        isPublished: t.is_published,
      }));
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }

  return [];
}

export async function getSocialLinks() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("social_links")
      .select("*")
      .eq("enabled", true)
      .order("display_order", { ascending: true });

    if (data) {
      return data.map((l) => ({
        id: l.id,
        platform: l.platform,
        url: l.url,
        icon: l.icon,
        enabled: l.enabled,
        displayOrder: l.display_order,
      }));
    }
  } catch (error) {
    console.error("Error fetching social links:", error);
  }

  return [];
}
