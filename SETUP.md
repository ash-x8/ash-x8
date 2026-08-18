# 🚀 Vercel Free + Supabase Setup Guide

This personal portfolio platform and CMS has been fully migrated to **Supabase (PostgreSQL + Supabase Auth + Supabase Storage + RLS)** and **Next.js 16**. It is 100% compatible with the **Vercel Free** serverless plan without requiring server-side `DATABASE_URL` or Prisma dependencies.

---

## 1. Create Supabase Project
1. Log in to [Supabase Console](https://database.supabase.com) and click **New Project**.
2. Set a project name (e.g., `morgan-studio-portfolio`) and database password.
3. Select a region near your target audience and wait for database provisioning.

---

## 2. Initialize Database Schema & Seed Data
1. In the Supabase Dashboard left sidebar, click **SQL Editor**.
2. Click **New query**.
3. Open the file `supabase/schema.sql` from this repository, copy its entire contents, and paste into the query editor.
4. Click **Run** (or `Ctrl+Enter`).
5. Verify that all tables (`site_settings`, `hero_section`, `about_section`, `projects`, `services`, `contact_messages`, etc.) and the `media` storage bucket were created successfully.

---

## 3. Create First Admin User
1. In the Supabase Dashboard, navigate to **Authentication** → **Users**.
2. Click **Add user** → **Create user**.
3. Enter your administrator email (e.g. `admin@example.com`) and a strong password.
4. Click **Create user**.
5. Copy the newly created user's **User UID** (UUID).
6. Open **SQL Editor** and execute the following SQL to assign the `admin` role:

```sql
INSERT INTO public.profiles (id, email, name, role)
VALUES ('<YOUR-USER-UUID-HERE>', 'admin@example.com', 'Admin Creator', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## 4. Configure Vercel Deployment
In your Vercel Project Settings → **Environment Variables**, add the following **Public Environment Variables**:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (Settings → API) | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Public Publishable Anon Key | `eyJhbGciOi...` |
| `NEXT_PUBLIC_SITE_URL` | Public Portfolio Domain (Optional for Sitemap) | `https://morgan.studio` |

⚠️ **CRITICAL SECURITY NOTE:**
- **NEVER** expose your `SUPABASE_SERVICE_ROLE_KEY` or database password.
- Do **NOT** set `DATABASE_URL` or `DIRECT_URL` in Vercel.

---

## 5. Deploy on Vercel
Run `git push` or trigger a deployment in Vercel. The build command is simply:

```bash
next build
```

---

## 🔐 Row Level Security (RLS) Policy Summary
- **Public Visitors**: Read-only access to published projects, services, design items, social content, testimonials, site settings, and hero/about sections.
- **Contact Form**: Public visitors can insert records into `contact_messages`.
- **Admin Users**: Authenticated admin users (`public.is_admin() = true`) have full CRUD permissions across all portfolio tables and the Supabase Storage `media` bucket.
