// Main module entry: orchestrates legacy globals and module code
// Import order matters if some scripts depend on globals.
import './api-config.js';   // exposes window.API_CONFIG
import './email-config.js'; // exposes window.EMAILJS_CONFIG
import './data.js';         // exposes window.portfolioData
import './includes.js';     // DOM includes and theme logic
import './script.js';       // main page interactions
import './projects-render.js';
