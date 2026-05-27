/* ═══════════════════════════════════════
   ASH_X8 THEME ENGINE  — loads BEFORE render
   Reads saved theme from localStorage and
   injects CSS custom property overrides.
═══════════════════════════════════════ */
(function () {
    const KEY = 'ash_x8_site_data';
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return;
        const d = JSON.parse(raw);
        const t = d.theme;
        if (!t) return;

        const p  = t.primary   || '#0ea5e9';
        const s  = t.secondary || '#06b6d4';
        const a  = t.accent    || '#38bdf8';
        const b1 = t.bgFrom    || '#030d1a';
        const b2 = t.bgMid     || '#071428';
        const b3 = t.bgTo      || '#050e24';
        const tc = t.textColor || '#f0f8ff';

        const ts = t.themeStyle || 'cyberpunk';
        document.documentElement.setAttribute('data-style', ts);

        const el = document.createElement('style');
        el.id = 'ash-theme-override';
        el.textContent = `
:root {
  --primary:   ${p} !important;
  --secondary: ${s} !important;
  --accent:    ${a} !important;
}
body {
  background: linear-gradient(135deg, ${b1} 0%, ${b2} 50%, ${b3} 100%) !important;
  background-attachment: fixed !important;
  color: ${tc} !important;
}`;
        document.head.appendChild(el);
    } catch (_) {}
})();
