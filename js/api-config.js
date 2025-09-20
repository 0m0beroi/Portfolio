// API Configuration
const API_CONFIG = {
    // Production Railway URL
    BACKEND_URL: 'https://portfolio-backend-production-97be.up.railway.app',
    
    // Local development URL (for testing)
    LOCAL_URL: 'http://localhost:3001',
    
    // Auto-detect environment
    get BASE_URL() {
        // If running locally (localhost), use local URL
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return this.LOCAL_URL;
        }
        // Otherwise use production URL
        return this.BACKEND_URL;
    },
    
    // API endpoints
    ENDPOINTS: {
        CONTACT: '/api/contact',
        HEALTH: '/api/health',
        SUBMISSIONS: '/api/submissions'
    }
};

// Make available globally
window.API_CONFIG = API_CONFIG;