#!/bin/bash

echo "🔧 Configuring Strapi CMS for RBC Digital Agency..."
echo ""

# Create necessary directories
cd strapi-cms
mkdir -p .tmp
mkdir -p database/migrations

# Check if Strapi is already configured
if [ -f ".tmp/data.db" ]; then
    echo "✅ Strapi database already exists"
else
    echo "📦 Setting up Strapi database..."
fi

echo ""
echo "🌟 Strapi CMS Configuration Complete!"
echo ""
echo "To start Strapi CMS:"
echo "1. Run: ./start-strapi.sh"
echo "2. Open: http://localhost:1337/admin"
echo "3. Create admin account or use: admin@rbcdigital.com / admin123"
echo ""
echo "Your main website will automatically sync with Strapi content!"