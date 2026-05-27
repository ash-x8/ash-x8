/* ═══════════════════════════════════════════════════
   ASH_X8 SITE DATA MANAGER  v3
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
            bio:        "I'm Kushan A Wickramasinghe — known as Ash Wickramasinghe, ASH_X8, and by the pen name Tizzy (Writer Tizzy). A passionate creative professional and author based in Sri Lanka, with expertise in graphic design, photography, and digital content creation. I help brands tell their stories through stunning visuals and compelling design.",
            aboutText:  "Kushan A Wickramasinghe (Ash Wickramasinghe / Tizzy / Writer Tizzy) specializes in professional photography and creative graphic design. Recognized as one of Sri Lanka's best graphic designers, I craft visual identities that leave a lasting impression. My work blends technical precision with artistic vision — every project is tailored to stand out and drive real results.",
            homePhoto:  '',
            aboutPhoto: ''
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
            ctaLink: '/projects.html'
        },
        services: [
            { icon:'fa-camera',    color:'#0ea5e9', title:'Professional Photography', desc:"Stunning visual content that captures your brand's essence with premium photography.", features:['Product Photography','Portrait Sessions','Event Coverage','Brand Photography'] },
            { icon:'fa-palette',   color:'#06b6d4', title:'Graphic Design',            desc:'Creative design solutions that elevate your brand identity with modern aesthetics.',    features:['Logo Design','Brand Identity','Print Design','Digital Assets'] },
            { icon:'fa-pen-fancy', color:'#38bdf8', title:'Content Creation',          desc:'Engaging social media content that connects with your audience effectively.',          features:['Social Media Posts','Video Content','Copywriting','Campaign Management'] }
        ],
        stats: [
            { num:'150+', label:'Projects Done' },
            { num:'80+',  label:'Happy Clients' },
            { num:'3+',   label:'Years Active'  },
            { num:'∞',    label:'Creativity'    }
        ],
        gallery:     [],
        photography: [],
        designs:     [],
        theme: {
            primary:   '#0ea5e9',
            secondary: '#06b6d4',
            accent:    '#38bdf8',
            bgFrom:    '#030d1a',
            bgMid:     '#071428',
            bgTo:      '#050e24',
            textColor: '#f0f8ff'
        }
    },

    get() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (!stored) return JSON.parse(JSON.stringify(this.defaults));
            return this._deepMerge(JSON.parse(JSON.stringify(this.defaults)), JSON.parse(stored));
        } catch (e) {
            return JSON.parse(JSON.stringify(this.defaults));
        }
    },

    save(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('SiteData save error:', e);
            return false;
        }
    },

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

    _buildSplitText(el, text) {
        el.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'split-text-char';
            span.style.animationDelay = (0.4 + i * 0.06) + 's';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.background = 'linear-gradient(135deg,var(--primary),var(--secondary))';
            span.style.webkitBackgroundClip = 'text';
            span.style.webkitTextFillColor  = 'transparent';
            span.style.backgroundClip       = 'text';
            el.appendChild(span);
        });
    },

    _buildSocialLinks(social) {
        const platforms = [
            { key:'whatsapp',  icon:'fa-whatsapp', color:'#25D366', label:'WhatsApp'  },
            { key:'instagram', icon:'fa-instagram', color:'#E1306C', label:'Instagram' },
            { key:'facebook',  icon:'fa-facebook',  color:'#1877F2', label:'Facebook'  },
            { key:'tiktok',    icon:'fa-tiktok',    color:'#e0e0e0', label:'TikTok'    },
            { key:'youtube',   icon:'fa-youtube',   color:'#FF0000', label:'YouTube'   },
            { key:'linkedin',  icon:'fa-linkedin',  color:'#0A66C2', label:'LinkedIn'  },
            { key:'telegram',  icon:'fa-telegram',  color:'#2CA5E0', label:'Telegram'  }
        ];
        return platforms
            .filter(p => social[p.key])
            .map(p => `<a href="${social[p.key]}" target="_blank" rel="noopener" class="social-link-btn" style="--sc:${p.color};" title="${p.label}"><i class="fab ${p.icon}"></i></a>`)
            .join('');
    }
};
