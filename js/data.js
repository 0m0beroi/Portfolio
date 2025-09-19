// Portfolio Data Configuration
// Update this file to customize the portfolio content

const portfolioData = {
    // Personal Information
    personal: {
        name: "Om Oberoi",
        title: "Electronics & Communication Engineer | Web Developer | Innovator",
        tagline: "Bridging the gap between hardware and software",
        bio: "An ambitious and driven undergraduate student of Electronics and Communication Engineering with a keen interest in the intersection of hardware and software. I'm passionate about creating innovative solutions that bridge the gap between traditional electronics and modern web technologies.",
        location: "Lucknow, Uttar Pradesh, India",
        graduationYear: "2027",
        university: "BBDNIIT",
        degree: "B.Tech in Electronics & Communication Engineering"
    },

    // Contact Information
    contact: {
        email: "om.oberoi@example.com",
        phone: "+91 XXXXX XXXXX",
        socialLinks: {
            linkedin: "https://linkedin.com/in/om-oberoi",
            github: "https://github.com/om-oberoi",
            leetcode: "https://leetcode.com/om-oberoi",
            instagram: "https://instagram.com/om.oberoi"
        }
    },

    // Education & Certifications
    education: {
        degree: {
            name: "B.Tech in Electronics & Communication Engineering",
            institution: "BBDNIIT",
            year: "2027",
            icon: "fas fa-graduation-cap"
        },
        certifications: [
            {
                name: "Cloud Computing Course",
                institution: "Infosys Springboard",
                year: "2024",
                icon: "fas fa-cloud"
            },
            {
                name: "Drone Technology Bootcamp",
                institution: "CDAC Patna",
                year: "2024",
                icon: "fas fa-drone"
            }
        ]
    },

    // Skills with percentages
    skills: [
        {
            name: "Circuit Design",
            percentage: 90,
            icon: "fas fa-microchip"
        },
        {
            name: "Embedded Systems",
            percentage: 85,
            icon: "fas fa-memory"
        },
        {
            name: "Web Development",
            percentage: 80,
            icon: "fas fa-code"
        },
        {
            name: "Data Structures & Algorithms",
            percentage: 75,
            icon: "fas fa-project-diagram"
        }
    ],

    // Services Offered
    services: [
        {
            title: "Web Designing",
            description: "Creating modern, responsive, and user-friendly websites with clean design principles and optimal user experience.",
            icon: "fas fa-palette"
        },
        {
            title: "Project Development",
            description: "End-to-end development of electronics and software projects, from concept to deployment with innovative solutions.",
            icon: "fas fa-code"
        },
        {
            title: "Tutoring",
            description: "Personalized tutoring in electronics, programming, and web development to help students excel in their studies.",
            icon: "fas fa-chalkboard-teacher"
        }
    ],

    // Portfolio Projects
    projects: [
        {
            id: 1,
            title: "Wi-Fi Repeater using ESP32",
            description: "An embedded system project designed to extend Wi-Fi coverage using ESP32 microcontroller, featuring automatic signal amplification and seamless network bridging.",
            icon: "fas fa-wifi",
            technologies: ["ESP32", "Embedded Systems", "Wi-Fi"],
            category: "Hardware",
            status: "Completed",
            year: "2024",
            github: "#",
            demo: "#",
            details: {
                overview: "This project focuses on creating a robust Wi-Fi repeater solution using the ESP32 microcontroller...",
                features: [
                    "Automatic signal detection and amplification",
                    "Seamless network bridging",
                    "Web-based configuration interface",
                    "Real-time signal strength monitoring"
                ],
                challenges: [
                    "Signal interference management",
                    "Power optimization",
                    "Antenna design and placement"
                ],
                outcomes: [
                    "Extended Wi-Fi coverage by 300%",
                    "Reduced dead zones in target area",
                    "Cost-effective alternative to commercial repeaters"
                ]
            }
        },
        {
            id: 2,
            title: "Wearable Oscilloscope Smartwatch",
            description: "Revolutionary portable oscilloscope integrated into a smartwatch form factor, enabling real-time signal analysis on-the-go for electronics engineers.",
            icon: "fas fa-chart-line",
            technologies: ["Wearables", "Signal Processing", "IoT"],
            category: "Innovation",
            status: "In Development",
            year: "2024",
            github: "#",
            demo: "#",
            details: {
                overview: "A groundbreaking wearable device that combines the functionality of an oscilloscope with the convenience of a smartwatch...",
                features: [
                    "Real-time signal visualization",
                    "Touch-based interface",
                    "Wireless data transmission",
                    "Long battery life optimization"
                ],
                challenges: [
                    "Miniaturization of components",
                    "Power consumption optimization",
                    "Signal accuracy in compact form"
                ],
                outcomes: [
                    "Prototype development completed",
                    "Patent application in progress",
                    "Industry interest from wearable tech companies"
                ]
            }
        },
        {
            id: 3,
            title: "Smart Career Booster Series",
            description: "Comprehensive software solution designed to accelerate career development through personalized learning paths, skill assessments, and industry insights.",
            icon: "fas fa-rocket",
            technologies: ["Web Development", "AI/ML", "EdTech"],
            category: "Software",
            status: "Beta Testing",
            year: "2024",
            github: "#",
            demo: "#",
            details: {
                overview: "An intelligent platform that helps students and professionals advance their careers through data-driven insights...",
                features: [
                    "Personalized learning recommendations",
                    "Skill gap analysis",
                    "Industry trend tracking",
                    "Mentor matching system"
                ],
                challenges: [
                    "Algorithm optimization for recommendations",
                    "Database scalability",
                    "User engagement strategies"
                ],
                outcomes: [
                    "1000+ beta users registered",
                    "92% user satisfaction rate",
                    "Featured in university innovation showcase"
                ]
            }
        }
    ],

    // Navigation Menu Items
    navigation: [
        { name: "Home", href: "#home", icon: "fas fa-home" },
        { name: "About", href: "#about", icon: "fas fa-user" },
        { name: "Portfolio", href: "#portfolio", icon: "fas fa-briefcase" },
        { name: "Skills", href: "#skills", icon: "fas fa-cogs" },
        { name: "Contact", href: "#contact", icon: "fas fa-envelope" }
    ],

    // Theme Configuration
    theme: {
        colors: {
            primary: "#3B82F6",      // Blue
            secondary: "#1E40AF",    // Dark Blue
            accent: "#C0C0C0",       // Silver
            success: "#10B981",      // Green
            warning: "#F59E0B",      // Orange
            error: "#EF4444"         // Red
        },
        fonts: {
            primary: "Poppins",
            secondary: "Inter"
        }
    },

    // SEO Meta Data
    seo: {
        title: "Om Oberoi | Electronics & Communication Engineer | Portfolio",
        description: "Om Oberoi - Electronics & Communication Engineering student at BBDNIIT. Passionate about bridging hardware and software through innovative projects.",
        keywords: "Om Oberoi, Electronics Engineer, Web Developer, BBDNIIT, Portfolio, ECE, Embedded Systems",
        author: "Om Oberoi",
        url: "https://om-oberoi.portfolio.com",
        image: "/assets/images/og-image.jpg"
    },

    // Analytics & Tracking
    analytics: {
        googleAnalytics: "GA_MEASUREMENT_ID",
        facebookPixel: "FB_PIXEL_ID",
        linkedinInsights: "LINKEDIN_PARTNER_ID"
    },

    // Form Configuration
    forms: {
        contact: {
            action: "#", // Replace with actual form handler URL
            method: "POST",
            fields: {
                name: { required: true, minLength: 2 },
                email: { required: true, pattern: "email" },
                message: { required: true, minLength: 10 }
            }
        }
    },

    // Feature Flags
    features: {
        darkMode: false,
        animations: true,
        lazyLoading: true,
        serviceWorker: false,
        analytics: false,
        chatWidget: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}

// Make available globally
window.portfolioData = portfolioData;