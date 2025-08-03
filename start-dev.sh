#!/bin/bash

echo "🚀 Starting RBC Digital Agency with host configuration..."
echo ""

# Set environment variables for Vite host configuration
export NODE_ENV=development
export HOST=0.0.0.0
export VITE_HOST=0.0.0.0
export VITE_PORT=5000

# Start the application
npx tsx server/index.ts