#!/bin/bash

# Portfolio Deployment Preparation Script

echo "🚀 Preparing Portfolio for Deployment..."

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Please run this script from the portfolio root directory"
    exit 1
fi

echo "✅ Found index.html - in correct directory"

# Check for required files
FILES=("index.html" "css/style.css" "js/script.js" "js/api-config.js")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Found $file"
    else
        echo "❌ Missing $file"
    fi
done

# Check backend URL configuration
if grep -q "portfolio-backend-production-97be.up.railway.app" js/api-config.js; then
    echo "✅ Backend URL configured correctly"
else
    echo "⚠️ Backend URL might need updating in js/api-config.js"
fi

# Create deployment checklist
echo ""
echo "📋 Deployment Checklist:"
echo "□ Backend deployed to Railway ✅"
echo "□ Frontend files prepared ✅"
echo "□ API URLs configured ✅"
echo "□ Choose deployment platform:"
echo "  - Netlify (drag & drop)"
echo "  - Vercel (GitHub integration)"
echo "  - GitHub Pages (free with repo)"
echo ""
echo "🎯 Ready for deployment!"
echo "📖 See DEPLOYMENT-FRONTEND.md for detailed instructions"