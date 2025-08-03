#!/bin/bash

echo "🚀 Self-Host Strapi Deployment Script"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -d "strapi-cms" ]; then
    echo "❌ Error: strapi-cms directory not found"
    echo "Run this script from your project root directory"
    exit 1
fi

echo "📁 Preparing Strapi files for deployment..."

# Create deployment package
mkdir -p deploy-package
cp -r strapi-cms/* deploy-package/
cp SELF_HOST_STRAPI.md deploy-package/

echo "📦 Creating deployment archive..."
tar -czf strapi-deployment.tar.gz deploy-package/

echo ""
echo "✅ Deployment package ready!"
echo ""
echo "Next steps:"
echo "1. Upload strapi-deployment.tar.gz to your server"
echo "2. Extract: tar -xzf strapi-deployment.tar.gz"
echo "3. Follow the SELF_HOST_STRAPI.md guide"
echo ""
echo "Quick server setup:"
echo "scp strapi-deployment.tar.gz user@your-server-ip:~/"
echo "ssh user@your-server-ip"
echo "tar -xzf strapi-deployment.tar.gz"
echo "cd deploy-package"
echo "cat SELF_HOST_STRAPI.md"

# Cleanup
rm -rf deploy-package