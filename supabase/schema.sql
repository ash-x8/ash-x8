-- =================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR CREATIVE DIGITAL STUDIO PORTFOLIO
-- =================================================================

-- 1. Profiles Table (Linked to Supabase Auth auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', -- 'admin' or 'user'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT '1',
  site_name TEXT NOT NULL DEFAULT 'Alex Morgan Studio',
  tagline TEXT NOT NULL DEFAULT 'Design. Develop. Create. Manage.',
  logo TEXT,
  favicon TEXT,
  email TEXT NOT NULL DEFAULT 'alex@morgan.studio',
  phone TEXT,
  location TEXT DEFAULT 'San Francisco, CA & Remote',
  timezone TEXT DEFAULT 'PST (UTC-8)',
  accent_color TEXT DEFAULT '#6366f1',
  theme_settings JSONB DEFAULT '{"borderRadius": "0.5rem", "animationIntensity": "medium"}'::jsonb,
  analytics_id TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Hero Section Table
CREATE TABLE IF NOT EXISTS public.hero_section (
  id TEXT PRIMARY KEY DEFAULT '1',
  heading TEXT NOT NULL DEFAULT 'Designing ideas.
Building experiences.',
  subtitle TEXT NOT NULL DEFAULT 'Creative Developer & Digital Designer',
  description TEXT NOT NULL DEFAULT 'Creative developer, designer and digital creator building apps, websites, brands and digital content.',
  primary_cta_text TEXT NOT NULL DEFAULT 'Explore My Work',
  primary_cta_link TEXT NOT NULL DEFAULT '/work',
  secondary_cta_text TEXT NOT NULL DEFAULT 'Let''s Collaborate',
  secondary_cta_link TEXT NOT NULL DEFAULT '/contact',
  status_badge TEXT NOT NULL DEFAULT 'Available for selected projects',
  hero_image TEXT,
  hero_video TEXT,
  small_text TEXT DEFAULT 'DESIGN → DEVELOP → CREATE → MANAGE',
  visual_elements JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. About Section Table
CREATE TABLE IF NOT EXISTS public.about_section (
  id TEXT PRIMARY KEY DEFAULT '1',
  name TEXT NOT NULL DEFAULT 'Alex Morgan',
  title TEXT NOT NULL DEFAULT 'Creative Developer & Digital Designer',
  profile_image TEXT,
  short_bio TEXT NOT NULL DEFAULT 'Multidisciplinary digital creator working at the intersection of application development, modern visual design, and social media content.',
  long_bio TEXT NOT NULL DEFAULT 'I combine strategic thinking, technical expertise, and artistic vision to deliver high-impact digital experiences. With extensive background across frontend, backend, UI/UX design, branding, and video editing, I build end-to-end digital solutions.',
  personal_statement TEXT NOT NULL DEFAULT 'I work at the intersection of design, technology and digital content.',
  location TEXT DEFAULT 'San Francisco, CA / Remote',
  availability TEXT DEFAULT 'Open for selected client work & advisory roles',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT NOT NULL,
  long_desc TEXT,
  icon TEXT,
  image TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Skill Categories Table
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  skill_level TEXT,
  description TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  category_id UUID NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT NOT NULL,
  category TEXT NOT NULL, -- Apps, Web, UI/UX, Graphic Design, Branding, Social Media, Content
  year TEXT NOT NULL,
  client TEXT,
  role TEXT,
  tools JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  cover_image TEXT,
  video_url TEXT,
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  overview TEXT,
  challenge TEXT,
  research TEXT,
  concept TEXT,
  design TEXT,
  development TEXT,
  testing TEXT,
  final_product TEXT,
  results TEXT,
  sections_config JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Project Gallery Table
CREATE TABLE IF NOT EXISTS public.project_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Design Items Table
CREATE TABLE IF NOT EXISTS public.design_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- Logo, Branding, Poster, Social Media, Typography, UI Design, Marketing
  description TEXT,
  image_url TEXT NOT NULL,
  year TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Social Content Table
CREATE TABLE IF NOT EXISTS public.social_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  platform TEXT NOT NULL, -- Instagram, Facebook, TikTok, YouTube, Other
  content_type TEXT NOT NULL, -- Post, Reel, Video, Story, Thumbnail, Campaign, Banner
  description TEXT,
  media_url TEXT,
  video_url TEXT,
  url TEXT,
  campaign TEXT,
  date TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Experience Items Table
CREATE TABLE IF NOT EXISTS public.experience_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_range TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  description TEXT NOT NULL,
  category TEXT,
  icon TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  quote TEXT NOT NULL,
  photo_url TEXT,
  website TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'UNREAD', -- UNREAD, READ, ARCHIVED
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Navigation Items Table
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  category TEXT DEFAULT 'Main',
  display_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. SEO Settings Table
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT UNIQUE NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT,
  og_image TEXT,
  no_index BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. Media Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  filepath TEXT NOT NULL,
  filetype TEXT NOT NULL,
  filesize INT NOT NULL,
  dimensions TEXT,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =================================================================
-- INDEXES FOR OPTIMAL QUERY PERFORMANCE
-- =================================================================
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_design_items_published ON public.design_items(is_published);
CREATE INDEX IF NOT EXISTS idx_social_content_published ON public.social_content(is_published);
CREATE INDEX IF NOT EXISTS idx_seo_page_path ON public.seo_settings(page_path);

-- =================================================================
-- HELPER FUNCTION FOR CHECKING ADMIN ROLE
-- =================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- 1. Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Site Settings
CREATE POLICY "Site settings read by everyone" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Site settings modify by admin" ON public.site_settings FOR ALL USING (public.is_admin());

-- 3. Hero Section
CREATE POLICY "Hero section read by everyone" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Hero section modify by admin" ON public.hero_section FOR ALL USING (public.is_admin());

-- 4. About Section
CREATE POLICY "About section read by everyone" ON public.about_section FOR SELECT USING (true);
CREATE POLICY "About section modify by admin" ON public.about_section FOR ALL USING (public.is_admin());

-- 5. Services
CREATE POLICY "Services read by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Services modify by admin" ON public.services FOR ALL USING (public.is_admin());

-- 6. Skill Categories & Skills
CREATE POLICY "Skill categories read by everyone" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Skill categories modify by admin" ON public.skill_categories FOR ALL USING (public.is_admin());
CREATE POLICY "Skills read by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Skills modify by admin" ON public.skills FOR ALL USING (public.is_admin());

-- 7. Projects & Gallery
CREATE POLICY "Projects read by everyone" ON public.projects FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Projects modify by admin" ON public.projects FOR ALL USING (public.is_admin());
CREATE POLICY "Project gallery read by everyone" ON public.project_gallery FOR SELECT USING (true);
CREATE POLICY "Project gallery modify by admin" ON public.project_gallery FOR ALL USING (public.is_admin());

-- 8. Design Items
CREATE POLICY "Design items read by everyone" ON public.design_items FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Design items modify by admin" ON public.design_items FOR ALL USING (public.is_admin());

-- 9. Social Content
CREATE POLICY "Social content read by everyone" ON public.social_content FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Social content modify by admin" ON public.social_content FOR ALL USING (public.is_admin());

-- 10. Experience Items
CREATE POLICY "Experience items read by everyone" ON public.experience_items FOR SELECT USING (true);
CREATE POLICY "Experience items modify by admin" ON public.experience_items FOR ALL USING (public.is_admin());

-- 11. Testimonials
CREATE POLICY "Testimonials read by everyone" ON public.testimonials FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Testimonials modify by admin" ON public.testimonials FOR ALL USING (public.is_admin());

-- 12. Contact Messages
CREATE POLICY "Contact messages insert by everyone" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact messages read by admin" ON public.contact_messages FOR SELECT USING (public.is_admin());
CREATE POLICY "Contact messages modify by admin" ON public.contact_messages FOR ALL USING (public.is_admin());

-- 13. Social Links & Navigation
CREATE POLICY "Social links read by everyone" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Social links modify by admin" ON public.social_links FOR ALL USING (public.is_admin());
CREATE POLICY "Navigation items read by everyone" ON public.navigation_items FOR SELECT USING (true);
CREATE POLICY "Navigation items modify by admin" ON public.navigation_items FOR ALL USING (public.is_admin());

-- 14. SEO & Media Assets
CREATE POLICY "SEO settings read by everyone" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "SEO settings modify by admin" ON public.seo_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Media assets read by everyone" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Media assets modify by admin" ON public.media_assets FOR ALL USING (public.is_admin());

-- =================================================================
-- INITIAL SEED DATA INSERTION
-- =================================================================
INSERT INTO public.site_settings (id, site_name, tagline, email, phone, location, timezone, accent_color)
VALUES ('1', 'Alex Morgan Studio', 'Design. Develop. Create. Manage.', 'alex@morgan.studio', '+1 (555) 234-5678', 'San Francisco, CA & Remote', 'PST (UTC-8)', '#6366f1')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.hero_section (id, heading, subtitle, description, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, status_badge, small_text)
VALUES ('1', 'Designing ideas.
Building experiences.', 'Creative Developer & Digital Designer', 'Creative developer, designer and digital creator building apps, websites, brands and digital content.', 'Explore My Work', '/work', 'Let''s Collaborate', '/contact', 'Available for selected projects', 'DESIGN → DEVELOP → CREATE → MANAGE')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.about_section (id, name, title, short_bio, long_bio, personal_statement, location, availability)
VALUES ('1', 'Alex Morgan', 'Creative Developer & Digital Designer', 'Multidisciplinary digital creator working at the intersection of application development, modern visual design, and social media content.', 'I combine strategic thinking, technical expertise, and artistic vision to deliver high-impact digital experiences. Over the past 8+ years, I''ve partnered with startups, high-growth technology companies, and global brands to build cross-platform mobile apps, bespoke web platforms, cohesive visual identities, and viral digital marketing campaigns.', 'I work at the intersection of design, technology and digital content.', 'San Francisco, CA / Remote', 'Open for selected client work & advisory roles')
ON CONFLICT (id) DO NOTHING;

-- Storage Bucket Setup for Media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Media Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admin Media Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admin Media Modify" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND public.is_admin());
