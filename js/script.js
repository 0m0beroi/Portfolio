// Om Oberoi Portfolio - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Navigation Functionality =====
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('show');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
    
    // ===== Navigation Active State =====
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== Navbar Background on Scroll =====
    
    const navbar = document.getElementById('navbar');
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/95', 'shadow-md');
            navbar.classList.remove('bg-white/80');
        } else {
            navbar.classList.add('bg-white/80');
            navbar.classList.remove('bg-white/95', 'shadow-md');
        }
    }
    
    // ===== Intersection Observer for Animations =====
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate skill bars when skills section comes into view
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sectionsToAnimate = document.querySelectorAll('section');
    sectionsToAnimate.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // ===== Skill Bars Animation =====
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-item');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.opacity = '1';
                bar.style.transform = 'translateX(0)';
                
                // Animate the progress bar fill
                const progressBar = bar.querySelector('[style*="width"]');
                if (progressBar) {
                    const finalWidth = progressBar.style.width;
                    progressBar.style.width = '0%';
                    progressBar.style.transition = 'width 1s ease-out';
                    
                    setTimeout(() => {
                        progressBar.style.width = finalWidth;
                    }, 100);
                }
            }, index * 150);
        });
    }
    
    // ===== Contact Form Functionality =====
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!validateForm(name, email, message)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Store form data in localStorage (backup)
            const submissionData = {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(submissionData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Send email via EmailJS (if configured)
            sendEmailViaEmailJS(submissionData, submitBtn, originalText);
        });
    }
    
    // ===== Email and Backend Integration =====
    
    async function sendEmailViaEmailJS(submissionData, submitBtn, originalText) {
        try {
            // Try backend first
            await sendToBackend(submissionData);
            
            // If backend succeeds, also try EmailJS (if configured)
            if (typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
                await sendViaEmailJS(submissionData);
            }
            
            // Success - reset form
            resetFormAfterSuccess(submitBtn, originalText);
            
        } catch (error) {
            console.error('Submission error:', error);
            // Show warning but don't fail completely since we have localStorage backup
            showNotification('Message saved locally. Please try again later.', 'warning');
            resetFormAfterSuccess(submitBtn, originalText);
        }
    }
    
    async function sendToBackend(submissionData) {
        const apiUrl = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CONTACT;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: submissionData.name,
                email: submissionData.email,
                message: submissionData.message
            })
        });
        
        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }
        
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error || 'Backend submission failed');
        }
        
        console.log('✅ Message sent to backend successfully');
        showNotification('Message sent successfully!', 'success');
        return result;
    }
    
    async function sendViaEmailJS(submissionData) {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }
        
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        
        const templateParams = {
            name: submissionData.name,
            email: submissionData.email,
            message: submissionData.message,
            timestamp: submissionData.timestamp
        };
        
        const result = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
        
        console.log('✅ Email sent via EmailJS successfully');
        return result;
    }
    
    function resetFormAfterSuccess(submitBtn, originalText) {
        const contactForm = document.getElementById('contact-form');
        contactForm.reset();
        removeValidationClasses();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }

    // Form validation
    function validateForm(name, email, message) {
        let isValid = true;
        
        // Remove previous validation classes
        removeValidationClasses();
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (!name || name.trim().length < 2) {
            nameInput.classList.add('form-error');
            showFieldError(nameInput, 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            nameInput.classList.add('form-success');
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            emailInput.classList.add('form-error');
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            emailInput.classList.add('form-success');
        }
        
        // Validate message
        const messageInput = document.getElementById('message');
        if (!message || message.trim().length < 10) {
            messageInput.classList.add('form-error');
            showFieldError(messageInput, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            messageInput.classList.add('form-success');
        }
        
        return isValid;
    }
    
    function removeValidationClasses() {
        const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
        inputs.forEach(input => {
            input.classList.remove('form-error', 'form-success');
            // Remove error messages
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    }
    
    function showFieldError(field, message) {
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    // ===== EmailJS Integration =====
    
    function sendEmailViaEmailJS(submissionData, submitBtn, originalText) {
        // Check if EmailJS is configured
        if (typeof EMAILJS_CONFIG === 'undefined' || 
            EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
            // EmailJS not configured, use localStorage only
            setTimeout(() => {
                showNotification('Message saved locally!', 'success');
                resetFormAndButton(submitBtn, originalText);
            }, 1000);
            return;
        }
        
        // Initialize EmailJS
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        
        // Prepare template parameters
        const templateParams = {
            name: submissionData.name,
            email: submissionData.email,
            message: submissionData.message,
            timestamp: new Date(submissionData.timestamp).toLocaleString()
        };
        
        // Send email
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            .then(() => {
                showNotification('Message sent successfully!', 'success');
                resetFormAndButton(submitBtn, originalText);
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                showNotification('Message saved locally. Email service unavailable.', 'warning');
                resetFormAndButton(submitBtn, originalText);
            });
    }
    
    function resetFormAndButton(submitBtn, originalText) {
        contactForm.reset();
        removeValidationClasses();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
    
    // ===== Notification System =====
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${getNotificationClasses(type)}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas ${getNotificationIcon(type)} text-xl"></i>
                <span class="font-medium">${message}</span>
                <button class="ml-4 text-xl opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
    
    function getNotificationClasses(type) {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-blue-500 text-white';
        }
    }
    
    function getNotificationIcon(type) {
        switch (type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-exclamation-circle';
            case 'warning':
                return 'fa-exclamation-triangle';
            default:
                return 'fa-info-circle';
        }
    }
    
    // ===== Project Cards Interaction =====
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const learnMoreBtn = card.querySelector('button');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function() {
                const projectTitle = card.querySelector('h3').textContent;
                showNotification(`More details about "${projectTitle}" coming soon!`, 'info');
            });
        }
    });
    
    // ===== Typing Animation for Hero Section =====
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ===== Parallax Effect =====
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const translateY = scrolled * speed;
            element.style.transform = `translateY(${translateY}px)`;
        });
    }
    
    // ===== Event Listeners =====
    
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
        handleParallax();
    });
    
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth >= 768 && mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
    
    // ===== Initialize on Load =====
    
    // Set initial states
    updateActiveNavLink();
    updateNavbarBackground();
    
    // Add loading class removal
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ===== Dark Mode Toggle (Future Enhancement) =====
    
    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
    }
    
    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
    }
    
    // ===== Performance Optimizations =====
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll-heavy functions
    window.addEventListener('scroll', debounce(function() {
        updateActiveNavLink();
        updateNavbarBackground();
    }, 10));
    
    // ===== Accessibility Enhancements =====
    
    // Focus management for mobile menu
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
            
            if (e.key === 'Escape') {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.focus();
            }
        });
    }
    
    // Apply focus trap to mobile menu
    if (mobileMenu) {
        trapFocus(mobileMenu);
    }
    
    // ===== Console Welcome Message =====
    
    console.log(
        '%c👋 Welcome to Om Oberoi\'s Portfolio!',
        'color: #3B82F6; font-size: 16px; font-weight: bold;'
    );
    console.log(
        '%cInterested in the code? Check out the repository!',
        'color: #6B7280; font-size: 14px;'
    );
    
});

// ===== Utility Functions =====

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard!', 'success');
    }).catch(function() {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Generate random ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// ===== Service Worker Registration (Future Enhancement) =====

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// ===== Analytics (Future Enhancement) =====

function trackEvent(eventName, eventProperties = {}) {
    // Analytics tracking code would go here
    console.log('Event tracked:', eventName, eventProperties);
}

// Track page views
trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date().toISOString()
});

// ===== Contact Form Data Management =====

// Function to retrieve all stored contact submissions
function getContactSubmissions() {
    return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
}

// Function to export submissions as CSV (for admin use)
function exportSubmissionsCSV() {
    const submissions = getContactSubmissions();
    if (submissions.length === 0) {
        console.log('No submissions to export');
        return;
    }
    
    const headers = ['Name', 'Email', 'Message', 'Timestamp'];
    const csvContent = [
        headers.join(','),
        ...submissions.map(sub => [
            `"${sub.name}"`,
            `"${sub.email}"`,
            `"${sub.message.replace(/"/g, '""')}"`,
            `"${sub.timestamp}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Function to clear all stored submissions (for testing)
function clearStoredSubmissions() {
    localStorage.removeItem('contactSubmissions');
    console.log('All stored submissions cleared');
}

// Make functions available globally for console access
window.getContactSubmissions = getContactSubmissions;
window.exportSubmissionsCSV = exportSubmissionsCSV;
window.clearStoredSubmissions = clearStoredSubmissions;