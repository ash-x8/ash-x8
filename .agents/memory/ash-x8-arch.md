---
name: ASH_X8 Site Architecture
description: Core data flow and conventions for the ASH_X8 portfolio site.
---

# ASH_X8 Portfolio Architecture

**Why:** Static HTML/CSS/JS site on Node.js port 5000. No backend, no build step, no framework.

## Data Layer
- Central data store: `localStorage` key `ash_x8_site_data` via `SiteData` object in `site-data.js`
- Admin writes with `SiteData.update(section, values)` or `SiteData.save(data)`
- Public pages read with `SiteData.get()` on DOMContentLoaded
- `SiteData.defaults` contains all default values — new fields merge via `_deepMerge()`

## Admin Auth
- Credentials stored in localStorage key `ash_x8_auth` as `{user, pass}`
- Default: user=`Ash_x8`, pass=`Ashwickramasinghe@888`
- Security tab allows changing via `updateSecurity()`

## Photo Upload Convention
- **Gallery-only** rule: no `<input type="file">`. Photos entered via URL input.
- Gallery photos stored in `data.gallery[]` array with `{title, date, url, description}`
- Profile photos (`homePhoto`, `aboutPhoto`) picked from gallery via picker modal OR direct URL paste
- `_pickerTarget` variable tracks which photo field is being filled (home|about)

## Key Data Sections
- `profile`: fullName, nickname, tagline, category, bio, aboutText, homePhoto, aboutPhoto
- `social`: whatsapp, facebook, tiktok, youtube, linkedin, instagram, telegram
- `hero`: title, subtitle, ctaText, ctaLink
- `services`: array of 3 `{icon, color, title, desc, features[]}`
- `stats`: array of 4 `{num, label}`
- `gallery`: array of `{title, date, url, description}`

## Social Links Render Order
WhatsApp (#25D366) → Instagram (#E1306C) → Facebook (#1877F2) → TikTok (#fff) → YouTube (#FF0000) → LinkedIn (#0A66C2) → Telegram (#2CA5E0)

**How to apply:** When adding new site sections, follow SiteData pattern: add field to defaults, admin input control, page loader read.
