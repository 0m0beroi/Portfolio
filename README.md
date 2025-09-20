# Om Oberoi - Portfolio Website

A modern, professional, and responsive portfolio website for Om Oberoi, an Electronics & Communication Engineering student at BBDNIIT.

## 🎨 Design Features

- **Monochrome theme** with subtle silver/blue accents
- **Modern typography** using Poppins and Inter fonts
- **Fully responsive** design for desktop, tablet, and mobile
- **Smooth animations** and hover effects
- **Clean, minimalistic** layout with geometric elements

## 🚀 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles and animations
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Interactive functionality (modularized rendering, resilience logic)
- **Service Worker** - Basic offline caching of core assets
- **Node + Express (backend)** - Contact form API & persistence
- **Vite** - Modern dev server / build (front-end bundling phase 1)
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📱 Sections

1. **Home/Hero** - Introduction with call-to-action
2. **About** - Personal information, education, and certifications
3. **Portfolio** - Featured projects with descriptions
4. **Skills & Services** - Technical skills and services offered
5. **Contact** - Contact form and social links

## 🛠️ Features

### Navigation
- Fixed navigation with smooth scrolling
- Mobile-responsive hamburger menu
- Active section highlighting
- Backdrop blur effect

### Animations
- Fade-in animations on scroll
- Floating geometric shapes
- Skill bar progress animations
- Hover effects on cards and buttons

### Interactive Elements
- Contact form with validation
- Project cards with hover effects
- Mobile navigation toggle
- Smooth scroll to sections
 - Dynamic project card rendering from `js/data.js` (now via ES module `projects-render.js`)
 - Lightbox gallery (on project pages)
 - Multi-theme system (Light, Dark, Auto, Dim, High Contrast) + Reduced Effects mode
 - Semantic design tokens & glass UI surfaces
 - Resilient contact form (honeypot, timing guard, retry/backoff, offline queue)
 - Service worker caching static assets
 - Performance budget checking script

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Optimized for all screen sizes
- Touch-friendly interface

## 🎯 Projects Featured

1. **Wi-Fi Repeater using ESP32**
   - Embedded system for extending Wi-Fi coverage
   - Technologies: ESP32, Embedded Systems, Wi-Fi

2. **Wearable Oscilloscope Smartwatch**
   - Portable oscilloscope in smartwatch form
   - Technologies: Wearables, Signal Processing, IoT

3. **Smart Career Booster Series**
   - Software solution for career development
   - Technologies: Web Development, AI/ML, EdTech

### Individual Project Pages
Each featured project now has its own dedicated detail page located under `projects/`:

- `projects/wifi-repeater.html`
- `projects/wearable-oscilloscope.html`
- `projects/career-booster.html`

Project cards on the main portfolio section link directly to these pages.

## 📋 Skills Highlighted

- **Circuit Design** (90%)
- **Embedded Systems** (85%)
- **Web Development** (80%)
- **Data Structures & Algorithms** (75%)

## 🎓 Services Offered

- Web Designing
- Project Development
- Tutoring

## 📱 Contact Information

- **Email**: om.oberoi@example.com
- **Phone**: +91 XXXXX XXXXX
- **Location**: Lucknow, Uttar Pradesh, India

### Social Links
- LinkedIn
- GitHub
- LeetCode
- Instagram

## 🚀 Getting Started

1. Clone or download the repository
2. Install dependencies:
```
npm install
```
3. Start local dev server (Vite + Tailwind):
```
npm run dev

Development now uses Vite's PostCSS pipeline. `css/main.css` imports `tw-src.css` and Tailwind is processed automatically—no separate Tailwind watch needed.

Script variants:
```
npm run dev              # Vite + PostCSS (Tailwind JIT via plugin)
npm run dev:legacy-watch # (Optional) Old parallel CLI watcher if ever needed
npm run dev:solo         # Alias of dev (fallback)
```
Production still builds a purged `css/tw.css` via:
```
npm run css:build && npm run build
```
`index.html` includes both `/css/main.css` (dev) and a deferred `css/tw.css` (print media swap) so non-Vite static hosting can still function using the pre-built file.
```
4. Build production assets:
```
npm run build
```
5. Preview production build:
```
npm run preview
```
The Tailwind CDN has been replaced with a compiled stylesheet (`css/tw.css`). Edit `css/tw-src.css` and rebuild using `npm run css:build` (automatically executed during `npm run build`).

### 🧪 Live Tailwind Development

For rapid styling changes you can run the Tailwind CLI in watch mode in a second terminal:
```
npm run css:watch
```
This regenerates `css/tw.css` instantly (JIT) when you edit:
- `css/tw-src.css`
- Any HTML under `./index.html`, `./projects/`, `./partials/`
- Any class names inside `./js/**/*.js` (e.g. dynamic rendering)

If you add new template locations, also add them to `content[]` in `tailwind.config.js` so Purge/JIT can see those classes.

### 🏗 Tailwind Architecture

`css/tw-src.css` defines three Tailwind layers plus project‑specific abstractions:
- `@tailwind base;`
- `@tailwind components;`  (custom component classes injected here)
- `@tailwind utilities;`   (custom utility helpers appended here)

Custom component classes (semantic wrappers over utilities):
- `.glass-surface` – translucent panel w/ border, shadow, backdrop blur
- `.backdrop-glass` – backdrop filter + subtle background (utility class)
- `.project-card-base` – shared project card container styling
- `.skill-item-base` – unified skill badge/card style (already applied in `index.html`)
- `.theme-toast` – base styling for ephemeral status notifications
- `.glass-btn` – button aesthetics consistent with glass surfaces
- `.gradient-text` – text gradient utility (e.g., headings / highlights)
- `.theme-transition` – standardized smooth theme state transitions (`transition-theme` properties)

Custom keyframes & animations (from `tailwind.config.js`):
- `fade-in`, `slide-up`, `float`, `toast-in`, `shimmer`

Extended design tokens:
- Colors: `silver`, `accent-blue`, `dark-blue`
- Shadows: `shadow-glass-card`, `shadow-elevated-dark`
- Blur: custom `backdrop-blur-14` (14px)
- Transition group: `transition-theme` (background/color/border/blur/shadow)

### ♻️ Migration Strategy (Legacy CSS → Tailwind)

`css/style.css` still contains legacy styles (animations, layout helpers, theming overrides). Migration is intentionally incremental to avoid regressions. New or refactored UI should prefer Tailwind utilities + the semantic component classes listed above. When a section reaches parity:
1. Replace legacy class usage in HTML with Tailwind utility chains or a shared component class.
2. Remove (or comment) the now-unused rule block from `style.css` in a future cleanup pass.
3. Keep theme variable definitions and any not-yet-migrated accessibility modes until everything has an equivalent.

Planned upcoming migrations:
- Project/service card hover states → consolidate into `.project-card-base` + utility modifiers
- Toast notification styles → fully rely on `.theme-toast` + animations
- Reduced-effects adaptations → convert to `@media (prefers-reduced-motion)` / conditional utility application

### ✅ Adding New Component Styles
Add them inside the `@layer components { ... }` block in `tw-src.css`. Prefer composing with `@apply` so utilities remain inspectable. Example:
```css
@layer components {
   .feature-pill { @apply inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium backdrop-blur-14 shadow-glass-card transition-theme hover:bg-accent-blue/20; }
}
```
Rebuild (or rely on `npm run css:watch`) and use `<span class="feature-pill">WebGL</span>` in markup.

### 🌗 Theming & Reduced Effects Interop
Theme modes toggle a `data-theme` or class marker (e.g. `dark`) on the root. Tailwind utilities (like `dark:bg-...`) can now be mixed with variable‑driven legacy styles during migration. For reduced effects, rely on existing JS flag plus `prefers-reduced-motion` queries; future utilities can encapsulate this (e.g. a `.reduced-motion\:animate-none` pattern) if desired.

### 🔍 Debug Tips
- If a class “does nothing”, confirm it appears in a scanned file path (see `content[]`).
- If `backdrop-blur-14` missing, ensure Tailwind build re-ran (watch or manual build).
- Purge removing a needed class? Make sure it isn’t generated dynamically via string concatenation; if it is, whitelist it or refactor to a static string.

### 🧪 Example (Skill Item Refactor)
Legacy markup (simplified):
```
<div class="skill-item">Embedded Systems</div>
```
Refactored:
```
<div class="skill-item-base">Embedded Systems</div>
```
Or directly with utilities (if no shared semantics needed):
```
<div class="px-4 py-3 rounded-lg bg-white/5 dark:bg-white/10 shadow-glass-card border border-white/10 text-sm font-medium tracking-wide theme-transition">Embedded Systems</div>
```

Use component classes when repetition / consistency matters; otherwise inline utilities are fine.

---


## 📁 File Structure

```
portfolio/
├── index.html                     # Main landing page
├── projects/                      # Individual project detail pages
│   ├── wifi-repeater.html
│   ├── wearable-oscilloscope.html
│   └── career-booster.html
├── css/
│   ├── style.css                  # Custom legacy CSS styles (design tokens, glass, etc.)
│   ├── config.css                 # Additional configuration styles
│   ├── tw-src.css                 # Tailwind source (directives + custom layers)
│   └── tw.css                     # Generated Tailwind build output (do not edit)
├── js/
│   ├── script.js                  # Global site logic
│   ├── data.js                    # Structured portfolio data (now includes page paths)
│   ├── includes.js                # Loads nav & footer partials
│   ├── project.js                 # Shared behaviors for project detail pages
│   ├── lightbox.js                # Lightweight image lightbox
│   ├── api-config.js              # Backend / API endpoint configuration
│   ├── email-config.js            # Email service configuration
│   └── ... more feature scripts
## 🌗 Theming & Accessibility Modes

Multi-mode theme selector in navigation (Light / Dark / Auto / Dim / High Contrast) plus Reduced Effects toggle stored in `localStorage`. Tokens drive colors and states via custom CSS variables (`:root` + mode-specific classes). Auto mode follows `prefers-color-scheme` and updates on system change. Reduced Effects removes heavy blurs/animations. High Contrast increases legibility; Dim offers lower luminance variant.

## 🧩 HTML Includes System

Reusable navigation and footer are stored in `partials/nav.html` and `partials/footer.html`. The loader `js/includes.js` fetches them into `#site-nav` and `#site-footer`. After loading, an `includes:loaded` event is dispatched for scripts that depend on injected elements (e.g., dark mode toggle binding).

## 🖼 Lightbox Gallery

Elements with `[data-lightbox]` open a fullscreen viewer (basic JS, no dependency). Add attributes:
```
<a data-lightbox data-src="assets/images/example.jpg" data-caption="Caption text">...</a>
```

## 🧮 Dynamic Project Cards (Module Based)

Runtime generation now lives in `js/projects-render.js` (ES module). `data.js` exposes `window.portfolioData`. To add a project:
1. Add an object to `projects` in `js/data.js` (include `id`, `title`, `description`, `icon`, `technologies[]`, `page`).
2. Create project detail HTML page under `projects/`.
3. Module automatically renders on `DOMContentLoaded`.

## 🏗 Build & Dev Tooling

Phase 1 migration to **Vite** + local **Tailwind** compilation:
```
npm install
npm run dev         # Vite dev server (Tailwind JIT scans sources)
npm run css:build   # Manual Tailwind build (normally not needed; run before standalone deploy)
npm run build       # Tailwind build -> Vite build -> legacy script
npm run preview     # Preview production build
```
Legacy `scripts/build.js` still runs post-Vite build for compatibility; future cleanup may remove duplication.

### Performance Budget
Defined in `performance-budget.json` (initial sizing targets) and enforced by:
```
npm run perf:check    # Fails CI if over budget
npm run perf:print    # Prints current asset size report
```

Metrics summarize HTML/CSS/JS/images folder sizes (simple heuristic pre real Lighthouse integration). Adjust thresholds after real data.

### Service Worker
`sw.js` caches core static assets for faster repeat visits. Update caching strategy if hashed filenames are introduced broadly.

### Backend (Contact API)
Express server under `backend/` provides `/api/contact` with:
* In-memory rate limiting
* Honeypot + timing guard synergy (client & server)
* Length + content validation & basic spam heuristics
* JSON file persistence (`contact-submissions.json`)
* CSV export and admin endpoints (dev use)

Environment auto-detects local vs production API base via `js/api-config.js`.

### Resilient Contact Form (Client)
Enhancements include:
* Honeypot field (`company`)
* Minimum fill time check
* Strong validation (length, link filtering)
* Duplicate submission suppression
* Exponential backoff (3 attempts)
* Offline queue + auto retry when connection restored
* LocalStorage backup of all submissions
* Accessible live status updates (`aria-live` region)

├── assets/
│   └── images/                    # Image assets
└── README.md
```

### Adding a New Project Page
1. Create a new HTML file in `projects/` (e.g. `projects/my-new-project.html`). You can copy one of the existing pages as a starting template.
2. Add a new project object to the `projects` array in `js/data.js` with a unique `id` and include a `page` property pointing to the new file path.
3. Update the portfolio grid in `index.html` (or refactor to generate dynamically) to include a new card linking to the page.
4. (Optional) Add project‑specific images to `assets/images/`.
5. Open `index.html` in a browser and verify navigation to the new page works.

## 🎨 Customization

### Colors
The website uses a monochrome color scheme with accent colors:
- Primary: `#3B82F6` (Blue)
- Secondary: `#C0C0C0` (Silver)
- Dark: `#1E40AF` (Dark Blue)

### Fonts
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📈 Performance Features

- Optimized images & deferred scripts
- Prefetch + preload critical assets
- Performance budget enforcement script
- Smooth animations with CSS transforms
- Debounced scroll events
- Intersection Observer for conditional animation
- Service worker caching strategy (static assets)

## ♿ Accessibility Features

- Semantic HTML structure & landmarks
- Keyboard navigation and focus trapping (mobile menu, theme menu)
- ARIA roles for theme selection (menu, menuitemradio)
- Live regions for form status + toast notifications
- High contrast & reduced effects modes
- Skip link, descriptive alt text, accessible color contrasts

## 🔮 Future Enhancements

- Consolidate legacy build script fully into Vite pipeline
- Lighthouse CI integration for automated performance scoring
- Image optimization pipeline (responsive sources / compression)
- Blog or articles section
- Multi-language (i18n) support
- Form email delivery with transactional provider (post EmailJS setup)

## 📞 Support

For any questions or customization requests, please contact Om Oberoi through the contact form on the website.

## 📄 License

This project is for personal use. Please contact Om Oberoi for permission before using this design for other purposes.

---

**Om Oberoi** | Electronics & Communication Engineer | Web Developer | Innovator
*Bridging the gap between hardware and software*