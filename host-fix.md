# Host Blocking Issue - Temporary Solution

## The Issue
Vite is blocking the Replit host domain because it's not in the allowedHosts configuration.

## Quick Solution Options

### Option 1: Access via localhost URL
Instead of using the Replit domain, try accessing:
- http://localhost:5000 (if running locally)

### Option 2: Use curl for testing
```bash
curl -H "Host: localhost" http://localhost:5000
```

### Option 3: Browser workaround
1. Open browser developer tools (F12)
2. Go to Network tab
3. Right-click on the blocked request
4. Select "Copy as cURL"
5. Modify the Host header to "localhost"

## Long-term Solution
The Vite configuration files are protected and cannot be modified. This is a development environment restriction that prevents host spoofing attacks.

## Strapi CMS Access
Since Strapi runs on a different port (1338), it should not have this issue:
- Run: `./start-strapi-admin.sh`
- Access: http://localhost:1338/admin