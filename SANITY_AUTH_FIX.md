# Sanity Authentication Fix for Replit

## Problem
The authentication callback URL is trying to connect to localhost, which doesn't work in the Replit environment.

## Solution

### Method 1: Use --no-open flag
```bash
cd studio
npx sanity login --no-open
```

This will:
1. Show you a URL to copy and paste into your browser
2. Allow you to complete authentication manually
3. Give you a token to paste back into the terminal

### Method 2: Use API Token (Recommended for Production)
1. Go to https://www.sanity.io/manage
2. Select your project (3prkr232)
3. Go to API → Tokens
4. Create a new token with Editor permissions
5. Add it as environment variable: SANITY_API_TOKEN

### Method 3: Browser Authentication
1. Open the authentication URL in a new browser tab
2. Complete the login process
3. The token should automatically be saved

## Environment Variables for Deployment
For production deployment, set these variables:
```
SANITY_PROJECT_ID=3prkr232
SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

## Verification
Once authenticated, test with:
```bash
cd studio
npx sanity dev
```

Studio should start on http://localhost:3333