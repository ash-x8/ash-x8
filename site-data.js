/* ═══════════════════════════════════════════════════
   ASH_X8 SITE DATA MANAGER  v2
   Central localStorage-based data layer.
   All pages read from here. Admin writes here.
═══════════════════════════════════════════════════ */

const SiteData = {
    STORAGE_KEY: 'ash_x8_site_data',

    defaults: {
        profile: {
            fullName:   'Kushan A Wickramasinghe',
            nickname:   'ASH_X8',
            tagline:    'Evolving Digital Alchemist',
            category:   'Photographer & Graphic Designer',
            bio:        "I'm Kushan A Wickramasinghe (Ash Wickramasinghe), a passionate creative professional based in Sri Lanka. With expertise in photography, graphic design, and digital content creation, I help brands tell their stories through stunning visuals and compelling design.",
            aboutText:  "Specializing in professional photography and creative graphic design, I craft visual identities that leave a lasting impression. My work blends technical precision with artistic vision — every project is tailored to stand out.",
            homePhoto:  '',
            aboutPhoto: '',
            avatar:     ''
        },
        social: {
            whatsapp:  '',
            facebook:  '',
            tiktok:    '',
            youtube:   '',
            linkedin:  '',
            instagram: '',
            telegram:  ''
        },
        hero: {
            title:   'Creative Excellence',
            subtitle:'Photography  /  Graphic Design  /  Content Creation',
            ctaText: 'View Services',
            ctaLink: '/services.html'
        },
        services: [
            {
                icon:  'fa-camera',
                color: '#0ea5e9',
                title: 'Professional Photography',
                desc:  "Stunning visual content that captures your brand's essence with premium, high-quality photography.",
                features: ['Product Photography','Portrait Sessions','Event Coverage','Brand Photography']
            },
            {
                icon:  'fa-palette',
                color: '#06b6d4',
                title: 'Graphic Design',
                desc:  'Creative design solutions that elevate your brand identity with modern, professional aesthetics.',
                features: ['Logo Design','Brand Identity','Print Design','Digital Assets']
            },
            {
                icon:  'fa-pen-fancy',
                color: '#38bdf8',
                title: 'Content Creation',
                desc:  'Engaging social media content that connects with your audience and drives meaningful engagement.',
                features: ['Social Media Posts','Video Content','Copywriting','Campaign Management']
            }
        ],
        stats: [
            { num: '150+', label: 'Projects Done'  },
            { num: '80+',  label: 'Happy Clients'  },
            { num: '3+',   label: 'Years Active'   },
            { num: '∞',    label: 'Creativity'     }
        ],
        gallery:     [],
        photography: [],
        designs:     []
    },

    /* ── GET ALL DATA ─────────────────────────── */
    get() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (!stored) return JSON.parse(JSON.stringify(this.defaults));
            return this._deepMerge(JSON.parse(JSON.stringify(this.defaults)), JSON.parse(stored));
        } catch (e) {
            return JSON.parse(JSON.stringify(this.defaults));
        }
    },

    /* ── SAVE ALL DATA ────────────────────────── */
    save(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('SiteData save error:', e);
            return false;
        }
    },

    /* ── UPDATE A SECTION ─────────────────────── */
    update(section, values) {
        const data = this.get();
        if (typeof values === 'object' && !Array.isArray(values)) {
            data[section] = { ...data[section], ...values };
        } else {
            data[section] = values;
        }
        this.save(data);
        return data;
    },

    /* ── DEEP MERGE HELPER ────────────────────── */
    _deepMerge(target, source) {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) target[key] = {};
                this._deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    },

    /* ══════════════════════════════════════════
       BUILD SPLIT TEXT
    ══════════════════════════════════════════ */
    _buildSplitText(el, text) {
        el.innerHTML = '';
        const clrs = ['#0ea5e9','#06b6d4','#38bdf8'];
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'split-text-char';
            span.style.animationDelay = (0.4 + i * 0.06) + 's';
            span.textContent = char === ' ' ? '\u00A0' : char;
            const c = clrs[i % 3];
            const c2 = clrs[(i + 1) % 3];
            span.style.background = `linear-gradient(135deg, ${c}, ${c2})`;
            span.style.webkitBackgroundClip = 'text';
            span.style.webkitTextFillColor  = 'transparent';
            span.style.backgroundClip       = 'text';
            el.appendChild(span);
        });
    },

    /* ══════════════════════════════════════════
       BUILD SOCIAL LINKS HTML
    ══════════════════════════════════════════ */
    _buildSocialLinks(social) {
        const platforms = [
            { key: 'whatsapp',  icon: 'fa-whatsapp',  color: '#25D366', label: 'WhatsApp'  },
            { key: 'instagram', icon: 'fa-instagram',  color: '#E1306C', label: 'Instagram' },
            { key: 'facebook',  icon: 'fa-facebook',   color: '#1877F2', label: 'Facebook'  },
            { key: 'tiktok',    icon: 'fa-tiktok',     color: '#e0e0e0', label: 'TikTok'    },
            { key: 'youtube',   icon: 'fa-youtube',    color: '#FF0000', label: 'YouTube'   },
            { key: 'linkedin',  icon: 'fa-linkedin',   color: '#0A66C2', label: 'LinkedIn'  },
            { key: 'telegram',  icon: 'fa-telegram',   color: '#2CA5E0', label: 'Telegram'  }
        ];
        return platforms
            .filter(p => social[p.key])
            .map(p => `
                <a href="${social[p.key]}" target="_blank" rel="noopener" class="social-link-btn"
                   style="--sc:${p.color};" title="${p.label}">
                    <i class="fab ${p.icon}"></i>
                </a>
            `).join('');
    }
};
