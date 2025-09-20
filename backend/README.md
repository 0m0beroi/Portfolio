# Portfolio Backend Server

Simple Node.js/Express server for handling contact form submissions.

## Features

- ✅ Store contact form submissions in JSON file
- ✅ CORS enabled for frontend integration
- ✅ Input validation
- ✅ Export submissions as CSV
- ✅ RESTful API endpoints
- ✅ Error handling

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3001`

### 3. Update Frontend
Add this function to your `js/script.js` to use the backend:

```javascript
async function sendToBackend(submissionData) {
    try {
        const response = await fetch('http://localhost:3001/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Message sent successfully!', 'success');
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Backend error:', error);
        showNotification('Failed to send message. Saved locally.', 'warning');
    }
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/submissions` | Get all submissions |
| GET | `/api/submissions/:id` | Get specific submission |
| DELETE | `/api/submissions/:id` | Delete submission |
| GET | `/api/export/csv` | Export as CSV |

## Data Storage

Submissions are stored in `contact-submissions.json` with this structure:

```json
[
  {
    "id": 1639123456789,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I'm interested in your work!",
    "timestamp": "2023-12-10T10:30:45.123Z",
    "ip": "127.0.0.1"
  }
]
```

## Deployment Options

### 1. Local Development
Run on `localhost:3001` for testing

### 2. VPS/Cloud Server
Deploy to DigitalOcean, AWS EC2, or similar

### 3. Heroku (Free Tier)
```bash
# Install Heroku CLI, then:
heroku create your-portfolio-backend
git add .
git commit -m "Add backend"
git push heroku main
```

### 4. Vercel/Netlify Functions
Convert to serverless functions for free hosting

## Security Considerations

For production, consider adding:
- Rate limiting
- Input sanitization
- Authentication for admin endpoints
- HTTPS only
- Environment variables for configuration
- Database instead of JSON file