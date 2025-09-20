const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
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
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and message are required'
        });
    }
    
    // Create submission object
    const submission = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress
    };
    
    // Read existing submissions
    const submissions = readSubmissions();
    
    // Add new submission
    submissions.push(submission);
    
    // Save to file
    if (saveSubmissions(submissions)) {
        console.log(`New contact submission from: ${name} (${email})`);
        res.json({
            success: true,
            message: 'Contact form submitted successfully',
            id: submission.id
        });
    } else {
        res.status(500).json({
            success: false,
            error: 'Failed to save submission'
        });
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