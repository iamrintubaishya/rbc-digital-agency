#!/bin/bash

echo "🔧 Configuring Strapi CMS for RBC Digital Agency..."
echo ""

# Change to strapi directory
cd strapi-cms

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Strapi dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Build the admin panel
echo "🏗️  Building Strapi admin panel..."
npm run build

echo ""
echo "🚀 Strapi CMS is now configured!"
echo ""
echo "To start Strapi CMS, run:"
echo "  ./start-strapi.sh"
echo ""
echo "Once started, access the admin panel at:"
echo "  http://localhost:1337/admin"
echo ""
echo "Default admin credentials:"
echo "  Email: admin@rbcdigital.com"
echo "  Password: admin123"