# Portfolio Development Guide

A comprehensive guide for customizing and maintaining Om Oberoi's portfolio website.

## 🚀 Quick Start

1. **Clone/Download** the portfolio files
2. **Open** `index.html` in a web browser
3. **Customize** content using the configuration files
4. **Add** your own images and update paths
5. **Deploy** to your hosting platform

## 📁 Project Structure

```
portfolio/
├── index.html                 # Main HTML file
├── README.md                 # Project documentation
├── DEVELOPMENT.md            # This file
├── css/
│   ├── config.css           # Configuration & CSS variables
│   └── style.css            # Custom styles & animations
├── js/
│   ├── data.js              # Portfolio content data
│   └── script.js            # Interactive functionality
└── assets/
    └── images/              # Image assets
        └── README.md        # Image requirements guide
```

## 🎨 Customization Guide

### 1. Personal Information

**File**: `js/data.js`

Update the `personal` object:
```javascript
personal: {
    name: "Your Name",
    title: "Your Professional Title",
    tagline: "Your Personal Tagline",
    bio: "Your biography...",
    // ... other fields
}
```

### 2. Contact Information

**File**: `js/data.js`

Update the `contact` object:
```javascript
contact: {
    email: "your.email@domain.com",
    phone: "+1 234 567 8900",
    socialLinks: {
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername",
        // ... other social links
    }
}
```

### 3. Projects

**File**: `js/data.js`

Modify the `projects` array:
```javascript
projects: [
    {
        id: 1,
        title: "Your Project Title",
        description: "Project description...",
        icon: "fas fa-icon-name",
        technologies: ["Tech1", "Tech2", "Tech3"],
        // ... other project details
    }
    // Add more projects
]
```

### 4. Skills

**File**: `js/data.js`

Update the `skills` array:
```javascript
skills: [
    {
        name: "Skill Name",
        percentage: 85,
        icon: "fas fa-icon-name"
    }
    // Add more skills
]
```

### 5. Colors & Theme

**File**: `css/config.css`

Modify CSS variables:
```css
:root {
    --primary-color: #3B82F6;     /* Change primary color */
    --secondary-color: #1E40AF;   /* Change secondary color */
    --accent-color: #C0C0C0;      /* Change accent color */
}
```

### 6. Typography

**File**: `css/config.css`

Update font families:
```css
:root {
    --font-primary: 'Your-Font', sans-serif;
    --font-secondary: 'Your-Font', sans-serif;
}
```

Don't forget to add the Google Fonts link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your-Font:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 🖼️ Adding Images

### Profile Image
1. Add your professional photo as `assets/images/profile.jpg`
2. Update the HTML in the About section:
```html
<img src="assets/images/profile.jpg" alt="Your Name" class="w-80 h-80 rounded-2xl object-cover shadow-2xl">
```

### Project Images
1. Add project screenshots as `assets/images/project-name.jpg`
2. Update the project cards in HTML:
```html
<div class="h-48 bg-cover bg-center" style="background-image: url('assets/images/project-name.jpg')">
```

### Favicon
1. Add `favicon.ico` to the root directory
2. Add favicon links in `<head>`:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

## 🎯 SEO Optimization

### Meta Tags
Update meta tags in `index.html`:
```html
<meta name="description" content="Your description">
<meta name="keywords" content="your, keywords, here">
<title>Your Name | Your Title</title>
```

### Open Graph Tags
Add Open Graph meta tags:
```html
<meta property="og:title" content="Your Name | Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yourdomain.com/assets/images/og-image.jpg">
<meta property="og:url" content="https://yourdomain.com">
```

## 📱 Responsive Design

The portfolio is built mobile-first with Tailwind CSS breakpoints:

- **Mobile**: < 640px (default)
- **Tablet**: 640px - 1024px (`sm:` and `md:` classes)
- **Desktop**: > 1024px (`lg:`, `xl:`, `2xl:` classes)

### Testing Responsiveness
1. Use browser dev tools
2. Test on actual devices
3. Check all breakpoints
4. Verify touch interactions

## 🚀 Performance Optimization

### Image Optimization
1. Compress images (use tools like TinyPNG)
2. Use appropriate formats (WebP with fallbacks)
3. Add `loading="lazy"` attributes
4. Consider using a CDN

### Code Optimization
1. Minimize CSS and JavaScript in production
2. Remove unused CSS classes
3. Optimize font loading
4. Enable gzip compression on server

## 🔧 Browser Support

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Progressive Enhancement
- Core functionality works without JavaScript
- Graceful degradation for older browsers
- Fallbacks for modern CSS features

## 📈 Analytics Setup

### Google Analytics
1. Get tracking ID from Google Analytics
2. Update `js/data.js`:
```javascript
analytics: {
    googleAnalytics: "GA_MEASUREMENT_ID"
}
```
3. Add tracking code to `index.html`

## 🛠️ Development Workflow

### Local Development
1. Use Live Server extension in VS Code
2. Or use Python: `python -m http.server 8000`
3. Or use Node.js: `npx serve .`

### Version Control
1. Initialize git repository: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial portfolio"`
4. Push to GitHub/GitLab

### Deployment Options

#### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Choose source branch

#### Netlify
1. Drag and drop folder to Netlify
2. Or connect GitHub repository
3. Configure build settings if needed

#### Vercel
1. Import project from GitHub
2. Configure deployment settings
3. Deploy with zero configuration

## 🧪 Testing Checklist

### Functionality Testing
- [ ] Navigation links work
- [ ] Contact form validation
- [ ] Mobile menu toggle
- [ ] Smooth scrolling
- [ ] Hover effects
- [ ] Button interactions

### Responsiveness Testing
- [ ] Mobile portrait (320px - 480px)
- [ ] Mobile landscape (480px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1920px+)

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score > 90

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Alt text for images
- [ ] Focus indicators

## 🔍 Troubleshooting

### Common Issues

#### Images not loading
- Check file paths are correct
- Ensure images are in the right directory
- Verify file extensions match

#### Styles not applying
- Check CSS file links in HTML
- Verify Tailwind CDN is loading
- Check for CSS syntax errors

#### JavaScript not working
- Check browser console for errors
- Verify script file paths
- Ensure proper script loading order

#### Mobile menu not working
- Check JavaScript file is loaded
- Verify mobile menu HTML structure
- Test on actual mobile devices

## 📚 Resources

### Documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com)

### Tools
- [TinyPNG](https://tinypng.com) - Image compression
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing
- [Can I Use](https://caniuse.com) - Browser compatibility

### Inspiration
- [Dribbble](https://dribbble.com/tags/portfolio) - Design inspiration
- [Awwwards](https://www.awwwards.com) - Web design gallery
- [Behance](https://www.behance.net) - Creative portfolios

## 🆘 Support

For questions or issues:
1. Check this documentation first
2. Search for solutions online
3. Contact the original developer
4. Create issues on the repository

---

**Happy customizing!** 🎉