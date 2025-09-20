const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Railway-specific configuration
const isProduction = process.env.NODE_ENV === 'production';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8000';

// Middleware
app.use(cors({
    origin: isProduction ? [FRONTEND_URL, /\.railway\.app$/, /\.netlify\.app$/, /\.vercel\.app$/] : true,
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data storage file
const dataFile = path.join(__dirname, 'contact-submissions.json');

// Ensure data file exists
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

// Helper function to read submissions
function readSubmissions() {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading submissions:', error);
        return [];
    }
}

// Helper function to save submissions
function saveSubmissions(submissions) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(submissions, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving submissions:', error);
        return false;
    }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Submit contact form
// Basic in-memory rate limiting + spam guard
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per window per IP
const submissionLog = new Map(); // ip -> array of timestamps

function isRateLimited(ip) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;
    const list = (submissionLog.get(ip) || []).filter(ts => ts > windowStart);
    if (list.length >= RATE_LIMIT_MAX) {
        submissionLog.set(ip, list); // keep pruned
        return true;
    }
    list.push(now);
    submissionLog.set(ip, list);
    return false;
}

function basicSpamHeuristic({ name, email, message }) {
    const lc = message.toLowerCase();
    const spamPatterns = [/https?:\/\//, /viagra|casino|loan|bitcoin/i, /(.)\1{6,}/];
    if (spamPatterns.some(r => r.test(lc))) return 'Message appears to contain spam content';
    if (/(<script|<a\s)/i.test(lc)) return 'HTML or script tags are not allowed';
    return null;
}

app.post('/api/contact', (req, res) => {
    const { name, email, message, company } = req.body || {};
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.connection.remoteAddress;

    // Honeypot
    if (company) {
        return res.status(400).json({ success: false, error: 'Spam detected (honeypot)' });
    }

    if (isRateLimited(clientIp)) {
        return res.status(429).json({ success: false, error: 'Too many submissions. Please wait a minute.' });
    }

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
    }

    // Length constraints
    if (name.length < 2 || name.length > 100) {
        return res.status(400).json({ success: false, error: 'Name must be between 2 and 100 characters' });
    }
    if (email.length > 160) {
        return res.status(400).json({ success: false, error: 'Email too long' });
    }
    if (message.length < 10 || message.length > 2000) {
        return res.status(400).json({ success: false, error: 'Message must be between 10 and 2000 characters' });
    }
    if (/https?:\/\//i.test(message)) {
        return res.status(400).json({ success: false, error: 'Links are not allowed in message' });
    }

    const spamReason = basicSpamHeuristic({ name, email, message });
    if (spamReason) {
        return res.status(400).json({ success: false, error: spamReason });
    }

    const submission = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        ip: clientIp
    };

    const submissions = readSubmissions();
    submissions.push(submission);
    if (saveSubmissions(submissions)) {
        console.log(`New contact submission from: ${submission.name} (${submission.email})`);
        return res.json({ success: true, message: 'Contact form submitted successfully', id: submission.id });
    } else {
        return res.status(500).json({ success: false, error: 'Failed to save submission' });
    }
});

// Get all submissions (for admin use)
app.get('/api/submissions', (req, res) => {
    const submissions = readSubmissions();
    res.json({
        success: true,
        count: submissions.length,
        submissions: submissions
    });
});

// Get specific submission by ID
app.get('/api/submissions/:id', (req, res) => {
    const submissions = readSubmissions();
    const submission = submissions.find(s => s.id === parseInt(req.params.id));
    
    if (submission) {
        res.json({ success: true, submission });
    } else {
        res.status(404).json({ success: false, error: 'Submission not found' });
    }
});

// Delete submission by ID (for admin use)
app.delete('/api/submissions/:id', (req, res) => {
    const submissions = readSubmissions();
    const index = submissions.findIndex(s => s.id === parseInt(req.params.id));
    
    if (index !== -1) {
        const deleted = submissions.splice(index, 1)[0];
        if (saveSubmissions(submissions)) {
            res.json({ success: true, message: 'Submission deleted', deleted });
        } else {
            res.status(500).json({ success: false, error: 'Failed to delete submission' });
        }
    } else {
        res.status(404).json({ success: false, error: 'Submission not found' });
    }
});

// Export submissions as CSV
app.get('/api/export/csv', (req, res) => {
    const submissions = readSubmissions();
    
    if (submissions.length === 0) {
        return res.status(404).json({ success: false, error: 'No submissions to export' });
    }
    
    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Message', 'Timestamp', 'IP'];
    const csvContent = [
        headers.join(','),
        ...submissions.map(sub => [
            sub.id,
            `"${sub.name}"`,
            `"${sub.email}"`,
            `"${sub.message.replace(/"/g, '""')}"`,
            `"${sub.timestamp}"`,
            `"${sub.ip || 'N/A'}"`
        ].join(','))
    ].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="contact-submissions-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csvContent);
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio backend server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Submissions API: http://localhost:${PORT}/api/submissions`);
    console.log(`Data stored in: ${dataFile}`);
});

module.exports = app;