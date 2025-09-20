// EmailJS Configuration
// Replace these values with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY', // Get from EmailJS dashboard
    SERVICE_ID: 'YOUR_SERVICE_ID',         // Gmail, Outlook, etc.
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID'        // Your email template
};

// Instructions to set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{name}}, {{email}}, {{message}}
// 4. Get your Public Key from the dashboard
// 5. Replace the values above with your actual credentials

// Example email template variables you can use:
// - {{name}} - sender's name
// - {{email}} - sender's email  
// - {{message}} - the message content
// - {{timestamp}} - when the message was sent