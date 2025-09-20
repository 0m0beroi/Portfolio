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
- **JavaScript (ES6+)** - Interactive functionality
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
 - Dynamic project card rendering from `js/data.js`
 - Lightbox gallery (on project pages)
 - Dark mode toggle with persistence

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
2. Open `index.html` in a web browser
3. No build process required - ready to use!

## 📁 File Structure

```
portfolio/
├── index.html                     # Main landing page
├── projects/                      # Individual project detail pages
│   ├── wifi-repeater.html
│   ├── wearable-oscilloscope.html
│   └── career-booster.html
├── css/
│   ├── style.css                  # Custom CSS styles
│   └── config.css                 # Additional configuration styles
├── js/
│   ├── script.js                  # Global site logic
│   ├── data.js                    # Structured portfolio data (now includes page paths)
│   ├── includes.js                # Loads nav & footer partials
│   ├── project.js                 # Shared behaviors for project detail pages
│   ├── lightbox.js                # Lightweight image lightbox
│   ├── api-config.js              # Backend / API endpoint configuration
│   ├── email-config.js            # Email service configuration
│   └── ... more feature scripts
## 🌗 Dark Mode

Implemented via a toggle button in the navigation bar. Preference is stored in `localStorage` (`darkMode=true|false`). The `dark` class is applied to `html` allowing Tailwind's dark variants (future enhancement) or custom CSS toggling.

## 🧩 HTML Includes System

Reusable navigation and footer are stored in `partials/nav.html` and `partials/footer.html`. The loader `js/includes.js` fetches them into `#site-nav` and `#site-footer`. After loading, an `includes:loaded` event is dispatched for scripts that depend on injected elements (e.g., dark mode toggle binding).

## 🖼 Lightbox Gallery

Elements with `[data-lightbox]` open a fullscreen viewer (basic JS, no dependency). Add attributes:
```
<a data-lightbox data-src="assets/images/example.jpg" data-caption="Caption text">...</a>
```

## 🧮 Dynamic Project Cards

The portfolio grid on `index.html` is now generated at runtime from the `projects` array in `data.js`. Each project needs a `page` path and core metadata. To add a new project:
1. Add the project object to `projects` in `data.js` (ensure it has a `page` field).
2. Create the corresponding HTML page in `projects/` (copy a template).
3. Reload the homepage – the new card appears automatically.

## 🏗 Build Script

Added a minimal Node build pipeline:
```
npm install   # (no dependencies yet, optional)
npm run build
```
Outputs a `dist/` directory with minified `.css` and `.js` plus copied assets & HTML. The script is intentionally simple (regex-based); for production consider tools like Vite, Parcel, or Rollup.

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

- Optimized images
- Efficient CSS and JavaScript
- Smooth animations with CSS transforms
- Debounced scroll events
- Intersection Observer for animations

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- High contrast support
- Reduced motion support

## 🔮 Future Enhancements

- Dark mode toggle
- More project details pages
- Blog integration
- Service worker for offline support
- Advanced animations
- Multi-language support

## 📞 Support

For any questions or customization requests, please contact Om Oberoi through the contact form on the website.

## 📄 License

This project is for personal use. Please contact Om Oberoi for permission before using this design for other purposes.

---

**Om Oberoi** | Electronics & Communication Engineer | Web Developer | Innovator
*Bridging the gap between hardware and software*