#!/bin/bash

echo "🚀 Starting Strapi CMS Admin Panel..."
echo ""
echo "Admin Panel will be available at: http://localhost:1338/admin"
echo ""
echo "To access your Strapi admin:"
echo "1. Open: http://localhost:1338/admin"
echo "2. Create admin account or use: admin@rbcdigital.com / admin123"
echo ""

# Change to strapi directory
cd strapi-cms

# Install dependencies if missing
if [ ! -d "node_modules" ]; then
    echo "Installing Strapi dependencies..."
    npm install
fi

echo "Starting Strapi CMS..."
export NODE_ENV=development
export HOST=0.0.0.0
export PORT=1338

npm run develop