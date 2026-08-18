-- =================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR ASH-X8 (KUSHAN A WICKRAMASINGHE)
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
  site_name TEXT NOT NULL DEFAULT 'ASH-X8 — Kushan A Wickramasinghe',
  tagline TEXT NOT NULL DEFAULT 'Photographer • Graphic Designer • Author',
  logo TEXT,
  favicon TEXT,
  email TEXT NOT NULL DEFAULT 'contact@ash-wickramasinghe.site',
  phone TEXT DEFAULT '0752269410',
  whatsapp_url TEXT DEFAULT 'https://wa.me/94752269410',
  location TEXT DEFAULT 'Sri Lanka & Worldwide',
  timezone TEXT DEFAULT 'IST (UTC+5:30)',
  accent_color TEXT DEFAULT '#6366f1',
  theme_settings JSONB DEFAULT '{"borderRadius": "0.75rem", "animationIntensity": "subtle", "defaultTheme": "dark"}'::jsonb,
  analytics_id TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Hero Section Table
CREATE TABLE IF NOT EXISTS public.hero_section (
  id TEXT PRIMARY KEY DEFAULT '1',
  heading TEXT NOT NULL DEFAULT 'KUSHAN A WICKRAMASINGHE
ASH-X8',
  subtitle TEXT NOT NULL DEFAULT 'Photographer • Graphic Designer • Author',
  description TEXT NOT NULL DEFAULT 'Multidisciplinary digital artist crafting high-impact photography, visual graphic designs, brand identity systems, and published creative literature.',
  primary_cta_text TEXT NOT NULL DEFAULT 'Explore My Work',
  primary_cta_link TEXT NOT NULL DEFAULT '/work',
  secondary_cta_text TEXT NOT NULL DEFAULT 'Let''s Collaborate',
  secondary_cta_link TEXT NOT NULL DEFAULT '/contact',
  status_badge TEXT NOT NULL DEFAULT 'Available for selected projects & commissions',
  hero_image TEXT DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  hero_video TEXT,
  small_text TEXT DEFAULT 'PHOTOGRAPHY → GRAPHIC DESIGN → AUTHOR → CREATIVE DIRECTION',
  visual_elements JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. About Section Table
CREATE TABLE IF NOT EXISTS public.about_section (
  id TEXT PRIMARY KEY DEFAULT '1',
  name TEXT NOT NULL DEFAULT 'Kushan A Wickramasinghe',
  title TEXT NOT NULL DEFAULT 'Photographer, Graphic Designer & Author (Ash_x8)',
  profile_image TEXT DEFAULT 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  short_bio TEXT NOT NULL DEFAULT 'Kushan A Wickramasinghe (Ash_x8 / Writer Tizzy) is a versatile creative artist producing commercial photography, visual posters, social graphics, and creative literary publications.',
  long_bio TEXT NOT NULL DEFAULT 'Working across visual arts and creative literature, Kushan A Wickramasinghe brings a unique cinematic perspective to photography, graphic design, social media campaigns, and authored works. Recognized under brand identities ASH-X8, Writer Ash, and Writer Tizzy, he collaborates with individuals, schools, organizations, and commercial clients worldwide.',
  personal_statement TEXT NOT NULL DEFAULT 'Capturing authentic moments. Designing bold visual narratives. Writing timeless stories.',
  location TEXT DEFAULT 'Sri Lanka / Remote',
  availability TEXT DEFAULT 'Open for creative commissions, photo shoots & brand collaborations',
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
  category TEXT NOT NULL, -- Photography, Graphic Design, Branding, Social Media, Posters, Writing, Web
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
  category TEXT NOT NULL, -- Logo, Branding, Poster, Social Media, Certificates, Invitations
  description TEXT,
  image_url TEXT NOT NULL,
  year TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Photography Items Table
CREATE TABLE IF NOT EXISTS public.photography_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- Portrait, Landscape, Event, Editorial, Commercial, Nature
  image_url TEXT NOT NULL,
  camera_info TEXT, -- e.g. "Sony A7IV • 85mm f/1.4"
  location TEXT,
  year TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Writing Items Table (Author / Writer Tizzy / Writer Ash)
CREATE TABLE IF NOT EXISTS public.writing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL, -- Article, Story, Poem, Publication, Essay
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author_alias TEXT DEFAULT 'Writer Ash (Tizzy)',
  cover_image TEXT,
  publication_date TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Social Content Table
CREATE TABLE IF NOT EXISTS public.social_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  platform TEXT NOT NULL, -- Instagram, Facebook, TikTok, YouTube, Telegram
  content_type TEXT NOT NULL, -- Post, Reel, Poster, Thumbnail, Campaign, Banner
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

-- 14. Experience Items Table
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

-- 15. Testimonials Table
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

-- 16. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'UNREAD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. Navigation Items Table
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  category TEXT DEFAULT 'Main',
  display_order INT NOT NULL DEFAULT 0,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. SEO Settings Table
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

-- 20. Media Assets Table
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
CREATE INDEX IF NOT EXISTS idx_photography_published ON public.photography_items(is_published);
CREATE INDEX IF NOT EXISTS idx_writing_slug ON public.writing_items(slug);
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
ALTER TABLE public.photography_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Profile update self" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Site settings read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Site settings admin" ON public.site_settings FOR ALL USING (public.is_admin());

CREATE POLICY "Hero read" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Hero admin" ON public.hero_section FOR ALL USING (public.is_admin());

CREATE POLICY "About read" ON public.about_section FOR SELECT USING (true);
CREATE POLICY "About admin" ON public.about_section FOR ALL USING (public.is_admin());

CREATE POLICY "Services read" ON public.services FOR SELECT USING (true);
CREATE POLICY "Services admin" ON public.services FOR ALL USING (public.is_admin());

CREATE POLICY "Skill categories read" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Skill categories admin" ON public.skill_categories FOR ALL USING (public.is_admin());
CREATE POLICY "Skills read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Skills admin" ON public.skills FOR ALL USING (public.is_admin());

CREATE POLICY "Projects read" ON public.projects FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Projects admin" ON public.projects FOR ALL USING (public.is_admin());
CREATE POLICY "Project gallery read" ON public.project_gallery FOR SELECT USING (true);
CREATE POLICY "Project gallery admin" ON public.project_gallery FOR ALL USING (public.is_admin());

CREATE POLICY "Design items read" ON public.design_items FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Design items admin" ON public.design_items FOR ALL USING (public.is_admin());

CREATE POLICY "Photography items read" ON public.photography_items FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Photography items admin" ON public.photography_items FOR ALL USING (public.is_admin());

CREATE POLICY "Writing items read" ON public.writing_items FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Writing items admin" ON public.writing_items FOR ALL USING (public.is_admin());

CREATE POLICY "Social content read" ON public.social_content FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Social content admin" ON public.social_content FOR ALL USING (public.is_admin());

CREATE POLICY "Experience items read" ON public.experience_items FOR SELECT USING (true);
CREATE POLICY "Experience items admin" ON public.experience_items FOR ALL USING (public.is_admin());

CREATE POLICY "Testimonials read" ON public.testimonials FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Testimonials admin" ON public.testimonials FOR ALL USING (public.is_admin());

CREATE POLICY "Contact messages insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact messages admin" ON public.contact_messages FOR ALL USING (public.is_admin());

CREATE POLICY "Social links read" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Social links admin" ON public.social_links FOR ALL USING (public.is_admin());

CREATE POLICY "Navigation items read" ON public.navigation_items FOR SELECT USING (true);
CREATE POLICY "Navigation items admin" ON public.navigation_items FOR ALL USING (public.is_admin());

CREATE POLICY "SEO settings read" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "SEO settings admin" ON public.seo_settings FOR ALL USING (public.is_admin());

CREATE POLICY "Media assets read" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Media assets admin" ON public.media_assets FOR ALL USING (public.is_admin());

-- =================================================================
-- INITIAL ASH-X8 SEED DATA INSERTION
-- =================================================================
INSERT INTO public.site_settings (id, site_name, tagline, email, phone, whatsapp_url, location, timezone, accent_color)
VALUES ('1', 'ASH-X8 — Kushan A Wickramasinghe', 'Photographer • Graphic Designer • Author', 'contact@ash-wickramasinghe.site', '0752269410', 'https://wa.me/94752269410', 'Sri Lanka & Worldwide', 'IST (UTC+5:30)', '#6366f1')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.hero_section (id, heading, subtitle, description, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, status_badge, small_text)
VALUES ('1', 'KUSHAN A WICKRAMASINGHE
ASH-X8', 'Photographer • Graphic Designer • Author', 'Multidisciplinary digital artist crafting high-impact photography, visual graphic designs, brand identity systems, and published creative literature.', 'Explore My Work', '/work', 'Let''s Collaborate', '/contact', 'Available for selected projects & commissions', 'PHOTOGRAPHY → GRAPHIC DESIGN → AUTHOR → CREATIVE DIRECTION')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.about_section (id, name, title, short_bio, long_bio, personal_statement, location, availability)
VALUES ('1', 'Kushan A Wickramasinghe', 'Photographer, Graphic Designer & Author (Ash_x8)', 'Kushan A Wickramasinghe (Ash_x8 / Writer Tizzy) is a versatile creative artist producing commercial photography, visual posters, social graphics, and creative literary publications.', 'Working across visual arts and creative literature, Kushan A Wickramasinghe brings a unique cinematic perspective to photography, graphic design, social media campaigns, and authored works. Recognized under brand identities ASH-X8, Writer Ash, and Writer Tizzy, he collaborates with individuals, schools, organizations, and commercial clients worldwide.', 'Capturing authentic moments. Designing bold visual narratives. Writing timeless stories.', 'Sri Lanka / Remote', 'Open for creative commissions, photo shoots & brand collaborations')
ON CONFLICT (id) DO NOTHING;

-- Social Links
INSERT INTO public.social_links (platform, url, enabled, display_order) VALUES
('YouTube', 'https://www.youtube.com/@Ash-x8', true, 1),
('Facebook', 'https://www.facebook.com/share/1UeTQSvLik/', true, 2),
('LinkedIn', 'https://www.linkedin.com/in/kushan-a-wickramasinghe-28b1aa2a0', true, 3),
('WhatsApp', 'https://wa.me/94752269410', true, 4),
('Telegram', 'https://t.me/kawickramasinghe', true, 5),
('TikTok', 'https://vm.tiktok.com/ZS9Ypfen3rcYL-KiVCP/', true, 6)
ON CONFLICT (platform) DO NOTHING;

-- Services
INSERT INTO public.services (title, slug, short_desc, long_desc, icon, display_order, is_active, is_featured) VALUES
('Graphic Design', 'graphic-design', 'High-impact posters, certificates, invitation cards, vector graphics, and brand marketing collaterals.', 'Professional graphic design solutions tailored for brands, schools, corporate events, and digital campaigns.', 'Palette', 1, true, true),
('Photography & Editing', 'photography', 'Portrait, event, product, and landscape photography paired with high-end color grading and retouching.', 'Professional photography services delivering cinematic imagery, retouched portraits, and event coverage.', 'Camera', 2, true, true),
('Social Media Design', 'social-media-design', 'High-engagement social media posts, carousel graphics, banners, and launch key visuals.', 'Tailored social media post design, thumbnail design, and visual campaign branding across Instagram, Facebook, and YouTube.', 'Share2', 3, true, true),
('Poster & Certificate Design', 'poster-certificate-design', 'Custom event posters, official academic & corporate certificates, and invitation stationery.', 'Bespoke posters for events, artistic promotions, and accredited certificates designed for institutions.', 'Award', 4, true, true),
('Content Writing & Authoring', 'creative-writing', 'Creative storytelling, articles, poetry, and published literary works authored under Writer Ash / Tizzy.', 'Engaging articles, stories, poems, and creative literary manuscripts produced for digital platforms and print.', 'Feather', 5, true, true),
('Branding & Digital Content', 'branding-digital-content', 'End-to-end visual brand identities, logo design, micro-sites, and creative video edits.', 'Comprehensive brand design packages combining logo, color system, typography, and web project direction.', 'Sparkles', 6, true, true)
ON CONFLICT (slug) DO NOTHING;

-- Storage Bucket Setup for Media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Media Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admin Media Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admin Media Modify" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND public.is_admin());
